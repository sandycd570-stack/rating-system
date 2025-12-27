# 🔧 Zeabur 環境變數問題修復指南

## 🚨 問題診斷

根據 Console 錯誤訊息，問題是：

1. **401 Unauthorized** - Supabase API key 未正確載入
2. **WebSocket 連接失敗** - 因 API key 問題導致
3. **`apikey=Value%3...`** - 環境變數顯示為字面值，未正確載入

## 🔍 根本原因

**Vite 的環境變數（`VITE_*`）必須在構建時注入，而不是運行時！**

如果環境變數在構建後才設置，Vite 應用無法讀取到這些變數，因為 Vite 會在構建時將 `import.meta.env.VITE_*` 替換為實際值。

## ✅ 解決方案

### 步驟 1：在 Zeabur 設置環境變數（構建時）

1. 登入 Zeabur 控制台
2. 進入您的專案設置
3. 找到 **"Environment Variables"** 或 **"環境變數"** 區塊
4. **確保在構建前設置以下環境變數：**

#### 環境變數 1：Supabase URL
- **Key**: `VITE_SUPABASE_URL`
- **Value**: `https://lofmejhovipawspgeces.supabase.co`

#### 環境變數 2：Supabase Anon Key
- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I`

### 步驟 2：重新構建應用

**重要：設置環境變數後，必須重新構建應用！**

1. 在 Zeabur 控制台，找到 **"Redeploy"** 或 **"重新部署"** 按鈕
2. 點擊重新部署
3. 等待構建完成（2-5 分鐘）

### 步驟 3：驗證修復

1. 打開部署後的應用：`https://rating-system-xxx.zeabur.app/admin`
2. 打開瀏覽器 Console (F12)
3. 查看是否有以下訊息：
   - ✅ `🔍 Supabase 環境變數檢查:`
   - ✅ `VITE_SUPABASE_URL: ✅ 已設置`
   - ✅ `VITE_SUPABASE_ANON_KEY: ✅ 已設置 (長度: XXX)`
4. 如果看到 ✅，表示環境變數已正確載入
5. 如果看到 ❌，請檢查步驟 1 和 2

## 🔄 替代方案：使用運行時環境變數

如果 Zeabur 無法在構建時注入環境變數，可以使用運行時環境變數：

### 修改 server.js 來注入環境變數

```javascript
// 在 server.js 中添加環境變數注入
app.get('*', (req, res) => {
  try {
    const indexPath = join(distPath, 'index.html');
    if (!existsSync(indexPath)) {
      return res.status(500).send('index.html not found.');
    }
    let indexHtml = readFileSync(indexPath, 'utf-8');
    
    // 注入環境變數到 HTML
    indexHtml = indexHtml.replace(
      '</head>',
      `<script>
        window.__ENV__ = {
          VITE_SUPABASE_URL: '${process.env.VITE_SUPABASE_URL || 'https://lofmejhovipawspgeces.supabase.co'}',
          VITE_SUPABASE_ANON_KEY: '${process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I'}'
        };
      </script></head>`
    );
    
    res.setHeader('Content-Type', 'text/html');
    res.send(indexHtml);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});
```

然後修改 `src/lib/supabase.js` 來使用運行時環境變數：

```javascript
// 優先使用運行時環境變數（從 window.__ENV__）
const supabaseUrl = (typeof window !== 'undefined' && window.__ENV__?.VITE_SUPABASE_URL) 
  || import.meta.env.VITE_SUPABASE_URL 
  || 'https://lofmejhovipawspgeces.supabase.co';

const supabaseAnonKey = (typeof window !== 'undefined' && window.__ENV__?.VITE_SUPABASE_ANON_KEY)
  || import.meta.env.VITE_SUPABASE_ANON_KEY
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I';
```

## 📋 檢查清單

- [ ] 在 Zeabur 設置了 `VITE_SUPABASE_URL` 環境變數
- [ ] 在 Zeabur 設置了 `VITE_SUPABASE_ANON_KEY` 環境變數
- [ ] 環境變數設置後，點擊了 **"Redeploy"** 重新構建
- [ ] 構建完成後，打開 Console 檢查環境變數是否正確載入
- [ ] 確認沒有 401 錯誤
- [ ] 確認 WebSocket 連接成功
- [ ] 測試輸入表演者名字功能是否正常

## 🆘 如果問題仍然存在

1. **檢查 Zeabur 構建日誌**
   - 查看構建過程中是否有錯誤
   - 確認環境變數是否在構建時可用

2. **檢查環境變數名稱**
   - 確保使用 `VITE_SUPABASE_URL`（不是 `SUPABASE_URL`）
   - 確保使用 `VITE_SUPABASE_ANON_KEY`（不是 `SUPABASE_ANON_KEY`）

3. **清除瀏覽器快取**
   - 按 `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac) 強制重新載入

4. **使用替代方案**
   - 如果 Zeabur 無法在構建時注入環境變數，使用上述的運行時環境變數方案

