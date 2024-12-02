import axios from 'axios';

interface UserData {
  id: number; // Telegram user ID
  username?: string;
  first_name?: string;
  last_name?: string;
  // ... other fields ...
}

export async function POST(request: Request) {
  try {
    const userData: UserData = await request.json();

    if (!userData || !userData.id) {
      return new Response(JSON.stringify({ error: 'Invalid user data' }), { status: 400 });
    }

    const response = await axios.post('/api/telegram/webhook', userData); // Send data to your webhook route
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', message: error?.message }), { status: 500 });
  }
}
