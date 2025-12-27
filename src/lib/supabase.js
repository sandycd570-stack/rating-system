import { createClient } from '@supabase/supabase-js'

// 獲取環境變數（優先使用運行時環境變數，然後是構建時環境變數，最後是預設值）
const getSupabaseUrl = () => {
  // 1. 優先使用運行時環境變數（從 server.js 注入）
  if (typeof window !== 'undefined' && window.__RUNTIME_ENV__?.VITE_SUPABASE_URL) {
    return window.__RUNTIME_ENV__.VITE_SUPABASE_URL
  }
  // 2. 使用構建時環境變數
  if (import.meta.env.VITE_SUPABASE_URL) {
    return import.meta.env.VITE_SUPABASE_URL
  }
  // 3. 使用預設值
  return 'https://lofmejhovipawspgeces.supabase.co'
}

const getSupabaseAnonKey = () => {
  // 1. 優先使用運行時環境變數（從 server.js 注入）
  if (typeof window !== 'undefined' && window.__RUNTIME_ENV__?.VITE_SUPABASE_ANON_KEY) {
    return window.__RUNTIME_ENV__.VITE_SUPABASE_ANON_KEY
  }
  // 2. 使用構建時環境變數
  if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return import.meta.env.VITE_SUPABASE_ANON_KEY
  }
  // 3. 使用預設值
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I'
}

const supabaseUrl = getSupabaseUrl()
const supabaseAnonKey = getSupabaseAnonKey()

// 調試：檢查環境變數是否正確載入
if (typeof window !== 'undefined') {
  const runtimeUrl = window.__RUNTIME_ENV__?.VITE_SUPABASE_URL
  const runtimeKey = window.__RUNTIME_ENV__?.VITE_SUPABASE_ANON_KEY
  const buildUrl = import.meta.env.VITE_SUPABASE_URL
  const buildKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  console.log('🔍 Supabase 環境變數檢查:')
  console.log('  運行時環境變數 (window.__RUNTIME_ENV__):')
  console.log('    VITE_SUPABASE_URL:', runtimeUrl ? '✅ 已設置' : '❌ 未設置')
  console.log('    VITE_SUPABASE_ANON_KEY:', runtimeKey ? `✅ 已設置 (長度: ${runtimeKey.length})` : '❌ 未設置')
  console.log('  構建時環境變數 (import.meta.env):')
  console.log('    VITE_SUPABASE_URL:', buildUrl ? '✅ 已設置' : '❌ 未設置')
  console.log('    VITE_SUPABASE_ANON_KEY:', buildKey ? `✅ 已設置 (長度: ${buildKey.length})` : '❌ 未設置')
  console.log('  最終使用值:')
  console.log('    URL:', supabaseUrl)
  console.log('    Key:', supabaseAnonKey ? `已設置 (長度: ${supabaseAnonKey.length})` : '❌ 未設置')
  
  // 檢查 API key 格式
  if (supabaseAnonKey && (supabaseAnonKey.includes('Value') || supabaseAnonKey.length < 100)) {
    console.error('❌ 錯誤：API Key 格式不正確！')
    console.error('  當前值:', supabaseAnonKey.substring(0, 50) + '...')
    console.error('  這表示環境變數可能未正確設置')
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

