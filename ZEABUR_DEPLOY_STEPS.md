# 🚀 Zeabur 部署步驟（已完成 GitHub 推送）

## ✅ 已完成
- ✅ 代碼已推送到 GitHub: https://github.com/sandycd570-stack/rating-system.git

---

## 📋 接下來在 Zeabur 部署

### 步驟 1：登入 Zeabur

1. 訪問 https://zeabur.com
2. 點擊 **"Sign in with GitHub"** 使用您的 GitHub 帳號登入

### 步驟 2：創建新專案

1. 點擊 **"New Project"** 或 **"新增專案"** 按鈕
2. 選擇 **"Import Git Repository"** 或 **"導入 Git 倉庫"**
3. 在列表中選擇 **`sandycd570-stack/rating-system`** 倉庫
4. 點擊該倉庫進行導入

### 步驟 3：配置專案設置

Zeabur 會自動檢測到這是 Vite 專案，確認以下設置：

- **Framework Preset**: `Vite`（應該會自動檢測）
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Start Command**: `npm run start`
- **Port**: `3000`

### 步驟 4：設置環境變數（**非常重要！**）

在專案設置頁面：

1. 找到 **"Environment Variables"** 或 **"環境變數"** 區塊
2. 點擊 **"Add Variable"** 或 **"新增變數"**
3. 添加以下兩個環境變數：

**變數 1：**
- **Key**: `VITE_SUPABASE_URL`
- **Value**: `https://lofmejhovipawspgeces.supabase.co`

**變數 2：**
- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I`

4. 點擊 **"Save"** 保存每個變數

### 步驟 5：開始部署

1. 確認所有設置無誤後，點擊 **"Deploy"** 或 **"部署"** 按鈕
2. 等待構建完成（通常需要 2-5 分鐘）
3. 部署完成後，Zeabur 會提供一個網址（例如：`https://rating-system-xxx.zeabur.app`）

---

## 🌐 訪問部署後的應用

部署完成後，您可以通過以下網址訪問：

### 🖥️ 大螢幕控制台（主控制台）：
```
https://YOUR_PROJECT_NAME.zeabur.app/admin
```
- 登入密碼：`8888`

### 📱 觀眾評分頁面：
```
https://YOUR_PROJECT_NAME.zeabur.app/
```

---

## 🔄 更新部署

當您修改本地代碼後：

```bash
git add .
git commit -m "更新描述"
git push
```

Zeabur 會自動檢測到新的推送並重新部署。

---

## ✅ 部署檢查清單

- [x] 代碼已推送到 GitHub
- [ ] 在 Zeabur 創建了新專案並連接 GitHub 倉庫
- [ ] 環境變數 `VITE_SUPABASE_URL` 已設置
- [ ] 環境變數 `VITE_SUPABASE_ANON_KEY` 已設置
- [ ] 部署已完成且無錯誤
- [ ] 可以訪問大螢幕控制台 (`/admin`)
- [ ] 可以訪問觀眾評分頁面 (`/`)

---

## ⚠️ 常見問題

### 問題 1：Zeabur 構建失敗
**檢查：**
1. 確認 `package.json` 中有 `build` 和 `start` 腳本
2. 確認環境變數已正確設置
3. 查看 Zeabur 構建日誌中的錯誤訊息

### 問題 2：應用無法連接到 Supabase
**解決方案：**
- 確認環境變數已正確設置（特別是 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`）
- 檢查 Supabase 專案是否正常運行
- 查看瀏覽器控制台的錯誤訊息

### 問題 3：頁面顯示 "Blocked request"
**解決方案：**
- 這已經在 `vite.config.js` 中修復，確認該文件已推送到 GitHub

---

**祝部署順利！🎉**

