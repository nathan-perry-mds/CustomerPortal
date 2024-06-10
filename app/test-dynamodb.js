const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const globalTunnel = require('global-tunnel-ng');

// Initialize proxy settings
globalTunnel.initialize({
  host: 'cn-1793907154-5-vnsg10006.ibossgov.com',
  port: 80,
  protocol: 'https'
});

// Create an AWS DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
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
