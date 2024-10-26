import { IScheduling } from "../interface/ISchedule";
import { doctorsMock } from "../../agenda/mocks/doctorsScheduleMock";
import { IDoctor } from "../../agenda/interface/IDoctor";

interface AppointmentResult {
  message: string;
  appointment: {
    doctor: string;
    patient: string;
    date: Date;
  };
}

const findDoctor = (doctorId: string): IDoctor | undefined => 
  doctorsMock.find(d => d.id === doctorId);

const validateAppointmentTime = (schedule: IScheduling) => (doctor: IDoctor | undefined): AppointmentResult => {
  if (!doctor) {
    throw new Error('Médico não encontrado');
  }
  if (!doctor.available_hours.includes(schedule.appointment_datetime.toISOString())) {
    throw new Error('Horário não disponível');
  }
  return {
    message: 'Agendamento realizado com sucesso',
    appointment: {
      doctor: doctor.name,
      patient: schedule.patient_name,
      date: schedule.appointment_datetime
    }
  };
};

export class SchedulingService {
  public async createAppointment(schedule: IScheduling): Promise<AppointmentResult> {
    return Promise.resolve(schedule.doctor_id)
      .then(findDoctor)
      .then(validateAppointmentTime(schedule));
  }
}