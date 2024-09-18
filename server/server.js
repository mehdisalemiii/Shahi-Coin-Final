require('dotenv').config(); // Load environment variables

import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors'; 

const app = express();
const port = process.env.PORT || 5000;

// Access the URI from environment variables
const uri = process.env.uri; 

// Connect to MongoDB (make sure the 'uri' variable is used correctly)
connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
app.use(bodyParser.json());
app.use(cors()); 

const client = new MongoClient(uri);
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/users/:userId', async (req, res) => { 
    try {
      const userId = req.params.userId; 
      const db = client.db('your-database-name');
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ _id: userId }); // Assuming you use _id
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });
  
  app.post('/api/users', async (req, res) => { 
    try {
      const newUser = req.body; 
      const db = client.db('your-database-name');
      const usersCollection = db.collection('users');
      const result = await usersCollection.insertOne(newUser);
      res.status(201).json(result.ops[0]); 
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  });
  
  app.put('/api/users/:userId', async (req, res) => { 
    try {
      const userId = req.params.userId;
      const updatedData = req.body; 
      const db = client.db('your-database-name');
      const usersCollection = db.collection('users');
  
      const result = await usersCollection.findOneAndUpdate(
        { _id: userId },
        { $set: updatedData }, 
        { returnOriginal: false } 
      );
  
      if (!result.value) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(result.value); 
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  });