import { SockectService } from './../../../shared/services/sockect.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;
  form: any = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private socketSvc: SockectService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.use(lang);
    }
  }

  onSubmit(): void {
    this.authSvc.login(this.form.value).subscribe(
      (currentUser) => {
        console.log('Current User ', currentUser);
        this.authSvc.setToken(currentUser);
        this.socketSvc.setupSocketConnection(currentUser);
        this.authSvc.setCurrentUser(currentUser);
        this.errorMessage = null;
        this.router.navigateByUrl('/');
      },
      (err: HttpErrorResponse) => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;
      }
    );
  }
}
