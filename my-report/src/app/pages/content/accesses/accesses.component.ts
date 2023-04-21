import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { format } from 'date-fns';
import { FormGroup, FormControl } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-accesses',
  templateUrl: './accesses.component.html',
  styleUrls: ['./accesses.component.css'],
})
export class AccessesComponent implements OnInit {
  displayedColumns = [
    'id',
    'actor_id',
    'actor_username',
    'action',
    'date',
    'time',
  ];

  dataSource = new MatTableDataSource<any>();

  rangeFormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  get fromDate() {
    const isoDateString = this.rangeFormGroup.get('start')!.value;
    const dateObj = new Date(isoDateString);
    return format(dateObj, 'MM/dd/yyyy');
  }
  get toDate() {
    const isoDateString = this.rangeFormGroup.get('end')!.value;
    const dateObj = new Date(isoDateString);
    return format(dateObj, 'MM/dd/yyyy');
  }

  constructor(private dataService: DataService) {}

  private formatLogData(logData: any[]) {
    logData.forEach((registro) => {
      const isoDateString = registro.created_at;
      const dateObj = new Date(isoDateString);
      registro.date = format(dateObj, 'MM/dd/yyyy');
      registro.time = format(dateObj, 'hh:mm a');
      switch (registro.action) {
        case 'user_signedup':
          registro.action = 'Usuario registrado';
          break;
        case 'logout':
          registro.action = 'Cerro sesion';
          break;
        case 'login':
          registro.action = 'Inicio sesion';
          break;
        default:
          registro.action = registro.action;
          break;
      }
    });
    return logData;
  }

  ngOnInit() {
    this.dataService.getLog().subscribe((data) => {
      this.dataSource.data = this.formatLogData(data);
      console.log('dataservice' + data.values);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }

  applyFilter() {
    this.dataService.getLog().subscribe((data) => {
      const filteredData = this.formatLogData(data).filter(
        (e) => e.date >= this.fromDate && e.date <= this.toDate
      );
      this.dataSource.data = filteredData;
    });
  }

  resetFilter() {
    this.dataService.getLog().subscribe((data) => {
      const newData = this.formatLogData(data);
      this.dataSource.data = newData;
    });
    this.rangeFormGroup.controls['start'].setValue(null);
    this.rangeFormGroup.controls['end'].setValue(null);
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  public exportPDF() {
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    const rows: any[][] = [];
    const header = [
      'ID',
      'ID de Usuario',
      'Correo electronico',
      'Accion',
      'Fecha',
      'Hora',
    ];

    const filteredData = this.dataSource.filteredData;
    filteredData.forEach((item) => {
      const dataRow = [
        item.id,
        item.actor_id,
        item.actor_username,
        item.action,
        item.date,
        item.time,
      ];
      rows.push(dataRow);
    });

    autoTable(doc, {
      head: [header],
      body: rows,
    });

    doc.save('registro_acceso.pdf');
  }
}
