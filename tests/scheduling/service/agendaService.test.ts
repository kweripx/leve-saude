import { AgendaService } from './agendaService';
import { medicosMock } from '../mocks/medicosMock';

describe('AgendaService', () => {
  let agendaService: AgendaService;

  beforeEach(() => {
    agendaService = new AgendaService();
  });

  describe('getAgendas', () => {
    it('should return list of doctors with their schedules', async () => {
      const result = await agendaService.getAgendas();
      expect(result).toEqual(medicosMock);
      expect(result.length).toBe(2);
      expect(result[0].nome).toBe('Dr. João Silva');
    });
  });
});
