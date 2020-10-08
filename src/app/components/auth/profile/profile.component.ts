import { CardService } from './../../../services/card.service';
import { Card } from './../../../models/card';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  public user: User;
  public status;
  public identity;
  public token;
  public url;

  constructor(
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.getUser(id);
    });
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        if (response.user) {          
          this.user = response.user;
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.router.navigate(['/profile', this.identity._id]);
      }
    );
  }


}
