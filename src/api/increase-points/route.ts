import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { User, userSchema } from '../users/route';



const uri = 'mongodb://root:w11gtQZhbR1xHT33jpvuEjs8@monte-rosa.liara.cloud:33997/my-app?authSource=admin';
const UserModel = mongoose.model('User', userSchema);

const newSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  points: { type: Number, default: 0 },
});


export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri);

    const { telegramId } = await req.json();

    if (!telegramId) {
      return NextResponse.json({ error: 'Invalid telegramId' }, { status: 400 });
    }

    // Use Mongoose to update the user's points
    const result = await User.updateOne(
      { telegramId },
      { $inc: { points: 1 } },
    );

    if (result.modifiedCount === 1) {
      // ...
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error: any) { // Or a more specific error type
    console.error('Error increasing points:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 },
    );
  } 
  // No need to manually close the connection with Mongoose
}
export default mongoose.models.User || mongoose.model('User', userSchema);