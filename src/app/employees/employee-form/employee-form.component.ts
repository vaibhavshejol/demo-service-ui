import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  id: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      phone: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    if (this.id) {
      this.employeeService.getById(this.id).subscribe(emp => this.form.patchValue(emp));
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value as Employee;
    if (this.id) {
      this.employeeService.update(this.id, payload).subscribe(() => this.router.navigate(['/employees']));
    } else {
      this.employeeService.create(payload).subscribe(() => this.router.navigate(['/employees']));
    }
  }
}
