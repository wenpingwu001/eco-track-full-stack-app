// pages/api/activity/delete.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Activity ID is required' });
    }

    try {
      await prisma.activity.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete activity' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
