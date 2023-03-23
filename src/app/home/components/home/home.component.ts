import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  stateOptions: any[] = [];
  isLoggedInSubs!: Subscription | undefined;

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
    this.isLoggedInSubs = this.authSvc.isLogged$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/boards');
      }
    });
  }

  onLanguageChange(item: any) {
    this.translate.use(item.value);
    localStorage.setItem('lang', item.value);
  }

  ngOnDestroy(): void {
    this.isLoggedInSubs?.unsubscribe();
  }
}
