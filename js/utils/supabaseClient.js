import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // From your .env file

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default supabase;