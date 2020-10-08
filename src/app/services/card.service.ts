import { Card } from './../models/card';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CardService {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   addCard(token, card): Observable<any> {
     let params = JSON.stringify(card);
     let headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', token);

     return this.http
     .post(this.url + 'card', params, {headers});
   }
   
   getCard(token, id): Observable<any> {
     let headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', token);

     return this.http
     .get(this.url +  'card/' + id, {headers});
   }

   getCards(token, page=1): Observable<any> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', token);

    return this.http
    .get(this.url + 'cards' + '/' + page, {headers});
   }

   getCardsUser(token, user_id, page = 1): Observable<any> {
     let headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', token);

     return this.http
     .get(this.url + 'cards-user/' + user_id + '/' + page, {headers});
   }

   deleteCard(token, id): Observable<any> {
     let headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', token);

     return this.http
     .delete(this.url + 'card/'+ id, {headers});
   }
   
   depositMoney(token, card: Card): Observable<any> {
     let params = JSON.stringify(card);
     let headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', token);

     return this.http
     .post(this.url + 'card-deposit/' + card._id,  params, {headers});
   }

   withdrawMoney(token, card: Card): Observable<any> {
     let params = JSON.stringify(card);
     let headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', token);

    return this.http
    .post(this.url + 'card-withdraw/' + card._id, params, {headers});
   }

   transactMoney(token, card: Card): Observable<any> {
     let params = JSON.stringify(card);
     let headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', token);
     
     return this.http
     .post(this.url + 'card-transact/' + card._id, params, {headers});
   }

}
