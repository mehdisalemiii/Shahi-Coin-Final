// backend/routes/userData.js
import express from 'express';
import { createClient } from '@supabase/supabase-js';


const router = express.Router();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);



// GET /api/userData/:id - Get user data by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('users') // Replace 'users' with your Supabase table name
      .select('*')
      .eq('id', userId);


    if (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ error: 'Failed to fetch user data' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error in userData route (GET):', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// POST /api/userData - Create a new user (example)
router.post('/', async (req, res) => {
    const userData = req.body; // Data for the new user

    try {
      const { data, error } = await supabase
        .from('users')  // Your table name
        .insert([userData]); // Insert the user data

      if (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Failed to create user' });
      }

      res.status(201).json(data); // 201 Created
    } catch (error) {
      console.error('Error in userData route (POST):', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  export default router;

