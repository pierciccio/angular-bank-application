import { UserService } from './../../../services/user.service';
import { GLOBAL } from './../../../services/global';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-balance-deposit',
  templateUrl: './balance-deposit.component.html',
  styleUrls: ['./balance-deposit.component.css']
})
export class BalanceDepositComponent implements OnInit {

  public user: User;
  public status: string;
  public identity;
  public token;
  public url = GLOBAL.url;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService
  ) { 
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }

  depositMoney() {
    this._userService.depositMoney(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
          this.router.navigate(['/profile/', this.user._id]);
        }
      },
      error => {
        this.status = 'error';
        {console.log(<any>error)}
      }
    );
  }

}
