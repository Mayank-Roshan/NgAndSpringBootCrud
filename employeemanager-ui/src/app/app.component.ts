import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from './models/employee';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanager-ui';
  employeeForm!: FormGroup;

  ngOnInit(){
    this.getEmployees();
    this.employeeForm= new FormGroup({
      'name':new FormControl(''),
      'phone':new FormControl(''),
      'email':new FormControl(''),
      'jobTitle':new FormControl(''),
      'id':new FormControl(''),
      'imageUrl':new FormControl('')
    });
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

  public onOpenModal(employee:Employee| null,mode:string):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');

    if(mode==='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    else if(mode==='edit'){
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    else if(mode==='delete'){
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
