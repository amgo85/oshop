import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{

  constructor(protected auth: AuthService) { 
    const displayName = auth.user$.displayName;
  }

  logout(){
    this.auth.logout();
  }

}
