import { AgendamentoService } from './agendamentoService';

describe('AgendamentoService', () => {
  let agendamentoService: AgendamentoService;

  beforeEach(() => {
    agendamentoService = new AgendamentoService();
  });

  describe('createAppointment', () => {
    it('should create appointment successfully', async () => {
      const appointment = {
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00'
      };

      const result = await agendamentoService.createAppointment(appointment);
      
      expect(result.mensagem).toBe('Agendamento realizado com sucesso');
      expect(result.agendamento.medico).toBe('Dr. João Silva');
      expect(result.agendamento.paciente).toBe('Carlos Almeida');
    });

    it('should throw error for invalid doctor id', async () => {
      const appointment = {
        medico_id: 999,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00'
      };

      await expect(agendamentoService.createAppointment(appointment))
        .rejects
        .toThrow('Médico não encontrado');
    });

    it('should throw error for unavailable time slot', async () => {
      const appointment = {
        medico_id: 1,
        paciente_nome: 'Carlos Almeida',
        data_horario: '2024-10-05 08:00'
      };

      await expect(agendamentoService.createAppointment(appointment))
        .rejects
        .toThrow('Horário não disponível');
    });
  });
});
