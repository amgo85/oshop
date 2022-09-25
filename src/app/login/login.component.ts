import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  constructor(private auth: AuthService) { }

  ngAfterViewInit(): void {
    console.log('username is: ' + this.auth.user$.displayName);
  }

  login(){
    this.auth.login();
  }

}
