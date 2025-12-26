# 部署到 Zeabur 完整指南

本指南將幫助您將評分系統（包含大螢幕控制台 `/admin` 和觀眾評分頁面 `/`）部署到 Zeabur。

## 📋 前置準備

### 1. 確保本地代碼已準備好

✅ Git 倉庫已初始化
✅ 所有文件已提交

### 2. 準備 Git 遠端倉庫

您需要將代碼推送到以下其中一個平台：
- **GitHub** (推薦): https://github.com
- **GitLab**: https://gitlab.com
- **Bitbucket**: https://bitbucket.org

---

## 🚀 部署步驟

### 步驟 1: 創建並推送代碼到 Git 倉庫

#### 如果使用 GitHub：

1. **在 GitHub 創建新倉庫**
   - 訪問 https://github.com/new
   - 輸入倉庫名稱（例如：`rating-system`）
   - 選擇 Public 或 Private
   - **不要**勾選 "Initialize this repository with a README"
   - 點擊 "Create repository"

2. **連接本地倉庫到 GitHub**
   ```bash
   # 將 YOUR_USERNAME 和 REPO_NAME 替換為您的實際值
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

#### 如果使用 GitLab：

1. **在 GitLab 創建新專案**
   - 訪問 https://gitlab.com/projects/new
   - 選擇 "Create blank project"
   - 輸入專案名稱
   - 點擊 "Create project"

2. **連接本地倉庫到 GitLab**
   ```bash
   git remote add origin https://gitlab.com/YOUR_USERNAME/REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

---

### 步驟 2: 在 Zeabur 創建專案

1. **訪問 Zeabur**
   - 前往 https://zeabur.com
   - 使用 GitHub/GitLab/Bitbucket 帳號登入

2. **創建新專案**
   - 點擊 **"New Project"** 或 **"新增專案"**
   - 選擇 **"Import Git Repository"** 或 **"導入 Git 倉庫"**
   - 選擇您剛才創建的 Git 倉庫

3. **Zeabur 會自動檢測專案類型**
   - Zeabur 會自動識別這是一個 Vite + React 專案

---

### 步驟 3: 配置專案設置

在 Zeabur 專案設置中，確認以下配置：

#### 構建設置：
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` (自動)
- **Start Command**: 留空（Zeabur 會自動使用靜態文件服務）

#### 或者使用預覽模式：
- **Start Command**: `npm run preview`（如果使用此選項，確保 `vite.config.js` 中的 `preview.allowedHosts` 已正確設置）

---

### 步驟 4: 設置環境變數

在 Zeabur 專案設置中，點擊 **"Environment Variables"** 或 **"環境變數"**，添加以下兩個環境變數：

#### 1. VITE_SUPABASE_URL
```
名稱: VITE_SUPABASE_URL
值: https://lofmejhovipawspgeces.supabase.co
```

#### 2. VITE_SUPABASE_ANON_KEY
```
名稱: VITE_SUPABASE_ANON_KEY
值: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I
```

**設置方式：**
1. 在 Zeabur 專案頁面，點擊 **"Environment Variables"** 或 **"環境變數"**
2. 點擊 **"Add Variable"** 或 **"新增變數"**
3. 分別添加上述兩個環境變數
4. 點擊 **"Save"** 保存

---

### 步驟 5: 部署

1. **開始部署**
   - 點擊 **"Deploy"** 或 **"部署"** 按鈕
   - Zeabur 會開始構建您的專案

2. **等待構建完成**
   - 構建過程通常需要 2-5 分鐘
   - 您可以在 Zeabur 控制台查看構建日誌

3. **獲取部署網址**
   - 部署完成後，Zeabur 會提供一個網址
   - 格式類似：`https://rating-system-xxx.zeabur.app`

---

## 🌐 訪問部署後的應用

部署完成後，您可以通過以下網址訪問：

### 大螢幕控制台：
```
https://YOUR_PROJECT_NAME.zeabur.app/admin
```
- 登入密碼：`8888`

### 觀眾評分頁面：
```
https://YOUR_PROJECT_NAME.zeabur.app/
```

---

## 🔧 配置說明

### vite.config.js 配置

專案已配置好 Zeabur 部署所需的設置：

```javascript
preview: {
  host: true,
  port: 3000,
  allowedHosts: [
    'rating-system.zeabur.app',
    '.zeabur.app'  // 允許所有 .zeabur.app 子域名
  ]
}
```

這確保了應用可以在 Zeabur 的域名下正常運行。

---

## 📝 更新部署

當您更新代碼後：

1. **提交更改到 Git**
   ```bash
   git add .
   git commit -m "更新描述"
   git push
   ```

2. **Zeabur 自動部署**
   - Zeabur 會自動檢測到新的推送
   - 自動觸發重新構建和部署
   - 通常需要 2-5 分鐘完成

3. **手動重新部署（可選）**
   - 在 Zeabur 控制台點擊 **"Redeploy"** 按鈕

---

## ⚠️ 故障排除

### 問題 1: 部署後出現空白頁面

**解決方案：**
- 檢查環境變數是否正確設置
- 確認 `dist` 文件夾中有 `index.html`
- 檢查瀏覽器控制台是否有錯誤訊息

### 問題 2: 無法連接到 Supabase

**解決方案：**
- 確認環境變數 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY` 已正確設置
- 檢查 Supabase 專案的網路設置
- 確認 Supabase 專案沒有被暫停

### 問題 3: 主機被阻擋錯誤

**解決方案：**
- 確認 `vite.config.js` 中的 `preview.allowedHosts` 包含您的 Zeabur 域名
- 如果使用自訂域名，需要將域名添加到 `allowedHosts`

### 問題 4: 構建失敗

**解決方案：**
- 檢查構建日誌中的錯誤訊息
- 確認 `package.json` 中的依賴都已正確安裝
- 確認 Node.js 版本兼容（建議使用 Node.js 18+）

---

## 🎯 自訂網域（可選）

如果需要使用自訂網域：

1. 在 Zeabur 專案設置中點擊 **"Domains"** 或 **"網域"**
2. 點擊 **"Add Domain"** 或 **"新增網域"**
3. 輸入您的域名（例如：`rating.yourdomain.com`）
4. 按照指示設置 DNS 記錄：
   - 添加 CNAME 記錄指向 Zeabur 提供的域名
5. 等待 DNS 傳播（通常需要幾分鐘到幾小時）

---

## ✅ 部署檢查清單

- [ ] Git 倉庫已創建並推送代碼
- [ ] Zeabur 專案已創建並連接 Git 倉庫
- [ ] 構建設置已正確配置
- [ ] 環境變數 `VITE_SUPABASE_URL` 已設置
- [ ] 環境變數 `VITE_SUPABASE_ANON_KEY` 已設置
- [ ] 部署已成功完成
- [ ] 可以訪問大螢幕控制台 (`/admin`)
- [ ] 可以訪問觀眾評分頁面 (`/`)
- [ ] Supabase 連接正常

---

## 📞 需要幫助？

如果遇到問題：
1. 檢查 Zeabur 構建日誌
2. 查看瀏覽器控制台的錯誤訊息
3. 確認 Supabase 專案狀態
4. 參考 Zeabur 官方文檔：https://zeabur.com/docs

---

**祝部署順利！🎉**

