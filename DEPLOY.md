# 部署說明

## 方式 1：使用 Vercel CLI（推薦）

### 步驟：

1. **安裝 Vercel CLI**（如果尚未安裝）：
```bash
npm install -g vercel
```

2. **登入 Vercel**：
```bash
vercel login
```

3. **部署到 Vercel**：
```bash
vercel
```

4. **生產環境部署**：
```bash
vercel --prod
```

## 方式 2：使用 Vercel 網頁介面

1. 訪問 https://vercel.com
2. 使用 GitHub/GitLab/Bitbucket 登入
3. 點擊 "New Project"
4. 導入此專案
5. 設置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. 點擊 "Deploy"

## 方式 3：使用 Netlify

1. 訪問 https://netlify.com
2. 登入帳號
3. 將 `dist` 資料夾拖放到 Netlify
4. 或使用 Netlify CLI：
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 注意事項

- 確保 `public/stadium-background.jpg` 圖片已放置在正確位置
- 部署後，網站連結會自動生成
- 大螢幕控制台密碼：`8888`

