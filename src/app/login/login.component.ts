import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../LoginService/login/login-service.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { Users } from '../models/users.model';
import { UserState } from '../store/reducer/user.reducer';
import { select, Store } from '@ngrx/store';
import { loginUser } from '../store/action/user.actions';
import { selectUsers } from '../store/selector/user.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User{

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm1:FormGroup;
  private formSubmitAttempt: boolean = false;
  userList:any[]=[];
  user:any[] = [];
  users:Users[]=[];
  constructor(private loginService:LoginServiceService, private fb:FormBuilder, private router:Router,
    private store:Store<UserState>) 
  {
    this.angForm1=this.fb.group({
      userName : [, Validators.required],
      password : [, Validators.required]
    })
    
   }

  ngOnInit(): void {
    
  }

  login(username:string, password:string):any{
    this.loginService.login().subscribe((User)=>
    { 
      
      this.userList = User.filter(x=>x.username === username && x.password === password);     
     
      if (this.userList.length > 0)
      {
        const user = new Users();
        user.username = this.userList[0].username;
        user.password = this.userList[0].password;
        user.role = this.userList[0].role;
        user.FirstName = this.userList[0].FirstName;
        user.LastName = this.userList[0].LastName;
        user.Age = this.userList[0].Age;
        user.Gender = this.userList[0].Gender;
        user.Mobile = this.userList[0].Mobile;
        user.Email = this.userList[0].Email;
        user.CustomerId = this.userList[0].CustomerId;
        this.loginService.setUserist(user).subscribe(data=>{})
        this.store.select<Users[]>(selectUsers).subscribe(
          users => {
            this.users = users.filter(x=>x.Mobile == user.Mobile)
            if(this.users.length == 0)
              this.store.dispatch(loginUser(user))
          }
      );
      // .take(1)
      // .subscribe(currentValue => {
      //   if (currentValue % 2 !== 0) {
      //     this.store.dispatch(loginUser(user);
      //   }
      // });
        
        //this.store.dispatch(loginUser(user));
        this.router.navigate(['/home']);
      }
    })
    
  }
}
