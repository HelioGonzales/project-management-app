import { SockectService } from './../../../shared/services/sockect.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage: string | null = null;
  form: any = this.fb.group({
    name: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private socketSvc: SockectService
  ) {}

  onSubmit(): void {
    this.authSvc.register(this.form.value).subscribe(
      (currentUser) => {
        console.log('Current User ', currentUser);
        // this.authSvc.setToken(currentUser)
        this.socketSvc.setupSocketConnection(currentUser);
        this.authSvc.setCurrentUser(currentUser);
        this.errorMessage = null;
        this.router.navigateByUrl('/login');
      },
      (err: HttpErrorResponse) => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;
      }
    );
  }
}
