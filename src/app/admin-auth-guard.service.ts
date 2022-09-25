import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/map';
import * as firebase from 'firebase/';
//import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(map( (appUser: AppUser) => appUser.isAdmin));
  }
}
