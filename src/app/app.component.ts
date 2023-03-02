import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SockectService } from './shared/services/sockect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  constructor(
    private authSvc: AuthService,
    private socketSvc: SockectService
  ) {}

  ngOnInit(): void {
    // this.authSvc.getCurrentUser().subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.authSvc.setCurrentUser(null);
    //   }
    // );

    // ****************************************
    const token = localStorage.getItem('token') || '';
    if (token) {
      const user = JSON.parse(atob(token?.split('.')[1]));
      const id = `${user.id}`;

      this.authSvc.getUser(id).subscribe((currentUser) => {
        this.socketSvc.setupSocketConnection(currentUser);
        this.authSvc.setCurrentUser(currentUser);
      });
    } else {
      return;
    }

    // ****************************************
  }
}
