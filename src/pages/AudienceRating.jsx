import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { getUserId, formatScore } from '../utils/ratingUtils'
import '../styles/AudienceRating.css'

export default function AudienceRating() {
  const [performerName, setPerformerName] = useState('')
  const [currentStatus, setCurrentStatus] = useState('idle')
  const [score, setScore] = useState('')
  const [userScore, setUserScore] = useState(null)
  const [top3Scores, setTop3Scores] = useState([])
  const [hasRated, setHasRated] = useState(false)
  const [userId] = useState(getUserId())
  
  const statusId = '00000000-0000-0000-0000-000000000000'
  const performerNameRef = useRef('')
  
  // 同步 ref 和 state
  useEffect(() => {
    performerNameRef.current = performerName
  }, [performerName])

  useEffect(() => {
    let mounted = true

    // 訂閱 app_status 變化
    const statusChannel = supabase
      .channel('audience_status_channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'app_status' },
        async (payload) => {
          if (!mounted) return
          
          console.log('收到 payload:', payload)
          
          if (payload.new && payload.new.id === statusId) {
            const newName = payload.new.performer_name || ''
            const newStatus = payload.new.status || 'idle'
            
            console.log('收到狀態更新:', { newName, newStatus, fullPayload: payload.new })
            
            // 無論名字是否改變，都更新狀態（確保同步）
            setPerformerName((prevName) => {
              console.log('更新表演者名字:', { prevName, newName })
              // 如果名字改變，重置評分相關狀態
              if (newName !== prevName) {
                setScore('')
                setUserScore(null)
                setHasRated(false)
                setTop3Scores([])
              }
              return newName
            })
            
            // 同步更新 ref
            performerNameRef.current = newName
            setCurrentStatus(newStatus)

            if (newStatus === 'scoring' && newName) {
              console.log('開始評分，獲取前3名...')
              // 使用新名字獲取評分
              const { data, error } = await supabase
                .from('ratings')
                .select('score')
                .eq('performer_name', newName)
                .order('score', { ascending: false })
                .limit(3)

              if (error) {
                console.error('獲取前3名錯誤:', error)
              } else if (data && mounted) {
                console.log('前3名數據:', data)
                setTop3Scores(data.map(r => r.score))
              }
            }
          } else {
            console.log('payload 不匹配:', { 
              hasNew: !!payload.new, 
              id: payload.new?.id, 
              statusId 
            })
          }
        }
      )
      .subscribe((status, err) => {
        if (err) {
          console.error('訂閱 app_status 錯誤:', err)
        } else {
          console.log('訂閱 app_status 狀態:', status)
        }
      })

    // 訂閱評分變化
    const ratingsChannel = supabase
      .channel('audience_ratings_channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'ratings' },
        async (payload) => {
          if (!mounted) return
          
          const currentName = performerNameRef.current
          if (currentName && payload.new && payload.new.performer_name === currentName) {
            // 獲取前3名
            const { data: topData, error: topError } = await supabase
              .from('ratings')
              .select('score')
              .eq('performer_name', currentName)
              .order('score', { ascending: false })
              .limit(3)
            
            if (topData && !topError && mounted) {
              setTop3Scores(topData.map(r => r.score))
            }
            
            // 獲取用戶評分
            const { data: userData, error: userError } = await supabase
              .from('ratings')
              .select('score')
              .eq('performer_name', currentName)
              .eq('user_id', userId)
              .single()
            
            if (mounted) {
              if (userData && !userError) {
                setUserScore(userData.score)
                setHasRated(true)
              } else {
                setUserScore(null)
                setHasRated(false)
              }
            }
          }
        }
      )
      .subscribe((status, err) => {
        if (err) {
          console.error('訂閱 ratings 錯誤:', err)
        } else {
          console.log('訂閱 ratings 狀態:', status)
        }
      })

    // 載入初始狀態
    loadInitialStatus()

    return () => {
      mounted = false
      statusChannel.unsubscribe()
      ratingsChannel.unsubscribe()
    }
  }, [userId])

  useEffect(() => {
    if (performerName && currentStatus === 'scoring') {
      fetchTop3Scores(performerName)
      fetchUserScore(performerName)
    }
  }, [performerName, currentStatus])

  const loadInitialStatus = async () => {
    try {
      console.log('開始載入初始狀態...')
      const { data, error } = await supabase
        .from('app_status')
        .select('*')
        .eq('id', statusId)
        .single()

      if (error) {
        console.error('載入初始狀態錯誤:', error)
        console.error('錯誤詳情:', JSON.stringify(error, null, 2))
        return
      }

      if (data) {
        const name = data.performer_name || ''
        const status = data.status || 'idle'
        
        console.log('載入初始狀態成功:', { name, status, data })
        
        setPerformerName(name)
        performerNameRef.current = name
        setCurrentStatus(status)
        
        if (status === 'scoring' && name) {
          await fetchTop3Scores(name)
          await fetchUserScore(name)
        }
      } else {
        console.log('沒有找到初始狀態數據')
      }
    } catch (err) {
      console.error('載入初始狀態異常:', err)
      console.error('異常堆疊:', err.stack)
    }
  }

  const fetchTop3Scores = async (name) => {
    if (!name) return

    const { data, error } = await supabase
      .from('ratings')
      .select('score')
      .eq('performer_name', name)
      .order('score', { ascending: false })
      .limit(3)

    if (data && !error) {
      setTop3Scores(data.map(r => r.score))
    }
  }

  const fetchUserScore = async (name = null) => {
    const targetName = name || performerName
    if (!targetName) return

    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('score')
        .eq('performer_name', targetName)
        .eq('user_id', userId)
        .single()

      if (data && !error) {
        setUserScore(data.score)
        setHasRated(true)
      } else {
        setUserScore(null)
        setHasRated(false)
      }
    } catch (err) {
      console.error('獲取用戶評分錯誤:', err)
      setUserScore(null)
      setHasRated(false)
    }
  }

  const handleScoreSubmit = async (e) => {
    e.preventDefault()
    
    if (currentStatus !== 'scoring') {
      alert('目前不在評分時間')
      return
    }

    if (hasRated) {
      alert('您已經評過分了，請等待下一位表演者')
      return
    }

    const scoreNum = parseInt(score)
    if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 100) {
      alert('請輸入1-100之間的整數分數')
      return
    }

    // 檢查是否已經評過分
    const { data: existing } = await supabase
      .from('ratings')
      .select('id')
      .eq('performer_name', performerName)
      .eq('user_id', userId)
      .single()

    if (existing) {
      // 更新現有評分
      const { error } = await supabase
        .from('ratings')
        .update({ score: scoreNum })
        .eq('performer_name', performerName)
        .eq('user_id', userId)
      
      if (!error) {
        setUserScore(scoreNum)
        setHasRated(true)
        setScore('')
        await fetchTop3Scores(performerName)
      }
    } else {
      // 新增評分
      const { error } = await supabase
        .from('ratings')
        .insert({
          performer_name: performerName,
          score: scoreNum,
          user_id: userId
        })
      
      if (!error) {
        setUserScore(scoreNum)
        setHasRated(true)
        setScore('')
        await fetchTop3Scores(performerName)
      } else {
        alert('評分失敗，請重試')
      }
    }
  }

  return (
    <div className="audience-rating">
      <div className="rating-container">
        <div className="performer-display">
          {performerName ? (
            <>
              <h2>表演者</h2>
              <div className="performer-name">{performerName}</div>
            </>
          ) : (
            <div className="waiting-message">等待表演者名字...</div>
          )}
        </div>

        {currentStatus === 'scoring' && performerName && (
          <>
            {!hasRated ? (
              <div className="score-input-section">
                <form onSubmit={handleScoreSubmit}>
                  <label>請輸入評分 (1-100)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="輸入分數"
                    autoFocus
                    required
                  />
                  <button type="submit">提交評分</button>
                </form>
              </div>
            ) : (
              <div className="user-score-section">
                <div className="user-score-label">您的評分</div>
                <div className="user-score-value">{userScore} 分</div>
                <div className="rated-message">✓ 已成功評分</div>
              </div>
            )}

            <div className="top3-section">
              <h3>目前給分前3高分數</h3>
              <div className="top3-list">
                {top3Scores.length > 0 ? (
                  top3Scores.map((score, index) => (
                    <div key={index} className="top3-item">
                      <span className="top3-rank">({index + 1})</span>
                      <span className="top3-score">{score} 分</span>
                    </div>
                  ))
                ) : (
                  <div className="no-scores">尚無評分</div>
                )}
              </div>
            </div>
          </>
        )}

        {currentStatus === 'idle' && (
          <div className="idle-message">等待評分開始...</div>
        )}

        {currentStatus === 'finished' && (
          <div className="finished-message">
            <div>評分已結束</div>
            {userScore && (
              <div className="final-user-score">您的評分: {userScore} 分</div>
            )}
            <div className="waiting-next">等待下一位表演者...</div>
          </div>
        )}
      </div>
    </div>
  )
}

