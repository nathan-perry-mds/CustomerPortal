// app/pages/api/data.ts

import { NextApiRequest, NextApiResponse } from 'next';
import dynamoDB from '../../utils/aws'; // Correct import path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API Route Hit'); // Debug log
  console.log('Request Method:', req.method); // Debug log

  if (req.method === 'GET') {
    console.log('Handling GET request'); // Debug log
    const params = {
      TableName: '655_main'
    };

    try {
      const data = await dynamoDB.scan(params).promise();
      console.log('Data from DynamoDB:', data); // Debug log
      res.status(200).json(data.Items);
    } catch (error) {
      console.error('Error fetching data from DynamoDB:', error); // Debug log
      res.status(500).json({ error: 'Could not load data from DynamoDB' });
    }
  } else {
    console.log(`Method ${req.method} Not Allowed`); // Debug log
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
