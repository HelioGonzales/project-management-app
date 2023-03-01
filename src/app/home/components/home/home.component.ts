import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoggedInSubs!: Subscription | undefined;

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedInSubs = this.authSvc.isLogged$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/boards');
      }
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubs?.unsubscribe();
  }
}
