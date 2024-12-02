// pages/api/yourApiRoute.js (or similar)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Safe to expose
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Server-side only key

if (!supabaseUrl || !supabaseKey) { // Check both variables
    throw new Error('Supabase URL or service role key not set in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method === 'GET') { // Example: GET request
        try {
            const { data, error } = await supabase
                .from('your_table_name') // Replace 'your_table_name' with your actual table name
                .select('*');

            if (error) {
                console.error('Error fetching data from Supabase:', error);
                return res.status(500).json({ error: 'Failed to fetch data' });
            }

            res.status(200).json(data);

        } catch (error) {
            console.error('Error in API route:', error);
            return res.status(500).json({ error: 'Internal Server Error' }); // Generic error message
        }

    } else if (req.method === 'POST') { // Example: POST request
        // ... handle POST requests to this route ...
    } else {
        res.status(405).end(); // Method Not Allowed for other methods
    }
}


