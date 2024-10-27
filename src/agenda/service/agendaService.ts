import { IDoctor } from '../interface/IDoctor';
import { doctorsMock } from '../mocks/doctorsScheduleMock';

export class AgendaService {
  public async getAgendas(): Promise<IDoctor[]> {
    return doctorsMock;
  }
}
