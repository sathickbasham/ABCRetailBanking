import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from './LoginService/login/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService:LoginServiceService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url=state.url;
    return this.checkLogin(url);
      return true;
  }
  checkLogin(url: string): boolean {
    if (this.loginService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.router.navigate(['/login']);
    return false;
  }
}

