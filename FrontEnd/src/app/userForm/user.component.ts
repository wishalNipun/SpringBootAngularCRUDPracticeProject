import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { UserI } from '../user-i';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  baseUrl:string='http://localhost:8080/app/user';
  ngOnInit(): void{
    this.loadAllData();
    this.onKeyUp;


  }

  name!:string;
  id!:string;
  address!:string;
  password!:string;

  pageSize=9;
  pageIndex=0;
  totalItems=0;

  

  constructor(private http: HttpClient) {}

  onSubmit() {
   
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    this.http.post(this.baseUrl,JSON.stringify({id:this.id,name:this.name,address:this.address,password:this.password}),options
    )
      .subscribe(
        (response:any) => {

           Swal.fire({
          position: 'top',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
          })

          
         
          this.loadAllData();
          this.inputFieldClear();
        },
        error => {
          console.error('Error submitting form data:', error);
        }
      );
  }

  onUpdate() {
    
    //customerDTO:any={id:this.id,name:this.name,address:this.address,salary:this.salary}
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    this.http.put(this.baseUrl,JSON.stringify({id:this.id,name:this.name,address:this.address,password:this.password}),options
    )
      .subscribe(
        (response:any) => {
          
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 1500
            })

          this.loadAllData();
          this.inputFieldClear();
        },
        error => {
          console.error('Error Updating form data:', error);
        }
      );
  }
  onDelete(a:any) {
    console.log(this.name,this.password,this.address,this.name);
    

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {


            this.http.delete(this.baseUrl+'?id='+a.id
            ).subscribe(
                (response:any) => {
                 

                  Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                    })

                  this.loadAllData();
                  this.inputFieldClear();
                },
                error => {
                  console.error('Error Updating form data:', error);
                }
              );
      }
    })
   
   

      
  }

  array:UserI[]=[];
  loadAllData():void{
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    this.http.get(this.baseUrl,options
    )
      .subscribe(
        (response:any) => {
       
          this.array=response.data;

          this.totalItems=response.data.length;
          this.pageIndex=0
        },
        error => {
          console.error('Error Updating form data:', error);
        }
      );
  }

  // rowclick(a:any){
  //   this.existCustomer(a.id);
  //   this.id =a.id;
  //   this.name =a.name;
  //   this.address =a.address;
   
  // }

  inputFieldClear():void{
    this.id ="";
    this.name ="";
    this.address ="";
    this.password="";
  }


  btnType!:boolean;
  onKeyUp(event:any) { 
   
    this.existCustomer(event.target.value);
    if (event.key === 'Enter') {
      this.getCustomer(event.target.value);
    }
  }
  
  existCustomer(x:any ):void{
    this.http.get(this.baseUrl+'?id='+x
    ).subscribe(
      (response:any) => {
          this.btnType=response.data;
        
  
        },
        error => {
          console.error('Error Exist form data:', error);
        }
      );
   }
   getCustomer(x:any):void{
    this.http.get(this.baseUrl+'/uSet?id='+x
    ).subscribe(
      (response:any) => {
       
          
        this.id =response.data.id;
        this.name =response.data.name;
        this.address =response.data.address;
        
  
        },
        (error:any) => {
          
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'User Id Not Exist',
            showConfirmButton: false,
            timer: 1500
            })

          this.name ="";
          this.address ="";
          this.password="";
    
        }
      );
  }

   onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    
  }
  onEdit(a:any):void{
        this.id =a.id;
        this.name =a.name;
        this.address =a.address;
        
        this.existCustomer(a.id);

       this.validateInputFieldChecker("userId",a.id);
       this.validateInputFieldChecker("userName",a.name);
       this.validateInputFieldChecker("userAddress",a.address);
       this.validateInputFieldChecker("userPassword",a.password);
  
  }
  
  isValidUserId =false;
  isValidUserName =false;
  isValidUserAddress =false;
  isValidUserPassword =false;


  btnUserForm=true;

  btnEnableDisbleEvent():void{
    if (this.isValidUserId && this.isValidUserName && this.isValidUserAddress && this.isValidUserPassword) {
      this.btnUserForm = false;
    }else{
      this.btnUserForm=true;
    }
  } 

  validateInputFieldChecker(inputType: string, value:string){
    let pattern;
   
    switch (inputType) {
      case "userId":
        pattern = /^(C)[0-9]{3}$/;
        this.isValidUserId =!!value.match(pattern)
        this.btnEnableDisbleEvent();
        console.log(!!value.match(pattern))
      
        break;
      case "userName":
        pattern = /^[A-z]{3,20}$/;
        this.isValidUserName =!!value.match(pattern)
        this.btnEnableDisbleEvent();
      
        break;
      case "userAddress":
        pattern = /^[A-z0-9 /,]{4,20}$/;
        this.isValidUserAddress =!!value.match(pattern)
        this.btnEnableDisbleEvent();
      
        break;
      case "userPassword":
        pattern = /^[A-z0-9#@$^&*!/,]{8,15}$/;
        this.isValidUserPassword =!!value.match(pattern)
        this.btnEnableDisbleEvent();
   
        break;
      default:
   

        
    }
  }


 validateInput = (inputType: string,event: any): void => {
  this.validateInputFieldChecker(inputType, event.target.value);


  };


}
