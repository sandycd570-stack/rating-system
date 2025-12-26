-- 檢查哪些表已啟用 Realtime
SELECT 
  schemaname,
  tablename,
  CASE 
    WHEN tablename IN (
      SELECT tablename 
      FROM pg_publication_tables 
      WHERE pubname = 'supabase_realtime'
        AND schemaname = 'public'
    ) THEN '已啟用'
    ELSE '未啟用'
  END as realtime_status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('app_status', 'ratings')
ORDER BY tablename;

-- 查看所有已啟用 Realtime 的表
SELECT 
  schemaname,
  tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
ORDER BY tablename;

