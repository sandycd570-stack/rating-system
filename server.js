import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 檢查 dist 目錄是否存在
const distPath = join(__dirname, 'dist');
if (!existsSync(distPath)) {
  console.error('ERROR: dist directory does not exist!');
  console.error('Please run "npm run build" first.');
  process.exit(1);
}

// 提供靜態文件
app.use(express.static(distPath));

// 處理所有路由，返回 index.html（SPA 路由）
app.get('*', (req, res) => {
  try {
    const indexPath = join(distPath, 'index.html');
    if (!existsSync(indexPath)) {
      console.error('ERROR: index.html does not exist in dist directory!');
      return res.status(500).send('index.html not found. Please rebuild the application.');
    }
    const indexHtml = readFileSync(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(indexHtml);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ Serving files from: ${distPath}`);
});

