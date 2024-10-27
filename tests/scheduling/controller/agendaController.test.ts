import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { getAgendas } from '../../../src/agenda/controller/agendaController';
import { AgendaService } from '../../../src/agenda/service/agendaService';

// Mock the AgendaService
jest.mock('../../../src/agenda/service/agendaService');

describe('AgendaController', () => {
    const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;
    const mockContext: Context = {} as Context;
  
    const createMockAgendaService = (mockImplementation: () => Promise<any>) => {
      (AgendaService.prototype.getAgendas as jest.Mock).mockImplementation(mockImplementation);
    };
  
    const invokeHandler = () => getAgendas(mockEvent, mockContext, {} as any);
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getAgendas', () => {
      it('should return agendas successfully', async () => {
        // Arrange
        const mockAgendas = [{ id: 1, name: 'Agenda 1' }, { id: 2, name: 'Agenda 2' }];
        createMockAgendaService(() => Promise.resolve(mockAgendas));
  
        // Act
        const result = await invokeHandler();
  
        // Assert
        expect(result).toEqual({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ medicos: mockAgendas }),
        });
      });
  
      it('should handle errors and return a 500 status', async () => {
        // Arrange
        const mockError = new Error('Test error');
        createMockAgendaService(() => Promise.reject(mockError));
  
        // Act
        const result = await invokeHandler();
  
        // Assert
        expect(result).toEqual({
          statusCode: 500,
          body: JSON.stringify(mockError),
        });
      });
    });
  });