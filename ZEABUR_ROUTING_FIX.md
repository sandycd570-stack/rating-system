# Zeabur 路由修復指南

## 問題描述
只有觀眾評分頁面（`/`）可以訪問，大螢幕控制台（`/admin`）無法訪問。

## 已完成的修復

1. ✅ 更新了 `vite.config.js`，確保預覽模式正確處理所有路由
2. ✅ 更新了 `package.json`，確保啟動命令正確
3. ✅ 代碼已推送到 GitHub

## 接下來需要檢查的 Zeabur 配置

### 步驟 1：確認 Zeabur 自動重新部署

1. 登入 Zeabur：https://zeabur.com
2. 進入您的專案：`rating-system`
3. 檢查是否正在重新部署（應該會自動觸發）
4. 等待部署完成（通常需要 2-5 分鐘）

### 步驟 2：確認 Zeabur 構建和啟動命令

在 Zeabur 專案設置中，確認以下設置：

- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: `3000`

### 步驟 3：測試路由

部署完成後，測試以下網址：

1. **觀眾評分頁面**（應該可以訪問）：
   ```
   https://rating-system.zeabur.app/
   ```

2. **大螢幕控制台**（應該現在可以訪問）：
   ```
   https://rating-system.zeabur.app/admin
   ```
   - 登入密碼：`8888`

### 步驟 4：如果仍然無法訪問 `/admin`

如果修復後仍然無法訪問 `/admin`，請檢查以下項目：

#### 選項 A：檢查 Zeabur 日誌

1. 在 Zeabur 專案頁面，點擊 **"Logs"** 或 **"日誌"**
2. 查看是否有錯誤訊息
3. 特別注意是否有路由相關的錯誤

#### 選項 B：檢查瀏覽器控制台

1. 打開瀏覽器開發者工具（F12）
2. 訪問 `https://rating-system.zeabur.app/admin`
3. 查看 **Console** 和 **Network** 標籤
4. 檢查是否有錯誤訊息

#### 選項 C：確認 Zeabur 服務器配置

如果 Zeabur 支援自定義配置，可能需要：

1. 確認 Zeabur 使用的是 `vite preview` 模式（不是靜態文件服務）
2. 或者確認 Zeabur 有正確的 SPA 路由重定向配置

### 步驟 5：替代解決方案

如果上述方法都無法解決問題，可以嘗試：

#### 方案 1：使用 Zeabur 的靜態文件服務配置

如果 Zeabur 支援，創建一個配置文件來處理 SPA 路由：

1. 在專案根目錄創建 `zeabur.json`：
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

2. 提交並推送：
```bash
git add zeabur.json
git commit -m "添加 Zeabur 路由配置"
git push
```

#### 方案 2：檢查 Zeabur 文檔

查看 Zeabur 官方文檔，確認：
- 如何配置 SPA 路由
- 是否需要特殊的配置文件
- 是否有其他路由處理方式

## 常見問題

### Q: 為什麼 `/` 可以訪問但 `/admin` 不行？

A: 這通常是因為服務器沒有正確配置 SPA 路由重定向。所有路由都應該重定向到 `index.html`，然後由 React Router 處理。

### Q: `vite preview` 應該能處理路由，為什麼還需要配置？

A: `vite preview` 確實應該能處理路由，但某些部署平台可能需要額外的配置來確保正確處理。

### Q: 如何確認 Zeabur 使用的是 `vite preview` 而不是靜態文件服務？

A: 檢查 Zeabur 的構建日誌，應該會看到 `vite preview` 相關的輸出。如果沒有，可能需要調整 Start Command。

## 聯繫支援

如果問題仍然存在，建議：
1. 查看 Zeabur 官方文檔：https://zeabur.com/docs
2. 聯繫 Zeabur 技術支援
3. 在 Zeabur 社區論壇尋求幫助

---

**更新時間**: 剛剛
**狀態**: 等待 Zeabur 自動重新部署

