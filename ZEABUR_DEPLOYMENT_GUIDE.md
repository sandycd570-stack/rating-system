# 🚀 Zeabur 部署完整指南 - 大螢幕與觀眾評分系統

## 📋 前置準備

✅ **GitHub 倉庫已準備就緒：** https://github.com/sandycd570-stack/rating-system

---

## 步驟 1：在 Zeabur 創建專案

### 1.1 登入 Zeabur

1. 訪問 https://zeabur.com
2. 點擊 **"Sign in with GitHub"** 使用您的 GitHub 帳號登入
3. 授權 Zeabur 訪問您的 GitHub 倉庫

### 1.2 導入 GitHub 倉庫

1. 登入後，點擊 **"New Project"** 或 **"新增專案"** 按鈕
2. 選擇 **"Import Git Repository"** 或 **"導入 Git 倉庫"**
3. 在倉庫列表中選擇 **`sandycd570-stack/rating-system`**
4. 點擊該倉庫進行導入

---

## 步驟 2：配置專案設置

Zeabur 會自動檢測到這是 Node.js 專案，請確認以下設置：

### 構建設置

- **Framework Preset**: `Node.js` 或 `Vite`（Zeabur 會自動檢測）
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`（自動）

### 運行設置

- **Start Command**: `npm run start`
- **Port**: `3000`（或使用環境變數 `PORT`，Zeabur 會自動設置）

---

## 步驟 3：設置環境變數（**非常重要！**）

在 Zeabur 專案設置頁面：

1. 找到 **"Environment Variables"** 或 **"環境變數"** 區塊
2. 點擊 **"Add Variable"** 或 **"新增變數"**
3. 添加以下兩個環境變數：

### 環境變數 1：Supabase URL

- **Key**: `VITE_SUPABASE_URL`
- **Value**: `https://lofmejhovipawspgeces.supabase.co`

### 環境變數 2：Supabase Anon Key

- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I`

4. 點擊 **"Save"** 保存每個變數

---

## 步驟 4：開始部署

1. 確認所有設置無誤後，點擊 **"Deploy"** 或 **"部署"** 按鈕
2. 等待構建完成（通常需要 2-5 分鐘）
3. 您可以在 Zeabur 控制台查看構建日誌
4. 部署完成後，Zeabur 會提供一個網址（例如：`https://rating-system-xxx.zeabur.app`）

---

## 🌐 訪問部署後的應用

部署完成後，您可以通過以下網址訪問兩個頁面：

### 🖥️ 大螢幕控制台（管理介面）

```
https://YOUR_PROJECT_NAME.zeabur.app/admin
```

**功能：**
- 密碼保護（預設密碼：`8888`）
- 輸入表演者名字，同步到所有觀眾端
- 動態滾動分數顯示（3位數+1位小數）
- 15秒倒數計時
- 即時顯示前8名平均分數
- 評分結束後顯示最終平均分數

### 📱 觀眾評分頁面（公開介面）

```
https://YOUR_PROJECT_NAME.zeabur.app/
```

**功能：**
- 自動接收表演者名字
- 評分範圍：1-100（整數）
- 顯示個人評分
- 即時顯示前3名分數和平均分數
- 防止重複評分

---

## 🔄 更新部署

當您修改本地代碼後，Zeabur 會自動重新部署：

1. **提交並推送更改到 GitHub**
   ```bash
   git add .
   git commit -m "更新描述"
   git push
   ```

2. **Zeabur 自動部署**
   - Zeabur 會自動檢測到新的推送
   - 自動觸發重新構建和部署
   - 通常需要 2-5 分鐘完成
   - 您可以在 Zeabur 控制台查看部署進度

---

## ✅ 部署檢查清單

在部署前，請確認：

- [ ] 已在 Zeabur 創建新專案並連接 GitHub 倉庫 `sandycd570-stack/rating-system`
- [ ] 構建設置已正確配置（Build Command: `npm run build`）
- [ ] 運行設置已正確配置（Start Command: `npm run start`）
- [ ] 環境變數 `VITE_SUPABASE_URL` 已設置
- [ ] 環境變數 `VITE_SUPABASE_ANON_KEY` 已設置
- [ ] 部署已完成且無錯誤
- [ ] 可以訪問大螢幕控制台 (`/admin`)，密碼：`8888`
- [ ] 可以訪問觀眾評分頁面 (`/`)

---

## ⚠️ 常見問題與解決方案

### 問題 1：構建失敗

**可能原因：**
- 環境變數未正確設置
- `package.json` 中缺少必要的腳本

**解決方案：**
1. 檢查 Zeabur 構建日誌中的錯誤訊息
2. 確認 `package.json` 中有 `build` 和 `start` 腳本
3. 確認環境變數已正確設置

### 問題 2：應用無法連接到 Supabase

**可能原因：**
- 環境變數未設置或設置錯誤
- Supabase 專案配置問題

**解決方案：**
1. 在 Zeabur 中檢查環境變數是否正確設置
2. 確認 Supabase 專案是否正常運行
3. 查看瀏覽器控制台的錯誤訊息

### 問題 3：路由無法正常工作（404 錯誤）

**可能原因：**
- SPA 路由配置問題

**解決方案：**
- 專案已配置 `server.js` 處理所有路由，確保 Zeabur 使用 `npm run start` 啟動應用

### 問題 4：頁面顯示空白

**可能原因：**
- 構建失敗
- 環境變數未正確載入

**解決方案：**
1. 檢查 Zeabur 構建日誌
2. 確認環境變數已設置並重新部署
3. 清除瀏覽器快取後重新載入

---

## 📝 技術說明

### 專案結構

- **前端框架**: React 18 + Vite
- **路由**: React Router（支援 `/` 和 `/admin` 兩個路由）
- **後端服務**: Express.js（`server.js`）用於處理 SPA 路由
- **資料庫**: Supabase（即時資料庫）

### 部署配置

- **構建命令**: `npm run build` - 構建 React 應用
- **啟動命令**: `npm run start` - 啟動 Express 伺服器
- **輸出目錄**: `dist` - Vite 構建輸出目錄
- **端口**: `3000` - 由 Zeabur 自動設置或使用環境變數 `PORT`

---

## 🎉 部署完成！

部署成功後，您就可以：

1. **在大螢幕上顯示控制台**：訪問 `/admin` 頁面，輸入密碼 `8888`
2. **讓觀眾進行評分**：分享主頁面 `/` 給觀眾
3. **即時同步**：所有評分和狀態會透過 Supabase 即時同步

**祝部署順利！** 🚀

