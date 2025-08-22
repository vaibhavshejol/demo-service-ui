import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly baseURL = `${environment.apiBase}/api/employees`;

  constructor(private readonly http: HttpClient) { }

  create(payload: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseURL, payload);
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseURL);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseURL}/${id}`);
  }

  update(id: number, payload: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseURL}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}
