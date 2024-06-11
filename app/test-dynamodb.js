const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const globalTunnel = require('global-tunnel-ng');
import { HttpsProxyAgent } from 'https-proxy-agent';

// Initialize proxy settings
globalTunnel.initialize({
  host: process.env.HTTPS_PROXY,
  port: 80,
  protocol: 'https'
});

// app/api/data/route.ts
const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  ...(proxy && {
    requestHandler: new HttpsProxyAgent(proxy),
  }),
});

// Function to scan the DynamoDB table
const scanTable = async () => {
  const params = {
    TableName: '655_main', // replace with your DynamoDB table name
  };

  try {
    console.log('Starting DynamoDB scan...');
    const command = new ScanCommand(params);
    const data = await client.send(command);
    console.log('Success:', data.Items);
  } catch (err) {
    console.error('Error:', err);
  }
};

scanTable();
