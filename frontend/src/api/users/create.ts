import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { telegramId, username, firstName, lastName } = req.body;

      // Make a POST request to your backend API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramId, username, firstName, lastName }),
      });

      if (response.ok) {
        const newUser = await response.json();
        res.status(201).json(newUser);
      } else {
        res.status(response.status).json({ error: 'Failed to create user' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
