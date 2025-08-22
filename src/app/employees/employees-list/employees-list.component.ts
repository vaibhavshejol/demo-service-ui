import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private readonly employeeService: EmployeeService, private readonly router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  onDelete(e: Employee): void {
    if (!e.id) return;
    const ok = confirm(`Delete ${e.firstName} ${e.lastName}?`);
    if (!ok) return;
    this.employeeService.delete(e.id).subscribe(() => this.load());
  }
}
