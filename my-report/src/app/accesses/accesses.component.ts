import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';

@Component({
  selector: 'app-accesses',
  templateUrl: './accesses.component.html',
  styleUrls: ['./accesses.component.css']
})

export class AccessesComponent implements OnInit {

  displayedColumns = ['name', 'username', 'email'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.loadAccess().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

}