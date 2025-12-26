# Zeabur SPA 路由修復說明

## 問題原因

Zeabur 在使用 `vite preview` 時可能無法正確處理 SPA（Single Page Application）路由。當訪問 `/admin` 時，服務器會嘗試尋找 `/admin` 文件或目錄，而不是將請求重定向到 `index.html` 讓 React Router 處理。

## 解決方案

已將 `package.json` 中的 `start` 命令從：
```json
"start": "vite preview --host --port 3000"
```

改為：
```json
"start": "serve -s dist -l 3000 --single"
```

### 說明

- `serve`: 一個簡單的靜態文件服務器
- `-s dist`: 服務 `dist` 目錄（構建輸出）
- `-l 3000`: 監聽 3000 端口
- `--single`: **關鍵參數**，將所有路由重定向到 `index.html`，讓 React Router 處理路由

## 已完成的更改

1. ✅ 添加 `serve` 包到 `dependencies`
2. ✅ 更新 `start` 命令使用 `serve` 並啟用 SPA 模式
3. ✅ 代碼已推送到 GitHub

## 接下來

1. **等待 Zeabur 自動重新部署**（通常 1-2 分鐘內會自動觸發）
2. 或者**手動點擊 Deploy**（如果沒有自動觸發）
3. 部署完成後，測試：
   - 觀眾評分頁面：`https://rating-system.zeabur.app/`
   - 大螢幕控制台：`https://rating-system.zeabur.app/admin`（密碼：8888）

## 為什麼這樣可以解決問題？

`serve` 包的 `--single` 標誌會：
1. 將所有不存在的路由（如 `/admin`）重定向到 `index.html`
2. 讓 React Router 接管路由處理
3. 正確渲染對應的組件（`AdminScreen` 或 `AudienceRating`）

這樣就能確保 SPA 路由正常工作。

---

**更新時間**: 剛剛
**狀態**: 等待 Zeabur 重新部署

