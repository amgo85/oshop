import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements AfterViewInit {
  appUser!: AppUser;
  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }
  ngAfterViewInit(): void {
    console.log('username inside ngAfterViewInit is: ' + this.auth.user$.displayName);
  }

  logout(){
    this.auth.logout();
  }

}
