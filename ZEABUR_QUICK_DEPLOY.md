# Zeabur 快速部署指南

## 🚀 快速部署步驟

### 1. 準備 Git 倉庫

```bash
# 檢查 Git 狀態
git status

# 如果還沒有初始化 Git
git init
git add .
git commit -m "準備部署到 Zeabur"

# 如果還沒有遠端倉庫，先到 GitHub/GitLab 創建一個
# 然後連接：
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. 在 Zeabur 創建專案

1. 訪問 https://zeabur.com
2. 使用 GitHub/GitLab/Bitbucket 帳號登入
3. 點擊 **"New Project"** → **"Import Git Repository"**
4. 選擇您的 Git 倉庫

### 3. Zeabur 自動配置

Zeabur 會自動檢測到這是 Vite 專案，使用以下配置：

- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅
- **Start Command**: `npm run start` ✅（已配置為 `vite preview --host --port 3000`）

### 4. 設置環境變數（重要！）

在 Zeabur 專案設置中，點擊 **"Environment Variables"**，添加：

```
VITE_SUPABASE_URL = https://lofmejhovipawspgeces.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I
```

### 5. 部署

點擊 **"Deploy"** 按鈕，等待 2-5 分鐘完成。

### 6. 訪問應用

部署完成後，Zeabur 會提供網址，例如：
- `https://rating-system-xxx.zeabur.app`

**訪問頁面：**
- 大螢幕控制台：`https://YOUR_URL.zeabur.app/admin`（密碼：8888）
- 觀眾評分頁面：`https://YOUR_URL.zeabur.app/`

---

## ✅ 部署前檢查清單

- [ ] 代碼已推送到 Git 倉庫
- [ ] Zeabur 專案已創建並連接 Git 倉庫
- [ ] 環境變數 `VITE_SUPABASE_URL` 已設置
- [ ] 環境變數 `VITE_SUPABASE_ANON_KEY` 已設置
- [ ] 部署已完成且無錯誤

---

## 🔧 已配置的設置

### package.json
- ✅ `build`: `vite build`
- ✅ `start`: `vite preview --host --port 3000`

### vite.config.js
- ✅ `preview.allowedHosts`: 已包含 `.zeabur.app`
- ✅ `preview.host`: `true`
- ✅ `preview.port`: `3000`

---

## ⚠️ 常見問題

### 問題：部署後無法訪問
**解決方案：** 確認環境變數已正確設置

### 問題：主機被阻擋
**解決方案：** `vite.config.js` 已配置 `allowedHosts`，應該不會出現此問題

### 問題：空白頁面
**解決方案：** 檢查瀏覽器控制台錯誤，確認 Supabase 連接正常

---

**部署完成後，兩個頁面都可以正常使用！** 🎉

