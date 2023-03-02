import { Router } from '@angular/router';
import { AuthService } from './../../../../../../auth/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  constructor(private authSvc: AuthService, private router: Router) {}
  logout(): void {
    this.authSvc.logout();
    this.router.navigateByUrl('/');
  }
}
