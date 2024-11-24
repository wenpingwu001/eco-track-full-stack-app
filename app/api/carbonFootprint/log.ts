// pages/api/carbonFootprint/log.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, activityId, emissionAmount } = req.body;

    if (!userId || !activityId || !emissionAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const carbonFootprint = await prisma.carbonFootprint.create({
        data: {
          userId,
          activityId,
          emissionAmount,
        },
      });
      res.status(201).json(carbonFootprint);
    } catch (error) {
      res.status(500).json({ error: 'Failed to log carbon footprint' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
