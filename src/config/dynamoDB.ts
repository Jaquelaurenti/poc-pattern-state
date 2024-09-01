import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Configuração do cliente DynamoDB
const REGION = process.env.AWS_REGION || "us-east-1"; // Região padrão

const ddbClient = new DynamoDBClient({ region: REGION });

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export { ddbDocClient };
