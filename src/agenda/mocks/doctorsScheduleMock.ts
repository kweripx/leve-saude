import { IDoctor } from '../interface/IDoctor';

export const doctorsMock: IDoctor[] = [
  {
    id: '27516bc7-5c94-47b4-bcc9-219c415592e0',
    name: "Dr. João Silva",
    expertise: "Cardiologista",
    available_hours: [
      "2024-10-05T09:00:00.000Z",
      "2024-10-05T10:00:00.000Z",
      "2024-10-05T11:00:00.000Z"
    ]
  },
  {
    id: '65e706e3-f9a8-4e07-a9fb-69f93598f8d6',
    name: "Dra. Maria Souza",
    expertise: "Dermatologista",
    available_hours: [
      "2024-10-06T14:00:00.000Z",
      "2024-10-06T15:00:00.000Z"
    ]
  }
];