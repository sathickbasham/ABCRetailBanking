import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AuthGuard } from './auth.guard';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { SearchComponent } from './search/search.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { ViewStatementComponent } from './view-statement/view-statement.component';
import { ViewSummaryComponent } from './view-summary/view-summary.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate :[AuthGuard]    
  },
  {
    path:'account-details',
    component:AccountDetailsComponent,
    canActivate :[AuthGuard] 
  },
  {
    path:'logout',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'search',
    component:SearchComponent,
    canActivate :[AuthGuard] 
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  }, 
  {
    path:'viewsummary',
    component:ViewSummaryComponent,
    canActivate:[AuthGuard]
  },
{
  path:'createaccount',
  component:NewAccountComponent,
  canActivate :[AuthGuard]    
},
{
  path:'updateaccount',
  component:UpdateAccountComponent,
  canActivate :[AuthGuard]
},
{
  path:'fundtransfer',
  component:FundTransferComponent,
  canActivate:[AuthGuard]
},
{
  path:'viewstatement',
  component:ViewStatementComponent,
  canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
