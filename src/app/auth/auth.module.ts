import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Routes,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
// import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [() => inject(AuthGuard).canActivate()],
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    // HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
