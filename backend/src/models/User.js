// pages/api/userData.js (or similar)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Safe to expose on server
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;  // Server-side only key!
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'GET') {
     // Get the user ID however you're handling authentication (e.g., from a JWT)
     const userId = req.query.id;  // Adjust this to get the correct id

     const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId);  // Or use telegram_id if you're using that

     if (error) {
       return res.status(500).json({ error: 'Failed to fetch user data' });
     }

     return res.status(200).json(data); // Send the data to the client
  }
}

