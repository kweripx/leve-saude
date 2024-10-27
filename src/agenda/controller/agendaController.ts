import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { AgendaService } from '../service/agendaService';

const agendaService = new AgendaService();

/**
 * Handles the HTTP request to fetch agendas of doctors.
 * 
 * @param event - The API Gateway event containing request data.
 * @param context - The AWS Lambda context object.
 * @returns A promise that resolves to an APIGatewayProxyResult object containing the status code, headers, and body.
 * 
 * The response body contains a JSON object with a list of doctors' agendas under the key 'medicos'.
 * On success, returns a 200 status code with the agendas data.
 * On failure, returns a 500 status code with the error message.
 */
export const getAgendas: APIGatewayProxyHandler = async (event, context) => {
    try {
      const agendas = await agendaService.getAgendas();
      const result: APIGatewayProxyResult = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medicos: agendas }),
      };
      return result;
    } catch (error) {
      const result: APIGatewayProxyResult = {
        statusCode: 500,
        body: JSON.stringify(error),
      };
      return result;
    }
  };