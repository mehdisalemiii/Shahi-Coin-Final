import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Define your Mongoose schema
export const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  points: { type: Number, default: 0 },
});

// Create a Mongoose model
export const User = mongoose.models.User || mongoose.model('User', userSchema);

// Replace with your MongoDB connection string
const uri = 'mongodb://root:w11gtQZhbR1xHT33jpvuEjs8@monte-rosa.liara.cloud:33997/my-app?authSource=admin';

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB (only connect once if possible, e.g., in a separate file)
    await mongoose.connect(uri);

    const userData = await req.json();

    if (!userData || !userData.id) {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
    }

    // Use Mongoose to find or create the user
    const user = await User.findOneAndUpdate(
      { telegramId: userData.id },
      { 
        username: userData.username || '',
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
      },
      { upsert: true, new: true } // upsert: create if not found, new: return updated doc
    );

    return NextResponse.json(user);
  } catch (error: any) { // Or a more specific error type
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 },
    );
  }
  // No need to manually close the connection with Mongoose
}
