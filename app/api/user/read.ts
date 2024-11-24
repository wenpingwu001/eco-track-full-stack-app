// pages/api/user/read.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id as string) },
        include: {
          activities: true,  // Include the user's activities
          carbonFootprints: true,  // Include the user's carbon footprint logs
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
