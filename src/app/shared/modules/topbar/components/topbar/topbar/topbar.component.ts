import { Router } from '@angular/router';
import { AuthService } from './../../../../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  stateOptions: any[] = [];
  constructor(
    private authSvc: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {
    this.stateOptions = [
      { label: 'EN', value: 'en' },
      { label: 'ES', value: 'es' },
    ];
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
  }

  onLanguageChange(item: any) {
    this.translate.use(item.value);
    localStorage.setItem('lang', item.value);
  }

  logout(): void {
    this.authSvc.logout();
    this.router.navigateByUrl('/');
  }
}
