import { Component, OnInit } from '@angular/core';
import { reducer } from '../store/reducer/user.reducer';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
