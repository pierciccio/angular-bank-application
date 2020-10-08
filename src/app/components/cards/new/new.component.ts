import { GLOBAL } from './../../../services/global';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from './../../../services/card.service';
import { UserService } from './../../../services/user.service';
import { Card } from './../../../models/card';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public identity;
  public token;
  public stats;
  public url;
  public status;
  public card: Card;
  @Input()
  pattern: string | RegExp

  constructor(
    private _userService: UserService,
    private _cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.card = new Card('', '', '', null, null, null, 0, this.identity._id);
   }

  ngOnInit(): void {
  }

  saveCard(form) {
    this._cardService.addCard(this.token, this.card).subscribe(
      response => {
        if(response.card) {
          this.status = 'success';
          form.reset();
          this.router.navigate(['/cards']);
          
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
}
