import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieS implements OnInit {
  
  cookie_options = [
    { 'expires':  Date.now()+ 60*60*24*30},
    { 'path': '/' },
    { 'domain': 'http://localhost:4200/' }, 
    { 'secure': true },
    { 'SameSite': 'None' },
  ]
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.setCookie();
  }

  public setCookie() {
    const cookieExists:boolean = this.cookieService.check('Ahd');
    if(cookieExists){
      console.log('Find the cookie');
    } else {
      console.log('The cookie has not set');
    }
    this.cookieService.set('firstname', 'Ahd', {expires:2, sameSite: 'Lax'});
  }
}
