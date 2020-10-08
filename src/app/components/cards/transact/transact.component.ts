import { GLOBAL } from './../../../services/global';
import { UserService } from './../../../services/user.service';
import { CardService } from './../../../services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from './../../../models/card';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css']
})
export class TransactComponent implements OnInit {
  
  public card: Card;
  public cards: any;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public token;
  public url;
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
      this.getCards(this.page);
      this.transactMoney();      
    });
  }

  getCard(id) {
    this._cardService.getCard(this.token, id).subscribe(
      response => {
        if (response.card) {
          this.card = response.card;
          //console.log(this.card);         
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

  getCards(page, adding=false) {
    this._cardService.getCards(this.token, page).subscribe(
      response => {
        if (response.cards) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;

          if (adding === false) {
            this.cards = response.cards;
          } else {
            const arrayA = this.cards;
            const arrayB = response.cards;
            this.cards = arrayA.concat(arrayB);
          }
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

  transactMoney() {
    this._cardService.transactMoney(this.token, this.card).subscribe(
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
