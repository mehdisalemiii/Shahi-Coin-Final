// C:\Shahi-Coin-Final\backend\utils\supabase\server.js
import { createClient } from '@supabase/supabase-js';


export function createClient(cookieStore) { // Export the function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Or process.env.SUPABASE_URL if not accessing directly from frontend
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL or service role key not set.');
    }


    const supabase = createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                //Authorization: `Bearer ${cookieStore.get('sb-access-token')?.value}` // Or similar to get the access token from cookie
                Authorization: 'Add your correct authorization' // Placeholder for Authorization

            },
        },
    });


    return supabase;
}

