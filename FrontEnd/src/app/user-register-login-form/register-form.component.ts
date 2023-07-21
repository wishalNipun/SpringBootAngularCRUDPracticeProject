import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  baseUrl:string='http://localhost:8080/app/user';
  ngOnInit(): void{

    this.loadAllData;
    this.onKeyUp;
    
  }
  uid!:string;
  upassword!:string;
  name!:string;
  id!:string;
  address!:string;
  password!:string;

  constructor(private http: HttpClient,private router:Router) {}

  onLogin(){

    this.http.get(this.baseUrl+'/login?id='+this.uid+'&password='+this.upassword
    ).subscribe(
        (response:any) => {
         if(response.data){
          
          // Swal.fire({
          // position: 'top',
          // icon: 'success',
          // title: 'Login Success',
          // showConfirmButton: false,
          // timer: 1500
          // })
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            
              setTimeout(() => {
                this.router.navigate(['/userForm']); // Navigate after a slight delay
              }, 1000);

            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })

          
         }else{
         
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Invalid User Name Or Password',
            showConfirmButton: false,
            timer: 1500
            })

         }
        },
        error => {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Invalid User Name Or Password',
            showConfirmButton: false,
            timer: 1500
            })
        }
      );
  }

  onSubmit() {
   
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    this.http.post(this.baseUrl,JSON.stringify({id:this.id,name:this.name,address:this.address,password:this.password}),options
    )
      .subscribe(
        (response:any) => {
          this.inputFieldClear

              const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                
                  setTimeout(() => {
                    this.router.navigate(['/userForm']); // Navigate after a slight delay
                  }, 1000);

                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              })
        },
        error => {
          console.error('Error submitting form data:', error);
        }
      );
  }

  inputFieldClear():void{
    this.id ="";
    this.name ="";
    this.address ="";
    this.password="";
  }

  
   array:any=[];
   loadAllData():void{
     let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
     this.http.get(this.baseUrl,options
     )
       .subscribe(
         (response:any) => {
        
           this.array=response.data;
         },
         error => {
           console.error('Error Updating form data:', error);
         }
       );
   }

  isValidUserId =false;
  isValidUserName =false;
  isValidUserAddress =false;
  isValidUserPassword =false;

  isUserExist =false;

  disableSaveButton: boolean = true;
  userValidLabel :boolean=false;

  onKeyUp(event:any) { 
    console.log(this.isUserExist +""+ this.isValidUserId +""+ this.isValidUserName +""+ this.isValidUserAddress +""+ this.isValidUserPassword)
   
   this.existCustomer(event.target.value);
    
  }
  existCustomer(x:any ):void{
    this.http.get(this.baseUrl+'?id='+x
    ).subscribe(
      (response:any) => {
      
          if (response.data) {
            this.userValidLabel = true;
            this.isUserExist =false;
            this.btnEnableDisbleEvent();
          } else {
            this.userValidLabel = false;
            this.isUserExist =true;
            this.btnEnableDisbleEvent();
        }
        },
        error => {
         
        }
      );
   }

  // existCustomer(x:any ):void{
  //   this.http.get(this.baseUrl+'?id='+x
  //   ).subscribe(
  //     (response:any) => {
      
  //         if (response.data) {
  //           this.disableSaveButton = true;
  //         } else {
  //           this.disableSaveButton = false;
  //         }
  //       },
  //       error => {
  //         console.error('Error Exist form data:', error);
  //       }
  //     );
  //  }
   
  btnEnableDisbleEvent():void{
    if (this.isUserExist && this.isValidUserId && this.isValidUserName && this.isValidUserAddress && this.isValidUserPassword) {
        this.disableSaveButton=false;
    }else{
      this.disableSaveButton=true;
    }
  
  } 

  validateInputFieldChecker(inputType: string, value:string){
    let pattern;
   
    switch (inputType) {
      case "userId":
        pattern = /^(C)[0-9]{3}$/;
       
        
        this.btnEnableDisbleEvent();
        this.isValidUserId =!!value.match(pattern);
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

  this.validateInputSignIn(inputType, event.target.value);
  };


  validateInputSignIn(inputType:String,value:String ){

    if(inputType=="uName"){

      console.log("uName : "+value)

    }

    if(inputType=="uPassword"){
      console.log("uPassword : "+value)
    }

  }

  
}
