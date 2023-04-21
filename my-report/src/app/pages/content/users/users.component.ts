import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  displayedColumns = [
    'id',
    'user_id',
    'firstname',
    'lastname',
    'birthday',
    'email',
    'phone',
    'authenticate',
  ];

  authenticatedStates: boolean[] = [];

  dataSource = new MatTableDataSource<any>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUser().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      this.authenticatedStates = data.map((element: any) => {
        return element.authenticate !== null;
      });
    });
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  toggleAuthenticated(event: any, index: number) {
    const row = this.dataSource.data[index];
    if (row) {
      row.authenticate = event.checked ? new Date().toISOString() : null;
    }
  }

  isRowAuthenticated(row: any) {
    return row.authenticate !== null;
  }

  toggleAuthentication(event: any, element: any) {
    const checked = event.checked;
    console.log(
      `Toggled authentication for element with id ${element.user_id}, ${checked}`
    );

    if (checked) {
      this.dataService
        .authenticateUser(element.user_id)
        .then((response) => console.log(response));
    } else {
      this.dataService
        .deauthenticateUser(element.user_id)
        .then((response) => console.log(response));
    }
  }

  public exportPDF() {
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    const rows: any[][] = [];
    const header = [
      'id',
      'user_id',
      'firstname',
      'lastname',
      'birthday',
      'email',
      'phone',
      'authenticate',
    ];

    this.dataService.getUser().subscribe((data) => {
      data.forEach((item) => {
        const authenticateText = item.authenticate
          ? 'Autenticado'
          : 'Sin autenticar';
        const dataRow = [
          item.id,
          item.user_id,
          item.firstname,
          item.lastname,
          item.birthday,
          item.email,
          item.phone,
          authenticateText,
        ];
        rows.push(dataRow);
      });

      autoTable(doc, {
        head: [header],
        body: rows,
      });

      doc.save('registro_usuarios.pdf');
    });
  }
}
