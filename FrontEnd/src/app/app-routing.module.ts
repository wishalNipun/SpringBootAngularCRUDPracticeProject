import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './user-register-login-form/register-form.component';
import { UserComponent } from './userForm/user.component';
const routes: Routes = [

  { path: 'userForm', component: UserComponent },
  { path: '', component: RegisterFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
