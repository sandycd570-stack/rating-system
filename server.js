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
    let indexHtml = readFileSync(indexPath, 'utf-8');
    
    // 注入運行時環境變數到 HTML（支援 Zeabur 運行時環境變數）
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://lofmejhovipawspgeces.supabase.co';
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I';
    
    // 在 </head> 之前注入環境變數腳本
    const envScript = `
    <script>
      // 運行時環境變數注入（支援 Zeabur）
      window.__RUNTIME_ENV__ = {
        VITE_SUPABASE_URL: ${JSON.stringify(supabaseUrl)},
        VITE_SUPABASE_ANON_KEY: ${JSON.stringify(supabaseAnonKey)}
      };
      console.log('🔧 運行時環境變數已注入:', {
        url: window.__RUNTIME_ENV__.VITE_SUPABASE_URL ? '✅' : '❌',
        key: window.__RUNTIME_ENV__.VITE_SUPABASE_ANON_KEY ? '✅' : '❌'
      });
    </script>`;
    
    // 在 </head> 標籤之前插入環境變數腳本
    indexHtml = indexHtml.replace('</head>', envScript + '</head>');
    
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

