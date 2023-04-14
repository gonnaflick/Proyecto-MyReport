import { Component, OnInit } from '@angular/core';

export interface Log {
  actionId: number;
  userId: number;
  ip: string;
  result: string;
  actionType: string;
  date: string;
  time: string;
  userStatus: string;
  verificationType: string;
}

@Component({
  selector: 'app-accesses',
  templateUrl: './accesses.component.html',
  styleUrls: ['./accesses.component.css']
})

export class AccessesComponent implements OnInit {
  searchText: any;

  logs: Log[] = [
    {
      actionId: 0,
      userId: 0,
      ip: '0.0.0.0',
      result: 'TEST',
      actionType: 'TEST',
      date: 'TEST',
      time: 'TEST',
      userStatus: 'TEST',
      verificationType: 'C'
    },
    {
      actionId: 1,
      userId: 1,
      ip: '0.0.0.0',
      result: 'TEST',
      actionType: 'TEST',
      date: 'Z',
      time: 'A',
      userStatus: 'B',
      verificationType: 'TEST'
    }
  ];

  newLog: Log = {
    actionId: 0,
    userId: 0,
    ip: '',
    result: '',
    actionType: '',
    date: '',
    time: '',
    userStatus: '',
    verificationType: ''
  };

  addLog() {
    this.logs.push(this.newLog);
    this.newLog = {
      actionId: 0,
      userId: 0,
      ip: '',
      result: '',
      actionType: '',
      date: '',
      time: '',
      userStatus: '',
      verificationType: ''
    };
  }

  ngOnInit(): void {
    console.log("papu")
  }
}
