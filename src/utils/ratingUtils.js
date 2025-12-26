// 生成唯一用戶ID（儲存在localStorage）
export function getUserId() {
  let userId = localStorage.getItem('rating_user_id')
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('rating_user_id', userId)
  }
  return userId
}

// 計算平均分數
export function calculateAverage(scores) {
  if (!scores || scores.length === 0) return 0
  const sum = scores.reduce((acc, score) => acc + score, 0)
  return sum / scores.length
}

// 格式化分數顯示（3位整數+1位小數，例如：081.7）
export function formatScore(score) {
  const num = score || 0
  const fixed = num.toFixed(1) // 轉為小數點後1位，例如 "81.7"
  
  // 分離整數和小數部分
  const [integerPart, decimalPart] = fixed.split('.')
  
  // 整數部分補零到3位，然後加上小數部分
  const paddedInteger = integerPart.padStart(3, '0')
  
  return `${paddedInteger}.${decimalPart}`
}

// 動態滾動數字效果
export function animateNumber(element, targetValue, duration = 500) {
  const startValue = parseFloat(element.textContent) || 0
  const startTime = performance.now()
  
  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用緩動函數
    const easeOutQuad = 1 - (1 - progress) * (1 - progress)
    const currentValue = startValue + (targetValue - startValue) * easeOutQuad
    
    element.textContent = formatScore(currentValue)
    
    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = formatScore(targetValue)
    }
  }
  
  requestAnimationFrame(update)
}

