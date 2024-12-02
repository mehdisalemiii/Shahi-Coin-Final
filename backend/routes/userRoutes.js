// backend/routes/userData.js  (Adjust path based on your project)
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;  // Server-side key
const supabase = createClient(supabaseUrl, supabaseKey);


router.get('/:id', async (req, res) => {
    const userId = req.params.id;


    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId);  // Use user.id here

        if (error) {
            console.error('Error fetching user data:', error);
            return res.status(500).json({ error: 'Failed to fetch user data' });
        }


        if (data.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(data[0]);

    } catch (error) {
        console.error('API Route Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;

