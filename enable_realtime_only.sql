-- 只啟用 Realtime，不創建表（表已存在時使用）

-- 啟用 app_status 表的 Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_status;

-- 啟用 ratings 表的 Realtime  
ALTER PUBLICATION supabase_realtime ADD TABLE public.ratings;

-- 如果執行成功，不會有任何錯誤訊息
-- 如果表已經在 publication 中，可能會顯示警告，但可以忽略

