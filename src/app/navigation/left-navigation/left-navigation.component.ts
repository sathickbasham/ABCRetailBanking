import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginServiceService } from 'src/app/LoginService/login/login-service.service';
import { Users } from 'src/app/models/users.model';
import { UserState } from 'src/app/store/reducer/user.reducer';
import { selectUsers } from 'src/app/store/selector/user.selectors';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.css']
})
export class LeftNavigationComponent implements OnInit {
  users:Users[]=[];
  isAdmin : boolean = false;
  constructor(private store:Store<UserState>, private loginService:LoginServiceService) { 
    this.loginService.getUsers().subscribe((Users)=>{
      this.users=Users;
    })
    
  }

  ngOnInit(): void {
  }

}
