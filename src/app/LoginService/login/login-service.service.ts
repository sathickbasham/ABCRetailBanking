import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Users} from '../../models/users.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Branch } from 'src/app/models/branch';
import { Account } from 'src/app/models/account';
import { tap, catchError, map} from 'rxjs/operators';
import { User } from 'src/app/login/login.component';
import { FundTransfer } from 'src/app/models/fund-transfer';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService  {
  apiurl = 'api/users';                 // Our created Data can be accessed here at api/users
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };
  accountDetails:Account[] =[];
  transactionDetails:FundTransfer[]=[];
  usersList:Users[]=[];  
  isLoggedIn:boolean=false;
  branches:Branch[]=[
    {BranchId:"1", BranchName:"Anna Nagar"},
    {BranchId:"2", BranchName:"T Nagar"},
    {BranchId:"3", BranchName:"Mount Road"},
    {BranchId:"4", BranchName:"Kodambakkam"},
    {BranchId:"5", BranchName:"Nungambakkam"},]
  
  constructor(private httpClient:HttpClient) { }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }


  login():Observable<Users[]>{
    this.isLoggedIn = true;
    
    this.apiurl="api/users";
    //return this.httpClient.get<Users[]>('./assets/data/users.json');
    return this.httpClient.get<Users[]>(this.apiurl).pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  setUserist(data:Users):Observable<any>{
    this.usersList=[];
    this.usersList.push(data);
    return of(1);
  }
  getUsers():Observable<Users[]>{
    return of(this.usersList);
  }
  getBranches():Observable<Branch[]>{
    this.apiurl="api/branches";
    return this.httpClient.get<Branch[]>(this.apiurl).pipe(tap(data => console.log(data)),
      catchError(this.handleError)
    );
    //return of(this.branches);
  }

  fundTransfer(data:any):Observable<any>{
    const objFund = new FundTransfer();
    const transBalance = this.transactionDetails.filter(x=>x.AccountNo==data.FromAccount);
    let sum = 0;
    if(transBalance.length > 0)
    {
      sum = transBalance[transBalance.length-1].Balance;
    //  sum = transBalance.map(x=>x.Balance).reduce(function(a,b)
    // {
    //   return a+b;
    // })
  }
    objFund.FromAccount = data.FromAccount;
    objFund.ToAccount = data.ToAccount;
    objFund.AccountNo = data.FromAccount;
    objFund.TransactionAmount = data.TransactionAmount;
    let initialAmount = this.accountDetails.filter(x=>x.AccountNo==data.FromAccount)[0].InitialBalance
    if(sum==0)
      objFund.Balance = +initialAmount + +(sum - data.TransactionAmount) ;
    else
      objFund.Balance = sum - data.TransactionAmount ;
    objFund.TransactionDate = data.TransactionDate;
    objFund.TransactionId = this.transactionDetails.length + 1;
    objFund.TransactionTime = data.TransactionTime;
    objFund.TransactionRemarks = data.TransactionRemarks;
    objFund.TransactionStatus = "DB";
    objFund.CustomerId = this.accountDetails.filter(x=>x.AccountNo==data.FromAccount)[0].CustomerId;
    objFund.TransactionType = data.TransactionType;
    this.transactionDetails.push(objFund);
    const objToFund = new FundTransfer();
    const transBalanceTo = this.transactionDetails.filter(x=>x.AccountNo==data.ToAccount);
    let sumToAccount = 0;
    if(transBalanceTo.length > 0)
    {
      sumToAccount = transBalanceTo[transBalanceTo.length-1].Balance;
      // sumToAccount = transBalanceTo.map(x=>x.Balance).reduce(function(a,b)
      // {
      //   return a+b;
      // })
    }
    objToFund.AccountNo = data.ToAccount;
    objToFund.FromAccount = data.ToAccount;
    objToFund.ToAccount = data.FromAccount;
    objToFund.TransactionAmount = data.TransactionAmount;
    let initialAmountTo = this.accountDetails.filter(x=>x.AccountNo==data.ToAccount)[0].InitialBalance
    if(sumToAccount == 0)
      objToFund.Balance = +initialAmountTo + +(+data.TransactionAmount + +sumToAccount);
    else
      objToFund.Balance = +data.TransactionAmount + +sumToAccount
    objToFund.TransactionDate = data.TransactionDate;
    objToFund.TransactionId = this.transactionDetails.length + 1;
    objToFund.TransactionTime = data.TransactionTime;
    objToFund.TransactionRemarks = data.TransactionRemarks;
    objToFund.TransactionStatus = "CR";
    objToFund.CustomerId = this.accountDetails.filter(x=>x.AccountNo==data.ToAccount)[0].CustomerId;
    objToFund.TransactionType = data.TransactionType;
    this.transactionDetails.push(objToFund);
    return of("success");
  }

  getSummary(customerId:string):Observable<any[]>{
    if(customerId!='')
      return of (this.transactionDetails.filter(x=>x.CustomerId == customerId));
    else
      return of (this.transactionDetails);
  }

  modifyAccount(data:any):Observable<any>{
    const account = new Account();
    account.AccountNo = data.AccountNo;
    account.CustomerId = data.CustomerId;
    account.AccountType = data.AccountType;
    account.Branch = data.Branch;
    account.PrimaryOwner = data.PrimaryOwner;
    account.InitialBalance = data.InitialBalance;
    let index = this.accountDetails.findIndex(x=>x.AccountNo==data.AccountNo);
    this.accountDetails[index] = account;
    return of("success");
  }

  addAccount(data:any):Observable<any>{
    const accountInfo = new Account();
    accountInfo.CustomerId = data.CustomerId;
    accountInfo.AccountNo = data.AccountNo;
    accountInfo.AccountType = data.AccountType;
    accountInfo.Branch = data.Branch;
    accountInfo.PrimaryOwner = data.PrimaryOwner;
    accountInfo.InitialBalance = data.InitialBalance;
    this.accountDetails.push(accountInfo);
    return of("success");
  }
  getAccount():Observable<any>{
    return of(this.accountDetails);
  }
}
