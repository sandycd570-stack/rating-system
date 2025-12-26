# Zeabur 部署問題排查指南

## 您看到的錯誤分析

您提供的錯誤日誌中，大部分都是 **Zeabur 平台 UI 的警告**，不是您應用的錯誤：
- Apollo Client 警告（Zeabur UI 使用）
- `site.webmanifest` 404（Zeabur 平台嘗試加載）
- 這些都不影響您的應用運行

## 需要檢查的真正問題

### 1. 查看 Zeabur 構建日誌（重要！）

在 Zeabur 專案頁面：
1. 點擊 **"Deployments"** 或 **"部署記錄"**
2. 選擇最新的部署
3. 查看 **"Build Logs"** 或 **"構建日誌"**
4. 確認是否有以下訊息：
   - ✅ `npm install` 成功
   - ✅ `npm run build` 成功
   - ✅ `Server is running on port XXX`

### 2. 查看 Zeabur 運行日誌

在 Zeabur 專案頁面：
1. 點擊 **"Logs"** 或 **"日誌"** 標籤
2. 查看是否有以下訊息：
   - ✅ `Server is running on port XXX`
   - ✅ `Serving files from: /src/dist`
   - ❌ 如果有錯誤，請複製完整的錯誤訊息

### 3. 檢查 Zeabur 設置

在 Zeabur 專案設置中確認：

#### Build Settings（構建設置）
- **Build Command**: `npm run build`
- **Output Directory**: `dist`（或留空，Zeabur 會自動檢測）

#### Runtime Settings（運行設置）
- **Start Command**: `npm run start`（或 `node server.js`）
- **Port**: 留空（Zeabur 會自動設置 PORT 環境變數）

#### Environment Variables（環境變數）
確認已設置：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `PORT`（Zeabur 通常會自動設置，不需要手動添加）

### 4. 測試應用

部署完成後，在瀏覽器中測試：

1. **觀眾評分頁面**：
   ```
   https://rating-system.zeabur.app/
   ```
   - 應該顯示評分界面

2. **大螢幕控制台**：
   ```
   https://rating-system.zeabur.app/admin
   ```
   - 應該顯示登入界面（密碼：8888）

### 5. 常見問題和解決方案

#### 問題 1：構建失敗
**症狀**：構建日誌顯示錯誤
**解決方案**：
- 檢查 `package.json` 中的依賴是否正確
- 確認 `npm install` 成功
- 確認 `npm run build` 成功

#### 問題 2：服務器未啟動
**症狀**：運行日誌中沒有 "Server is running" 訊息
**解決方案**：
- 檢查 `server.js` 是否存在
- 確認 `package.json` 中的 `start` 命令正確
- 確認 `dist` 目錄已構建

#### 問題 3：404 錯誤
**症狀**：訪問頁面顯示 404
**解決方案**：
- 確認 `dist/index.html` 存在
- 確認 Express 服務器正確處理路由
- 檢查 Zeabur 的端口配置

#### 問題 4：空白頁面
**症狀**：頁面載入但顯示空白
**解決方案**：
- 打開瀏覽器開發者工具（F12）
- 查看 Console 標籤的錯誤
- 查看 Network 標籤，確認資源是否正確載入
- 確認 Supabase 環境變數已設置

## 下一步行動

請提供以下信息：

1. **Zeabur 構建日誌**（從 Deployments 頁面）
2. **Zeabur 運行日誌**（從 Logs 標籤）
3. **瀏覽器控制台錯誤**（訪問應用時，按 F12 查看）

這樣我才能準確診斷問題！

---

**注意**：您之前提供的錯誤都是 Zeabur 平台 UI 的警告，不是您應用的錯誤。真正的問題應該在 Zeabur 的構建或運行日誌中。

