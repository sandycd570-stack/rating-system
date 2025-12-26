-- 如果 Realtime 未啟用，執行以下 SQL 來啟用

-- 1. 確保 app_status 表已啟用 Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_status;

-- 2. 確保 ratings 表已啟用 Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.ratings;

-- 如果上面的命令執行失敗（表已經在 publication 中），可以忽略錯誤
-- 或者先檢查是否已存在：
-- SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename IN ('app_status', 'ratings');

