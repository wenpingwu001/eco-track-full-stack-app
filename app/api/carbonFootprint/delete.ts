// pages/api/carbonFootprint/delete.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Carbon footprint ID is required' });
    }

    try {
      await prisma.carbonFootprint.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Carbon footprint deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete carbon footprint' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
