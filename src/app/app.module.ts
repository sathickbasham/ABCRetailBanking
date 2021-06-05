import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {AppMaterialModule} from '../app/app-material/app-material.module';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { LogoutComponent } from './logout/logout.component';
import { ViewSummaryComponent } from './view-summary/view-summary.component';
import { SearchComponent } from './search/search.component';
import { AccountTransactionComponent } from './account-transaction/account-transaction.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { LoginComponent } from './login/login.component';
import { LeftNavigationComponent } from './navigation/left-navigation/left-navigation.component';
import { HeaderComponent } from './navigation/header/header.component';
import { reducer, userFeatureKey } from './store/reducer/user.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {UserData} from './LoginService/login/user-data.service';
import { BranchService } from './LoginService/login/branch.service';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { ViewStatementComponent } from './view-statement/view-statement.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeftNavigationComponent,
    HeaderComponent,
    HomeComponent,
    AccountDetailsComponent,
    NewAccountComponent,
    UpdateAccountComponent,
    LogoutComponent,
    ViewSummaryComponent,
    SearchComponent,
    AccountTransactionComponent,
    FundTransferComponent,
    ViewStatementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(userFeatureKey, reducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgbModule,
    InMemoryWebApiModule.forRoot(UserData),
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
