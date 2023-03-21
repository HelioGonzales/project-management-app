import { SockectService } from './../../../shared/services/sockect.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage: string | null = null;
  form: any = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    login: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private socketSvc: SockectService,
    public translate: TranslateService
  ) {}

  onSubmit(): void {
    this.translate.setDefaultLang('en');
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.use(lang);
    }

    if (!this.form.valid) return;

    this.authSvc.register(this.form.value).subscribe(
      (currentUser) => {
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
