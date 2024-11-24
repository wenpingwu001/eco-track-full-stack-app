// pages/api/activity/update.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id, name, description, carbonEmission } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Activity ID is required' });
    }

    try {
      const updatedActivity = await prisma.activity.update({
        where: { id: parseInt(id) },
        data: { name, description, carbonEmission },
      });
      res.status(200).json(updatedActivity);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update activity' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
