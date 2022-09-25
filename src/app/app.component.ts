import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { CookieS } from './cookie.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  $subscription!: Subscription;

  constructor(private userService: UserService, private auth: AuthService, private router: Router, private cookieS: CookieS){
    this.$subscription = auth.user$.subscribe((user: any) => {
      if(user) {
        userService.save(user);
        //cookieS.setCookie();
        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl == null)
          router.navigateByUrl('/')
        else 
          router.navigateByUrl(returnUrl);
      } else {
        router.navigateByUrl('/login')
      }
    })
  }


  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }
}
