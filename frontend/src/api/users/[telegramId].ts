import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { telegramId } = req.query;

      // Make a GET request to your backend API
      const response = await fetch(`/api/users/${telegramId}`);

      if (response.ok) {
        const userData = await response.json();
        res.status(200).json(userData);
      } else {
        res.status(response.status).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
