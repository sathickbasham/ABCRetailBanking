import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginServiceService } from 'src/app/LoginService/login/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;                  // {1}

  constructor(private authService: LoginServiceService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn; // {2}
  }
}
