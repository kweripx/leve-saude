import { SchedulingService } from './../../../src/scheduling/service/schedulingService';
import { v4 as uuidv4 } from 'uuid';

describe('SchedulingService', () => {
  let schedulingService: SchedulingService;

  beforeEach(() => {
    schedulingService = new SchedulingService();
  });

  describe('createAppointment', () => {
    it('should create appointment successfully', async () => {
      const appointment = {
        doctor_id: '27516bc7-5c94-47b4-bcc9-219c415592e0',
        patient_name: 'Carlos Almeida',
        appointment_datetime: new Date('2024-10-05T09:00:00.000Z')
      };

      const result = await schedulingService.createAppointment(appointment);
      
      expect(result.message).toBe('Scheduling completed successfully');
      expect(result.appointment.doctor).toBe('Dr. João Silva');
      expect(result.appointment.patient).toBe('Carlos Almeida');
    });

    it('should throw error for invalid doctor id', async () => {
      const appointment = {
        doctor_id: uuidv4(),
        patient_name: 'Carlos Almeida',
        appointment_datetime: new Date('2024-10-05T09:00:00.000Z')
      };

      await expect(schedulingService.createAppointment(appointment))
        .rejects
        .toThrow('Doctor not found');
    });

    it('should throw error for unavailable time slot', async () => {
      const appointment = {
        doctor_id: '65e706e3-f9a8-4e07-a9fb-69f93598f8d6',
        patient_name: 'Carlos Almeida',
        appointment_datetime: new Date('2024-10-05T08:00:00.000Z')
      };

      await expect(schedulingService.createAppointment(appointment))
        .rejects
        .toThrow('Time slot not available');
    });
  });
});
