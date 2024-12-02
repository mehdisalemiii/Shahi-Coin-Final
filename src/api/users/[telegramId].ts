import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // Adjust path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const telegramId = parseInt(req.query.telegramId as string);

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { telegramId },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { username, firstName, lastName, points, energy } = req.body;
      const updatedUser = await prisma.user.update({
        where: { telegramId },
        data: { username, firstName, lastName, points, energy },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
