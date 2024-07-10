import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lmslitoingoqdepaultg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtc2xpdG9pbmdvcWRlcGF1bHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3ODk5NTAsImV4cCI6MjAzMjM2NTk1MH0.F6tj1fKZYyveYo4kxPPL6x0VCt6_bFjoaS5VoloLI7c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
