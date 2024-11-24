// pages/api/carbonFootprint/update.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id, emissionAmount } = req.body;

    if (!id || emissionAmount == null) {
      return res.status(400).json({ error: 'ID and emissionAmount are required' });
    }

    try {
      const updatedFootprint = await prisma.carbonFootprint.update({
        where: { id: parseInt(id) },
        data: { emissionAmount },
      });
      res.status(200).json(updatedFootprint);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update carbon footprint' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
