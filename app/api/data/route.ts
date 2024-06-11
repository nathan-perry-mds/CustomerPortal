// app/api/data/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient, ListTablesCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { HttpsProxyAgent } from 'https-proxy-agent';

const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  ...(proxy && {
    requestHandler: new HttpsProxyAgent(proxy),
  }),
});

export async function GET(req: NextRequest) {
  console.log('API Route Hit');
  console.log('Request Method:', req.method);

  console.log('Handling GET request');

  const tableName = req.nextUrl.searchParams.get('tableName');

  try {
    console.log('Testing DynamoDB connectivity');
    const startTime = Date.now();

    // List tables
    const listTablesCommand = new ListTablesCommand({});
    const tablesData = await client.send(listTablesCommand);

    const endTime = Date.now();
    console.log(`DynamoDB connectivity test completed in ${endTime - startTime}ms`);
    console.log('List of tables:', tablesData.TableNames);

    if (tableName) {
      // Scan the specified table
      const scanCommand = new ScanCommand({ TableName: tableName });
      const scanData = await client.send(scanCommand);
      console.log('Scan result:', scanData.Items);
      return NextResponse.json({ tables: tablesData.TableNames, items: scanData.Items }, { status: 200 });
    } else {
      return NextResponse.json({ tables: tablesData.TableNames, message: 'TableName query parameter not provided, only listing tables' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error testing DynamoDB connectivity:', error);
    return NextResponse.json({ error: 'Could not connect to DynamoDB', details: (error as Error).message }, { status: 500 });
  }
}
