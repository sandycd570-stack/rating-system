# 從本機專案部署到 Zeabur

## 🚀 部署方式

Zeabur 支援從 Git 倉庫部署。要將本機專案部署到 Zeabur，需要先將專案推送到 Git 倉庫（GitHub/GitLab/Bitbucket），然後在 Zeabur 中選擇該倉庫。

---

## 📋 步驟 1：準備本地專案

### 1.1 檢查 Git 狀態

```bash
# 檢查是否已初始化 Git
git status
```

如果還沒有初始化 Git：

```bash
git init
git add .
git commit -m "準備部署到 Zeabur"
```

### 1.2 創建 Git 遠端倉庫

#### 選項 A：使用 GitHub（推薦）

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

#### 選項 B：使用 GitLab

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

## 📋 步驟 2：在 Zeabur 部署

### 2.1 登入 Zeabur

1. 訪問 https://zeabur.com
2. 使用您的 GitHub/GitLab/Bitbucket 帳號登入

### 2.2 創建新專案

1. 點擊 **"New Project"** 或 **"新增專案"**
2. 選擇 **"Import Git Repository"** 或 **"導入 Git 倉庫"**
3. 選擇您剛才推送的 Git 倉庫（GitHub/GitLab/Bitbucket）

### 2.3 配置專案設置

Zeabur 會自動檢測到這是 Vite 專案，確認以下設置：

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Start Command**: `npm run start`（或留空，Zeabur 會自動處理）
- **Port**: `3000`（如果需要手動設置）

### 2.4 設置環境變數（重要！）

在 Zeabur 專案設置中，點擊 **"Environment Variables"** 或 **"環境變數"**，添加：

```
VITE_SUPABASE_URL = https://lofmejhovipawspgeces.supabase.co
```

```
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I
```

**設置方式：**
1. 在專案頁面，點擊 **"Environment Variables"**
2. 點擊 **"Add Variable"** 或 **"新增變數"**
3. 分別添加上述兩個環境變數
4. 點擊 **"Save"** 保存

### 2.5 開始部署

1. 點擊 **"Deploy"** 或 **"部署"** 按鈕
2. 等待構建完成（通常需要 2-5 分鐘）
3. 部署完成後，Zeabur 會提供一個網址

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

## 🔄 更新部署

當您修改本地代碼後：

1. **提交更改**
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

- [ ] 本地專案已初始化 Git
- [ ] 代碼已推送到 GitHub/GitLab/Bitbucket
- [ ] Zeabur 專案已創建並連接 Git 倉庫
- [ ] 環境變數 `VITE_SUPABASE_URL` 已設置
- [ ] 環境變數 `VITE_SUPABASE_ANON_KEY` 已設置
- [ ] 部署已完成且無錯誤
- [ ] 可以訪問大螢幕控制台 (`/admin`)
- [ ] 可以訪問觀眾評分頁面 (`/`)

---

## ⚠️ 注意事項

1. **必須使用 Git 倉庫**：Zeabur 目前主要支援從 Git 倉庫部署，不支援直接上傳本地文件
2. **環境變數**：必須在 Zeabur 中設置環境變數，否則應用無法連接到 Supabase
3. **自動部署**：每次推送到 Git 倉庫時，Zeabur 會自動重新部署

---

## 🆘 需要幫助？

如果遇到問題：
1. 檢查 Zeabur 構建日誌
2. 查看瀏覽器控制台的錯誤訊息
3. 確認 Supabase 專案狀態
4. 參考 Zeabur 官方文檔：https://zeabur.com/docs

---

**祝部署順利！🎉**

