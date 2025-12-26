# Zeabur 部署指南

## 部署步驟

### 1. 準備 Git 倉庫
確保您的程式碼已經推送到 Git 倉庫（GitHub、GitLab 或 Bitbucket）

```bash
git add .
git commit -m "準備部署到 Zeabur"
git push
```

### 2. 在 Zeabur 創建新專案

1. 訪問 https://zeabur.com
2. 登入您的帳號
3. 點擊 **"New Project"** 或 **"新增專案"**
4. 選擇 **"Import Git Repository"** 或 **"導入 Git 倉庫"**
5. 選擇您的 Git 倉庫

### 3. 配置專案設置

Zeabur 會自動檢測到這是一個 Vite 專案，但請確認以下設置：

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`（自動）
- **Start Command**: `npm run preview` 或留空（Zeabur 會自動使用靜態文件服務）

### 4. 設置環境變數

在 Zeabur 專案設置中，添加以下環境變數：

- `VITE_SUPABASE_URL`: 您的 Supabase 專案 URL
  - 例如：`https://lofmejhovipawspgeces.supabase.co`
  
- `VITE_SUPABASE_ANON_KEY`: 您的 Supabase Anon Key
  - 例如：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**設置方式：**
1. 在 Zeabur 專案頁面，點擊 **"Environment Variables"** 或 **"環境變數"**
2. 點擊 **"Add Variable"** 或 **"新增變數"**
3. 分別添加上述兩個環境變數

### 5. 部署

1. 點擊 **"Deploy"** 或 **"部署"**
2. 等待構建完成（通常需要 2-5 分鐘）
3. 部署完成後，Zeabur 會提供一個網址，例如：`https://rating-system-xxx.zeabur.app`

### 6. 自訂網域（可選）

如果需要使用自訂網域：
1. 在專案設置中點擊 **"Domains"** 或 **"網域"**
2. 添加您的自訂網域
3. 按照指示設置 DNS 記錄

## 注意事項

1. **環境變數**：確保在 Zeabur 中設置了 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`
2. **構建時間**：首次部署可能需要較長時間
3. **自動部署**：Zeabur 會在您推送程式碼到 Git 倉庫時自動重新部署
4. **預覽模式**：如果使用 `npm run preview`，請確保 `vite.config.js` 中的 `preview.allowedHosts` 已正確設置

## 故障排除

### 問題：部署後出現空白頁面
- 檢查環境變數是否正確設置
- 確認 `dist` 文件夾中有 `index.html`

### 問題：無法連接到 Supabase
- 檢查 Supabase 專案的網路設置
- 確認環境變數中的 URL 和 Key 是否正確

### 問題：主機被阻擋錯誤
- 確認 `vite.config.js` 中已設置 `preview.allowedHosts`

## 更新部署

每次更新程式碼後：
1. 推送到 Git 倉庫
2. Zeabur 會自動檢測並重新部署
3. 或手動在 Zeabur 控制台點擊 **"Redeploy"**

