import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee`);
  }

  public addEmployees(employee:Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employee`,employee);
  }

  public updateEmployees(employee:Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee`,employee);
  }

  public deleteEmployees(empId:number): Observable<Employee>{
    return this.http.delete<Employee>(`${this.apiServerUrl}/employee/${empId}`);
  }
}
