// pages/api/activity/create.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, activityId, emissionAmount } = req.body;

    try {
      const newFootprint = await prisma.carbonFootprint.create({
        data: {
          userId,
          activityId,
          emissionAmount,
        },
      });

      res.status(201).json(newFootprint);
    } catch (error) {
      res.status(500).json({ error: 'Failed to log activity' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
