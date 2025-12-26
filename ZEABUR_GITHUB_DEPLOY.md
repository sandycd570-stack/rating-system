# 透過 GitHub 部署到 Zeabur 完整指南

## 📋 步驟 1：在 GitHub 創建倉庫並推送代碼

### 1.1 在 GitHub 創建新倉庫

1. 訪問 https://github.com/new
2. 輸入倉庫名稱（例如：`rating-system`）
3. 選擇 **Public** 或 **Private**
4. **不要**勾選 "Initialize this repository with a README"
5. 點擊 **"Create repository"**

### 1.2 連接本地倉庫到 GitHub

在終端機執行以下命令（將 `YOUR_USERNAME` 和 `REPO_NAME` 替換為您的實際值）：

```bash
# 添加遠端倉庫
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 確保分支名稱為 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

**範例：**
如果您的 GitHub 用戶名是 `yourname`，倉庫名是 `rating-system`，則執行：
```bash
git remote add origin https://github.com/yourname/rating-system.git
git branch -M main
git push -u origin main
```

---

## 📋 步驟 2：在 Zeabur 部署

### 2.1 登入 Zeabur

1. 訪問 https://zeabur.com
2. 使用您的 **GitHub 帳號**登入（點擊 "Sign in with GitHub"）

### 2.2 創建新專案

1. 點擊 **"New Project"** 或 **"新增專案"**
2. 選擇 **"Import Git Repository"** 或 **"導入 Git 倉庫"**
3. 選擇您剛才推送的 GitHub 倉庫（`rating-system`）

### 2.3 配置專案設置

Zeabur 會自動檢測到這是 Vite 專案，確認以下設置：

- **Framework Preset**: `Vite`（應該會自動檢測）
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Start Command**: `npm run start`
- **Port**: `3000`

### 2.4 設置環境變數（**非常重要！**）

在 Zeabur 專案設置中：

1. 點擊 **"Environment Variables"** 或 **"環境變數"**
2. 點擊 **"Add Variable"** 或 **"新增變數"**
3. 添加以下兩個環境變數：

**變數 1：**
- **Key**: `VITE_SUPABASE_URL`
- **Value**: `https://lofmejhovipawspgeces.supabase.co`

**變數 2：**
- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I`

4. 點擊 **"Save"** 保存

### 2.5 開始部署

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

1. **提交並推送更改**
   ```bash
   git add .
   git commit -m "更新描述"
   git push
   ```

2. **Zeabur 自動部署**
   - Zeabur 會自動檢測到新的推送
   - 自動觸發重新構建和部署
   - 通常需要 2-5 分鐘完成

---

## ✅ 部署檢查清單

- [ ] 在 GitHub 創建了新倉庫
- [ ] 本地代碼已推送到 GitHub
- [ ] 在 Zeabur 創建了新專案並連接 GitHub 倉庫
- [ ] 環境變數 `VITE_SUPABASE_URL` 已設置
- [ ] 環境變數 `VITE_SUPABASE_ANON_KEY` 已設置
- [ ] 部署已完成且無錯誤
- [ ] 可以訪問大螢幕控制台 (`/admin`)
- [ ] 可以訪問觀眾評分頁面 (`/`)

---

## ⚠️ 常見問題

### 問題 1：推送時需要 GitHub 認證
**解決方案：**
- 使用 Personal Access Token（PAT）作為密碼
- 或使用 GitHub CLI：`gh auth login`

### 問題 2：Zeabur 構建失敗
**檢查：**
1. 確認 `package.json` 中有 `build` 和 `start` 腳本
2. 確認環境變數已正確設置
3. 查看 Zeabur 構建日誌中的錯誤訊息

### 問題 3：應用無法連接到 Supabase
**解決方案：**
- 確認環境變數已正確設置
- 檢查 Supabase 專案是否正常運行
- 查看瀏覽器控制台的錯誤訊息

---

**祝部署順利！🎉**

