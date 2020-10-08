import { CardService } from './../../../services/card.service';
import { UserService } from './../../../services/user.service';
import { GLOBAL } from './../../../services/global';
import { Card } from './../../../models/card';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  public card: Card;
  public status: string;
  public token;
  public url;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _cardService: CardService
  ) {
    this.token = this._userService.getToken();  
    this.url = GLOBAL.url;  
   }

  ngOnInit(): void { 
    this.loadPage();
  }

  loadPage() {
    this.route.params.subscribe(params => {
      let id = params['id'];

      this.getCard(id);
      this.withdrawMoney();
    });
  }

  getCard(id) {
    this._cardService.getCard(this.token, id).subscribe(
      response => {
        if (response.card) {
          this.card = response.card;         
          this.status = 'success';
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }

  withdrawMoney() {
    this._cardService.withdrawMoney(this.token, this.card).subscribe(
      response => {
        if (!response.card) {
          this.status = 'error'
        }
        else {
          this.status = 'success';
          this.card = response.card;
          this.router.navigate(['show-card', this.card._id]);
        }
      },
      error => {
        this.status = 'error';
        {console.log(<any>error)}
      }
    );
  }

}
