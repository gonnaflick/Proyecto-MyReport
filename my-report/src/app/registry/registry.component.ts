import { Component } from '@angular/core';

export interface Log {
  actionId: number;
  userId: number;
  ip: string;
  result: string;
  actionType: string;
  date: string;
  time: string;
  userStatus: string;
  attempts: number;
  verificationType: string;
}

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent {
  logs: Log[] = [
    {
      actionId: 1,
      userId: 101,
      ip: '192.168.1.1',
      result: 'FALLIDO',
      actionType: 'entrada',
      date: '2023-04-12',
      time: '10:30:45',
      userStatus: 'no existe',
      attempts: 5,
      verificationType: 'código de verificación del correo'
    },
    {
      actionId: 2,
      userId: 102,
      ip: '192.168.1.2',
      result: 'EXITOSO',
      actionType: 'salida',
      date: '2023-04-12',
      time: '11:20:15',
      userStatus: 'existe',
      attempts: 0,
      verificationType: 'N/A'
    }
  ];

  filteredLogs: Log[] = [];

}