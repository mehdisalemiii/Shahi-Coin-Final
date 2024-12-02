import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './src/models/User.js';

const app = express();
const port = process.env.PORT || 5000; // Use the port provided by your hosting environment or 5000
const mongoURI = 'mongodb://root:w11gtQZhbR1xHT33jpvuEjs8@monte-rosa.liara.cloud:33997/my-app?authSource=admin';

app.use(cors());
app.use(json());

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB using Mongoose');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// GET /api/users/:telegramId - Get user by Telegram ID
app.get('/api/users/:telegramId', async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.params.telegramId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// POST /api/users - Create or update user
app.post('/api/users', async (req, res) => {
  try {
    const { telegramId, username, firstName, lastName } = req.body;

    let user = await User.findOneAndUpdate(
      { telegramId },
      { username, firstName, lastName },
      { upsert: true, new: true }
    );

    res.json({ message: 'User created/updated', user });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Error creating/updating user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
