import { NextApiRequest, NextApiResponse } from 'next';
import dynamoDB from '../../../utils/aws'; // Adjust the import path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API Route Hit');
  console.log('AWS Region:', process.env.AWS_REGION);
  console.log('AWS Access Key ID:', process.env.AWS_ACCESS_KEY_ID);

  if (req.method === 'GET') {
    const params = {
      TableName: '655_main'
    };

    try {
      const data = await dynamoDB.scan(params).promise();
      console.log('Data from DynamoDB:', data);
      res.status(200).json(data.Items);
    } catch (error) {
      console.error('Error fetching data from DynamoDB:', error);
      res.status(500).json({ error: 'Could not load data from DynamoDB' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
