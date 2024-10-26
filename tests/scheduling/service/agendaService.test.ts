import { AgendaService } from '../../../src/agenda/service/agendaService';
import { doctorsMock } from '../../../src/agenda/mocks/doctorsScheduleMock';

describe('AgendaService', () => {
  let agendaService: AgendaService;

  beforeEach(() => {
    agendaService = new AgendaService();
  });

  describe('getAgendas', () => {
    it('should return list of doctors with their schedules', async () => {
      const result = await agendaService.getAgendas();
      expect(result).toEqual(doctorsMock);
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Dr. João Silva');
    });
  });
});
