import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gxdyznxbsexxdabxlwjt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4ZHl6bnhic2V4eGRhYnhsd2p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMDk5MjUsImV4cCI6MjA2Njc4NTkyNX0.ebdsBGYyuavmsL0fAcQ2GoOfqFdvNCHs0NaeKzaqqnY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
