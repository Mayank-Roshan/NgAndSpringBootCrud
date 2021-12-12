import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from './models/employee';
import { EmployeeService } from './service/employee.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanager-ui';
  employeeForm!: FormGroup;
  employee!:Employee;

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

  constructor(private employeeService:EmployeeService,
              private _snackBar: MatSnackBar  
            ){}

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
      this.resetEmployeeForm();
      button.setAttribute('data-target','#addEmployeeModal');
    }
    else if(mode==='edit'){
      button.setAttribute('data-target','#updateEmployeeModal');
      this.copyEmployeeToForm(employee);

    }
    else if(mode==='delete'){
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  addEmployee():void{
    const employee=this.employeeForm.value as Employee;
    this.employeeService.addEmployees(employee).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees();
        this.resetEmployeeForm();
        this.openSnackBar('Created Successfully','Close');
        this.hideModal('add');
      },
      (error:HttpErrorResponse)=>{
        console.log(error.message);
        this.openSnackBar('Something went wrong','Close');
      }
    );
  }

  editEmployee():void{
    const employee=this.employeeForm.value as Employee;
    this.employeeService.updateEmployees(employee).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees();
        this.resetEmployeeForm();
        this.openSnackBar('Edited Successfully','Close');
        this.hideModal('edit');
      },
      (error:HttpErrorResponse)=>{
        console.log(error.message);
        this.openSnackBar('Something went wrong','Close');
      }
    );
  }

  resetEmployeeForm(){
    this.employeeForm.reset();
  }

  copyEmployeeToForm(employee:any){
    this.employeeForm.setValue({
      name:employee.name,
      imageUrl:employee.imageUrl,
      jobTitle:employee.jobTitle,
      phone:employee.phone,
      email:employee.email,
      id:employee.id
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration:5000,
      panelClass: ['emerald-snackbar']
    });
  }

  hideModal(modalToHide:string):void{
    if(modalToHide==='add'){
      document.getElementById('closeAdd')?.click();
    }
    else if(modalToHide==='edit'){
      document.getElementById('closeEdit')?.click();
    }
  }

}
