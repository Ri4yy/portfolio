import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pdlncwijishnxsnnlckr.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkbG5jd2lqaXNobnhzbm5sY2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NDIyMzEsImV4cCI6MjEwNjUxODIzMX0.mzjMTfp3jU4JmpzFyGR7JyD90cb2QGY3Rk9YUOCpOec";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
