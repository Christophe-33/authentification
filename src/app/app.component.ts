import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentUser: User;

  constructor(
    private router : Router,
    private authService : AuthenticationService
  ){
    this.authService.currentUser.subscribe(
      (user)=>this.currentUser=user
    )
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
