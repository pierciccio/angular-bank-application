import { Observable } from 'rxjs';
import { User } from './../models/user';
import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = GLOBAL.url;
  public identity;
  public token;
  public stats;

  constructor(
    public http: HttpClient
  ) { }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this.http
    .post(this.url + 'register', params, {headers});
  }

  login(user: any): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this.http
    .post(this.url + 'login', params, {headers});
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity !== 'undefined') {
      this.identity = identity; 
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getStats() {
    let stats = JSON.parse(localStorage.getItem('stats'));

    if(stats !== 'undefined') {
      this.stats = stats;
    } else {
      this.stats = null;
    }
    return this.stats;
  }

  getUser(id): Observable<any> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.getToken());

    return this.http
    .get(this.url + 'user/' + id, {headers});
  }

  updateUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.getToken());

    return this.http
    .put(this.url + 'update-user/' + user._id, params, {headers});
  }

  depositMoney(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.getToken());

    return this.http
    .post(this.url + 'deposit/' + user._id, params, {headers});
  }

  withdrawMoney(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.getToken());

    return this.http
    .post(this.url + 'withdraw/' + user._id, params, {headers});
  }
  
  transactMOney(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.getToken());

    return this.http
    .post(this.url + 'transact/' + user._id, params, {headers});
  }

}
