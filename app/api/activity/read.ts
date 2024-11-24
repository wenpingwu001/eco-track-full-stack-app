// pages/api/activity/read.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const activities = await prisma.activity.findMany({
        where: { userId: parseInt(userId as string) },
      });
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
