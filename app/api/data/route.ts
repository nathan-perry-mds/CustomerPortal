// app/api/data/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  console.log('API Route Hit');
  console.log('Request Method:', req.method);

  console.log('AWS_REGION:', process.env.NEXT_PUBLIC_AWS_REGION);
  console.log('AWS_ACCESS_KEY_ID:', process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID);
  console.log('AWS_SECRET_ACCESS_KEY:', process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY);

  // Log proxy settings
  console.log('HTTP_PROXY:', process.env.HTTP_PROXY);
  console.log('HTTPS_PROXY:', process.env.HTTPS_PROXY);
  console.log('NO_PROXY:', process.env.NO_PROXY);

  console.log('Handling GET request');

  try {
    console.log('Testing DynamoDB connectivity');
    const startTime = Date.now();

    const command = new ListTablesCommand({});
    const data = await client.send(command);

    const endTime = Date.now();
    console.log(`DynamoDB connectivity test completed in ${endTime - startTime}ms`);
    console.log('List of tables:', data.TableNames);

    return NextResponse.json(data.TableNames, { status: 200 });
  } catch (error) {
    console.error('Error testing DynamoDB connectivity:', error);
    return NextResponse.json({ error: 'Could not connect to DynamoDB', details: (error as Error).message }, { status: 500 });
  }
}
