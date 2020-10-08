import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user : User = new User('', '', '', '', '', '', 'ROLE_USER', '', 0);
  public status: string;
  public identity;
  public token;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this._userService.login(this.user).subscribe(
      response => {
        this.identity = response.user;
        this.token = response.token;

        if (!this.identity || !this.identity._id || this.token.lenght <= 0) {
          this.status = 'error';
        }
        else {
          localStorage.setItem('identity', JSON.stringify(this.identity));
          localStorage.setItem('token', JSON.stringify(this.token));
          this.router.navigate(['/profile/', this.user._id]);
        }
      },
        error => {
          console.log(<any>error);
          this.status = 'error';
      }
    );
  }

}
