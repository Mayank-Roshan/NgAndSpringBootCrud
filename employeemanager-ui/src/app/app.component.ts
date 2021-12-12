import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanager-ui';

  ngOnInit(){
    this.getEmployees();
  }

  public employees: Employee[] = [];

  constructor(private employeeService:EmployeeService){}

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response:Employee[])=>{
          this.employees=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
        console.log(error.message);
      }
    );
  }

}
