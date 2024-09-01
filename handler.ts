import { APIGatewayProxyHandler } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
import app from './src/app'; // Ajuste o caminho conforme a estrutura do seu projeto

const server = awsServerlessExpress.createServer(app);

export const handler: APIGatewayProxyHandler = (event, context) => {
  return new Promise((resolve, reject) => {
    awsServerlessExpress.proxy(server, event, {
      succeed: (response) => resolve(response),
      fail: (error) => reject(error),
    });
  });
};
