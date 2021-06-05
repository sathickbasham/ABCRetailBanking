import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../LoginService/login/login-service.service';
import { Users } from '../models/users.model';
import { UserState } from '../store/reducer/user.reducer';
import { selectUsers } from '../store/selector/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
