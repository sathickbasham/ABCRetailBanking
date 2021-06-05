import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../LoginService/login/login-service.service';
import { FundTransfer } from '../models/fund-transfer';
import { Summary } from '../models/summary';
import { Users } from '../models/users.model';
import {Account} from '../models/account'

@Component({
  selector: 'app-view-summary',
  templateUrl: './view-summary.component.html',
  styleUrls: ['./view-summary.component.css']
})

export class ViewSummaryComponent implements OnInit {
  user:Users=new Users();
  transactionDetails:FundTransfer[]=[];
  accountInfo:Account[]=[];
  summary:Summary[]=[];
  outTransactionDet:FundTransfer[]=[];
  isShowTable:boolean=false;
  isNoRecords:boolean=false;
  constructor(private loginService:LoginServiceService) { 
    this.loginService.getUsers().subscribe((Users)=>{
      this.user = Users[0];
    })
    this.loginService.getAccount().subscribe((Account:any[])=>{
      this.accountInfo = Account.filter(x=>x.CustomerId == this.user.CustomerId);
    })
    this.loginService.getSummary(this.user.CustomerId).subscribe((TransactionDetais:any[])=>{
      for(let account of this.accountInfo){
        this.transactionDetails = TransactionDetais.filter(x=>x.AccountNo== account.AccountNo);  
        const objSummary = new Summary();
        if(this.transactionDetails.length >0)
        {
          objSummary.AccountNo = this.transactionDetails[this.transactionDetails.length-1].AccountNo;
          objSummary.Balance = this.transactionDetails[this.transactionDetails.length-1].Balance;
        }
        else
        {
          objSummary.AccountNo = account.AccountNo;
          objSummary.Balance = account.InitialBalance;
        }
          
        this.summary.push(objSummary);
      }
    })
  }
  Details(accountNo:string){
    this.isShowTable=true;
    this.loginService.getSummary(this.user.CustomerId).subscribe((TransactionDetais:any[])=>{
        this.outTransactionDet = TransactionDetais.filter(x=>x.AccountNo== accountNo); 
        this.outTransactionDet = this.outTransactionDet.reverse(); 
        if(TransactionDetais.length==0)
          this.isNoRecords = true;
    })
    
  }
  ngOnInit(): void {
  }

}
