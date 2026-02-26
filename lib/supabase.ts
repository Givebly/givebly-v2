import { createClient } from '@supabase/supabase-js';

// These lines grab your secret keys from the .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// This exports the 'supabase' connection so any page in your app can use it
export const supabase = createClient(supabaseUrl, supabaseAnonKey);