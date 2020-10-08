import { Card } from './../../../models/card';
import { GLOBAL } from './../../../services/global';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from './../../../services/card.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  providers: [UserService, CardService]
})
export class ShowComponent implements OnInit {

  public card: Card;
  public identity;
  public token;
  public url;
  public status;
 
  constructor(
    private _userService: UserService,
    private _cardService: CardService,
    private router: Router,
    private route: ActivatedRoute 
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
      let id = params['id'];

      this.getCard(id);
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
        this.router.navigate(['/card', id]);
      }
    );
  }

  deleteCard(id) {
    this._cardService.deleteCard(this.token, id).subscribe(
      response => {
        this.card = response.card;
        this.status = 'success';
        this.router.navigate(['/cards']);
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }

  

}
