import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient, ListTablesCommand, ScanCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  console.log('API Route Hit');
  console.log('Request Method:', req.method);

  console.log('AWS_REGION:', process.env.AWS_REGION);
  console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
  console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);

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

export async function POST(req: NextRequest) {
  try {
    const { TableName } = await req.json();
    if (!TableName) {
      return NextResponse.json({ error: 'TableName parameter is required' }, { status: 400 });
    }

    const command = new ScanCommand({ TableName });
    const data = await client.send(command);
    return NextResponse.json(data.Items, { status: 200 });
  } catch (error) {
    console.error('Error scanning DynamoDB table:', error);
    return NextResponse.json({ error: 'Could not scan DynamoDB table', details: (error as Error).message }, { status: 500 });
  }
}
