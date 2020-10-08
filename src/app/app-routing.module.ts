import { BalanceTransactComponent } from './components/balance/balance-transact/balance-transact.component';
import { BalanceWithdrawComponent } from './components/balance/balance-withdraw/balance-withdraw.component';
import { BalanceDepositComponent } from './components/balance/balance-deposit/balance-deposit.component';
import { WithdrawComponent } from './components/cards/withdraw/withdraw.component';
import { TransactComponent } from './components/cards/transact/transact.component';
import { DepositComponent } from './components/cards/deposit/deposit.component';
import { ShowComponent } from './components/cards/show/show.component';
import { NewComponent } from './components/cards/new/new.component';
import { IndexComponent } from './components/cards/index/index.component';
import { UserEditComponent } from './components/auth/user-edit/user-edit.component';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [UserGuard]},
  {path: 'balance-deposit', component: BalanceDepositComponent, canActivate: [UserGuard]},
  {path: 'balance-withdraw', component: BalanceWithdrawComponent, canActivate: [UserGuard]},
  {path: 'balance-transact', component: BalanceTransactComponent, canActivate: [UserGuard]},
  {path: 'user-edit', component: UserEditComponent, canActivate: [UserGuard]},
  {path: 'new-card', component: NewComponent, canActivate: [UserGuard]},
  {path: 'cards', component: IndexComponent, canActivate: [UserGuard]},
  {path: 'show-card/:id', component: ShowComponent, canActivate: [UserGuard]},
  {path: 'card-deposit/:id', component: DepositComponent, canActivate: [UserGuard]},
  {path: 'card-transact/:id', component: TransactComponent, canActivate: [UserGuard]},
  {path: 'card-withdraw/:id', component: WithdrawComponent, canActivate: [UserGuard]},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
