import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/';
import * as firebaseAlias from 'firebase/';
//import { GoogleAuthProvider } from 'firebase/auth'
//import { AngularFireAuth } from '@angular/fire/compat/auth';  // https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
//import * as firebase from 'firebase';
//import firebase from 'firebase/compat/app';   // https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
import { Observable, switchMap } from 'rxjs';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable <firebaseAlias.User> | any;
  private userId;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    //this.user$ = afAuth.authState;
    this.user$ = afAuth.user;   // from https://forum.codewithmosh.com/t/firebase-user-issue/12042/2
    const user = firebase.auth().currentUser;
    this.userId = user?.uid;
  }

   login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebaseAlias.auth.GoogleAuthProvider());
    //this.afAuth.auth.signInWithPopup(new firebaseAlias.auth.GoogleAuthProvider());
    //console.log('username is: ' + this.afAuth.auth.currentUser?.displayName);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap( (user: firebase.User) => {
        if(user) return this.userService.get(user.uid).valueChanges();
        
        return of({});
      }));
    
  }
  

}
