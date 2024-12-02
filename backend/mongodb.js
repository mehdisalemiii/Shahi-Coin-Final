import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://root:w11gtQZhbR1xHT33jpvuEjs8@monte-rosa.liara.cloud:33997/my-app?authSource=admin'; // replace with your MongoDB connection string

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default mongoose;