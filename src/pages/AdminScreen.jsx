import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { formatScore, animateNumber } from '../utils/ratingUtils'
import '../styles/AdminScreen.css'

const ADMIN_PASSWORD = '8888'

export default function AdminScreen() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [performerName, setPerformerName] = useState('')
  const [currentStatus, setCurrentStatus] = useState('idle')
  const [countdown, setCountdown] = useState(15)
  const [averageScore, setAverageScore] = useState(0)
  const [top8Scores, setTop8Scores] = useState([])
  const [allScores, setAllScores] = useState([])
  const [performerRank, setPerformerRank] = useState(0) // 當前表演者的排名
  const [totalPerformers, setTotalPerformers] = useState(0) // 總表演者人數
  const [top8Performers, setTop8Performers] = useState([]) // Top 8 表演者排名列表
  
  const scoreDisplayRef = useRef(null)
  const countdownIntervalRef = useRef(null)
  const performerNameRef = useRef('')
  const currentStatusRef = useRef('idle')
  const statusId = '00000000-0000-0000-0000-000000000000'
  
  // 同步 ref 和 state
  useEffect(() => {
    performerNameRef.current = performerName
  }, [performerName])
  
  useEffect(() => {
    currentStatusRef.current = currentStatus
  }, [currentStatus])

  useEffect(() => {
    if (!isAuthenticated) return

    // 訂閱 app_status 變化
    const statusChannel = supabase
      .channel('app_status_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'app_status' },
        async (payload) => {
          if (payload.new && payload.new.id === statusId) {
            const newName = payload.new.performer_name || ''
            const newStatus = payload.new.status || 'idle'
            
            setPerformerName(newName)
            setCurrentStatus(newStatus)
            
            if (newStatus === 'scoring') {
              setCountdown(15)
              setAverageScore(0)
              setAllScores([])
              startCountdown()
            } else if (newStatus === 'finished' && newName) {
              // 當狀態變為 finished 時，載入最終評分數據
              await fetchRatings()
            }
          }
        }
      )
      .subscribe()

    // 訂閱評分變化
    const ratingsChannel = supabase
      .channel('ratings_channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'ratings' },
        async (payload) => {
          console.log('收到評分變化:', payload)
          
          // 使用 ref 獲取最新的狀態值
          const currentName = performerNameRef.current
          const currentState = currentStatusRef.current
          
          // 如果是當前表演者的評分變化，更新數據
          if (payload.new && payload.new.performer_name === currentName) {
            await fetchRatings()
          } else if (payload.old && payload.old.performer_name === currentName) {
            await fetchRatings()
          }
          
          // 如果是 finished 狀態，任何評分變化都可能影響排名，需要重新計算
          if (currentState === 'finished' && currentName) {
            // 重新獲取數據並計算排名
            setTimeout(async () => {
              const { data } = await supabase
                .from('ratings')
                .select('*')
                .eq('performer_name', currentName)
              
              if (data && data.length > 0) {
                const avg = data.reduce((sum, r) => sum + r.score, 0) / data.length
                setAllScores(data)
                setAverageScore(avg)
                await calculatePerformerRank(currentName, avg)
              }
            }, 300)
          }
        }
      )
      .subscribe()

    // 載入初始狀態
    loadInitialStatus()

    return () => {
      statusChannel.unsubscribe()
      ratingsChannel.unsubscribe()
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (currentStatus === 'scoring' && allScores.length > 0) {
      const avg = allScores.reduce((sum, s) => sum + s.score, 0) / allScores.length
      if (scoreDisplayRef.current) {
        animateNumber(scoreDisplayRef.current, avg, 300)
      }
      setAverageScore(avg)
    }
  }, [allScores, currentStatus])

  const loadInitialStatus = async () => {
    const { data, error } = await supabase
      .from('app_status')
      .select('*')
      .eq('id', statusId)
      .single()

    if (data && !error) {
      const name = data.performer_name || ''
      const status = data.status || 'idle'
      
      setPerformerName(name)
      setCurrentStatus(status)
      
      if (status === 'scoring') {
        setCountdown(15)
        await fetchRatings()
        startCountdown()
      } else if (status === 'finished' && name) {
        // 如果初始狀態是 finished，也要載入評分數據
        await fetchRatings()
        // 計算排名
        const { data: ratingData } = await supabase
          .from('ratings')
          .select('*')
          .eq('performer_name', name)
        if (ratingData && ratingData.length > 0) {
          const avg = ratingData.reduce((sum, r) => sum + r.score, 0) / ratingData.length
          await calculatePerformerRank(name, avg)
        }
      }
    }
  }

  // 計算所有表演者的排名
  const calculatePerformerRank = async (currentPerformerName, currentAvg) => {
    try {
      // 獲取所有評分數據
      const { data: allRatings, error } = await supabase
        .from('ratings')
        .select('performer_name, score')

      if (error || !allRatings) {
        console.error('獲取所有評分錯誤:', error)
        return
      }

      // 按表演者分組並計算平均分數
      const performerMap = new Map()
      
      allRatings.forEach(rating => {
        const name = rating.performer_name
        if (!performerMap.has(name)) {
          performerMap.set(name, [])
        }
        performerMap.get(name).push(rating.score)
      })

      // 計算每個表演者的平均分數
      const performers = Array.from(performerMap.entries()).map(([name, scores]) => {
        const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length
        return { name, averageScore: avg, count: scores.length }
      })

      // 按平均分數降序排序
      performers.sort((a, b) => b.averageScore - a.averageScore)

      // 找到當前表演者的排名
      const rank = performers.findIndex(p => p.name === currentPerformerName) + 1
      setPerformerRank(rank > 0 ? rank : 0)
      setTotalPerformers(performers.length)
      
      // 設置 Top 8 表演者排名列表
      const top8 = performers.slice(0, 8)
      setTop8Performers(top8)
    } catch (err) {
      console.error('計算排名錯誤:', err)
    }
  }

  const fetchRatings = async () => {
    if (!performerName) return

    const { data, error } = await supabase
      .from('ratings')
      .select('*')
      .eq('performer_name', performerName)
      .order('score', { ascending: false })

    if (data && !error) {
      setAllScores(data)
      
      // 計算平均分數
      const avg = data.length > 0
        ? data.reduce((sum, r) => sum + r.score, 0) / data.length
        : 0
      
      // 計算前8名分數
      const top8 = data.slice(0, 8)
      setTop8Scores(top8.map(r => r.score))
      
      // 更新平均分數（無論狀態如何）
      setAverageScore(avg)
      
      // 根據狀態更新分數顯示動畫
      if (currentStatus === 'scoring' && scoreDisplayRef.current) {
        animateNumber(scoreDisplayRef.current, avg, 300)
      }

      // 計算排名（會同時更新 Top 8 表演者列表）
      // 在 scoring 和 finished 狀態都要計算，以便顯示 Top 8
      await calculatePerformerRank(performerName, avg)
    } else if (error) {
      console.error('獲取評分數據錯誤:', error)
    }
  }

  const startCountdown = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current)
          finishScoring()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const finishScoring = async () => {
    // 使用 ref 獲取最新的表演者名字
    const currentPerformerName = performerNameRef.current || performerName
    console.log('開始結束評分，獲取最終數據...', { 
      performerName, 
      refName: performerNameRef.current,
      currentPerformerName 
    })
    
    if (!currentPerformerName) {
      console.error('表演者名字為空，無法獲取評分數據')
      return
    }
    
    // 等待一小段時間，確保所有評分資料都已寫入 Supabase
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 使用重試機制獲取評分數據（最多重試3次）
    let data = null
    let fetchError = null
    let retryCount = 0
    const maxRetries = 3
    
    while (retryCount < maxRetries) {
      const result = await supabase
        .from('ratings')
        .select('*')
        .eq('performer_name', currentPerformerName)
        .order('score', { ascending: false })
      
      data = result.data
      fetchError = result.error
      
      console.log(`第 ${retryCount + 1} 次查詢結果:`, { 
        dataLength: data?.length, 
        error: fetchError,
        performerName: currentPerformerName 
      })
      
      if (data && data.length > 0) {
        console.log(`獲取到評分數據: ${data.length} 筆 (第 ${retryCount + 1} 次嘗試)`)
        break
      } else if (retryCount < maxRetries - 1) {
        console.log(`第 ${retryCount + 1} 次查詢無資料，等待後重試...`)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      retryCount++
    }

    if (data && data.length > 0 && !fetchError) {
      console.log('最終獲取到評分數據:', data.length, '筆')
      
      // 更新狀態
      setAllScores(data)
      
      // 計算平均分數
      const avg = data.reduce((sum, r) => sum + r.score, 0) / data.length
      
      setAverageScore(avg)
      console.log('計算平均分數:', avg, '評分人數:', data.length)
      
      // 計算前8名分數
      const top8 = data.slice(0, 8)
      setTop8Scores(top8.map(r => r.score))
      
      // 計算排名（會同時更新 Top 8 表演者列表）
      await calculatePerformerRank(currentPerformerName, avg)
    } else {
      console.warn('未能獲取到評分數據，嘗試使用 fetchRatings')
      // 如果查詢失敗，使用 fetchRatings 函數
      await fetchRatings()
    }
    
    // 更新狀態為 finished
    const { error } = await supabase
      .from('app_status')
      .update({ status: 'finished' })
      .eq('id', statusId)
    
    if (!error) {
      setCurrentStatus('finished')
      console.log('狀態已更新為 finished，數據應立即顯示')
      
      // 狀態更新後，再次獲取數據並計算排名（確保顯示最新）
      setTimeout(async () => {
        // 再次獲取當前表演者的評分數據
        const { data: latestData } = await supabase
          .from('ratings')
          .select('*')
          .eq('performer_name', currentPerformerName)
          .order('score', { ascending: false })
        
        if (latestData && latestData.length > 0) {
          setAllScores(latestData)
          const latestAvg = latestData.reduce((sum, r) => sum + r.score, 0) / latestData.length
          setAverageScore(latestAvg)
          console.log('重新計算平均分數:', latestAvg, '評分人數:', latestData.length)
          
          // 重新計算排名（會更新 Top 8 和當前表演者的排名）
          await calculatePerformerRank(currentPerformerName, latestAvg)
        } else {
          // 如果還是沒有資料，使用 fetchRatings
          await fetchRatings()
        }
      }, 800)
    } else {
      console.error('更新狀態為 finished 錯誤:', error)
    }
  }

  const handleStartScoring = async () => {
    if (!performerName.trim()) {
      alert('請輸入表演者名字')
      return
    }

    // 清除該表演者的舊評分
    await supabase
      .from('ratings')
      .delete()
      .eq('performer_name', performerName.trim())

    // 更新狀態為 scoring
    const { error } = await supabase
      .from('app_status')
      .update({
        performer_name: performerName.trim(),
        status: 'scoring',
        start_time: Date.now()
      })
      .eq('id', statusId)

    if (!error) {
      setCurrentStatus('scoring')
      setCountdown(15)
      setAverageScore(0)
      setAllScores([])
      startCountdown()
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('密碼錯誤')
      setPassword('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h2>大螢幕控制台</h2>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              autoFocus
            />
            <button type="submit">確定</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-screen">
      <div className="admin-controls">
        <div className="performer-input">
          <input
            type="text"
            value={performerName}
            onChange={(e) => setPerformerName(e.target.value)}
            placeholder="輸入表演者名字"
            disabled={currentStatus === 'scoring'}
          />
          <button
            onClick={handleStartScoring}
            disabled={currentStatus === 'scoring' || !performerName.trim()}
          >
            確定
          </button>
        </div>
      </div>

      <div className="main-display">
        <div className="main-content-wrapper">
          <div className="panel-header">
            <div className="header-title">AI INNOVATION SCOREBOARD</div>
          </div>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', width: '100%' }}>
            <div className="left-content">
            <div className="performer-name-display">
              {performerName || '等待輸入表演者名字'}
            </div>

            {currentStatus === 'scoring' && (
              <>
                <div className="score-display-container">
                  <div className="score-label">平均分數</div>
                  <div className="score-display" ref={scoreDisplayRef}>
                    {formatScore(averageScore)}
                  </div>
                  <div className="rating-count">
                    評分人數: {allScores.length}
                  </div>
                </div>

                <div className="countdown-display">
                  剩餘時間: {countdown} 秒
                </div>
              </>
            )}

            {currentStatus === 'finished' && (
              <div className="final-score">
                <div className="final-score-label">平均分數</div>
                <div className="final-score-value">
                  {formatScore(averageScore)}
                </div>
                <div className="total-ratings">
                  評分人數: {allScores.length}
                </div>
                {performerRank > 0 && (
                  <div className="performer-rank">
                    <div className="rank-label">目前名次</div>
                    <div className="rank-value">
                      第 {performerRank} 名 / 共 {totalPerformers} 位表演者
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Top 8 顯示在右邊 - 顯示所有表演者的排名 */}
          {(currentStatus === 'scoring' || currentStatus === 'finished') && (
            <div className="right-content">
              <div className="top8-display">
                <h3>Top 8</h3>
                <div className="top8-list">
                  {top8Performers.length > 0 ? (
                    top8Performers.map((performer, index) => {
                      return (
                        <div key={performer.name || index} className="top8-item">
                          <span className="rank">{index + 1}</span>
                          <span className="user-name">{performer.name}</span>
                          <span className="score">{formatScore(performer.averageScore)}</span>
                        </div>
                      )
                    })
                  ) : (
                    <div className="no-scores">尚無表演者</div>
                  )}
                </div>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

