import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { DataService } from '../Services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private jwtHelper: JwtHelperService, private data:DataService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let a = this.data.GETACCOUNT_VAL()
    console.log("canactivate", a)
    if(a){
      const token = a.token;
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
    }
    this.router.navigate(["login"]);
    this.data.setStorage({},)
    return false;
  }
  
}
