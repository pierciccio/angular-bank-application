import { GLOBAL } from './../../../services/global';
import { CardService } from './../../../services/card.service';
import { UserService } from './../../../services/user.service';
import { Card } from './../../../models/card';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  public card: Card;
  public token;
  public url ;
  public status: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _cardService: CardService,
    private _userService: UserService    
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
      this.depositMoney();
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


  depositMoney() {
    
    this._cardService.depositMoney(this.token, this.card).subscribe(
      response => {
         if(!response.card) {
           this.status = 'error';
           
         }
         else {
           this.status = 'success';
           this.card = response.card;
           this.router.navigate(['show-card', this.card._id])
         }
      },
      error => {
        this.status = 'error';
        {console.log(<any>error)}
      }
    );
  }

}
