// utils/aws.js

import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;
