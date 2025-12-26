import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lofmejhovipawspgeces.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZm1lamhvdmlwYXdzcGdlY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTI5MjIsImV4cCI6MjA4MTU4ODkyMn0.1IYJOLUD1SqtjmMvRtJly7z5ISVfCXcc0LpseyvnQ-I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

