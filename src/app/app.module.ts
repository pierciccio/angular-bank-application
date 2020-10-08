import { MomentModule } from 'angular2-moment';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserEditComponent } from './components/auth/user-edit/user-edit.component';
import { DepositComponent } from './components/cards/deposit/deposit.component';
import { IndexComponent } from './components/cards/index/index.component';
import { NewComponent } from './components/cards/new/new.component';
import { ShowComponent } from './components/cards/show/show.component';
import { TransactComponent } from './components/cards/transact/transact.component';
import { WithdrawComponent } from './components/cards/withdraw/withdraw.component';
import { BalanceDepositComponent } from './components/balance/balance-deposit/balance-deposit.component';
import { BalanceWithdrawComponent } from './components/balance/balance-withdraw/balance-withdraw.component';
import { BalanceTransactComponent } from './components/balance/balance-transact/balance-transact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    NavbarComponent,
    UserEditComponent,
    DepositComponent,
    IndexComponent,
    NewComponent,
    ShowComponent,
    TransactComponent,
    WithdrawComponent,
    BalanceDepositComponent,
    BalanceWithdrawComponent,
    BalanceTransactComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    AppRoutingModule
  ],
  providers: [
    UserGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
