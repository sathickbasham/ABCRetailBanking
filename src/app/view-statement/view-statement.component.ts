import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../LoginService/login/login-service.service';
import { FundTransfer } from '../models/fund-transfer';
import { Users } from '../models/users.model';
import {Account} from '../models/account';

@Component({
  selector: 'app-view-statement',
  templateUrl: './view-statement.component.html',
  styleUrls: ['./view-statement.component.css']
})
export class ViewStatementComponent implements OnInit {
  fromDate:any;
  toDate:any;
  isNoRecords:boolean=false;
  user:Users=new Users();
  angForm:FormGroup;
  isShowTable:boolean=false;
  accountInfo:Account[]=[];
  AccountNoBind:string="";
  outTransactionDet:FundTransfer[]=[];
  constructor(private loginService:LoginServiceService,private fb:FormBuilder) { 
    this.angForm=this.fb.group({
      AccountNo:['', Validators.required],
      FromDate:['', Validators.required],
      ToDate:['', Validators.required]
    })
    this.loginService.getUsers().subscribe((Users)=>{
      this.user = Users[0];
    })
    this.loginService.getAccount().subscribe((Account:any[])=>{
      this.accountInfo = Account.filter(x=>x.CustomerId == this.user.CustomerId);
    })
  }

  ngOnInit(): void {
  }
  ViewStatementFunc(fromDate:any, toDate:any, accountNo:any){
    this.isShowTable=true;
    this.fromDate=new Date(fromDate.valueAsDate);
    this.toDate = new Date(toDate.valueAsDate)
    this.loginService.getSummary(this.user.CustomerId).subscribe((TransactionDetais:any[])=>{
      this.outTransactionDet = TransactionDetais.filter(x=>x.AccountNo== accountNo.value); 
      this.outTransactionDet = this.outTransactionDet.reverse(); 
      if(TransactionDetais.length==0)
        this.isNoRecords = true;
  })
  }
}
