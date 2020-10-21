import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public currentUser : User;
  public users : User[]=[];

  constructor(
    private userService : UserService,
    private authService : AuthenticationService
  ) {
    this.currentUser= this.authService.currentUserValue;
   }

  ngOnInit(): void {
    this.loadUsers();
  }

  public deleteUser(id:number){
    this.userService.delete(id).subscribe(
      ()=>{
        this.loadUsers();
      }
    )
  }

  private loadUsers(){
    this.userService.getAll().subscribe(
      (users)=>{
        this.users=users;
      }
    )
  }

}
