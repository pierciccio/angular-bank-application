import { Card } from './../../../models/card';
import { GLOBAL } from './../../../services/global';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from './../../../services/card.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import * as $ from "jquery";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public identity;
  public token;
  public url;
  public status;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public noMore = false;
  public cards: any;
  @Input() user: string;

  constructor(
    private _userService: UserService,
    private _cardService: CardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
   }

  ngOnInit(): void {
    this.getCards(this.user, this.page);
  }

  getCards(user, page, adding = false) {
    this._cardService.getCardsUser(this.token, user, page).subscribe(
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
            $("html, body").animate({scrollTop: $('html').prop("scrollHeight")}, 500);
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

  viewMore() {
    this.page = this.page + 1;
    if (this.page === this.pages) {
      this.noMore = true;
    }
    this.getCards(this.user, this.page, true);
  }

  refresh(event) {
    console.log(event)
    this.getCards(this.user, 1);
  }

}
