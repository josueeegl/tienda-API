import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


require("dotenv").config();

const dynamoClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
  },
  region: process.env.AWS_DEFAULT_REGION,
});

export default dynamoClient;
