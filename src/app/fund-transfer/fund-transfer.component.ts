import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginServiceService } from '../LoginService/login/login-service.service';
import { Account } from '../models/account';
import { FundTransfer } from '../models/fund-transfer';
import { Users } from '../models/users.model';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  user:Users=new Users();
  accountInfo:Account[]=[];
  ToAccountInfo:Account[]=[];
  AccountNoBind:string="";
  isSuccess:boolean=false;
  angForm:FormGroup;
  AccountNo:string="";
  CustomerId:string="";
  CustomerIdBind:string="";
  PrimaryOwnerBind:string="";
  AccountTypeBind:string="";
  BranchBind:string="";
  account:Account=new Account();
  ToAccountNoBind:string="";
  Branches:any[]=[];
  TransferAmountBind:number=0;
  fromAccountNo:string="";
  toAccountNo:string="";
  transferAmount:number=0;
  fundTransfer:FundTransfer=new FundTransfer();
  TransactionTypeBind:string="";
  TransactionRemarksBind:string="";
  
  constructor(private loginService:LoginServiceService, private fb:FormBuilder, private datePipe: DatePipe) { 
    
    this.angForm=this.fb.group({
      AccountNo:['', Validators.required],
      CustomerId:['', Validators.required],
      PrimaryOwner:['', Validators.required],
      AccountType:['', Validators.required],
      Branch:['', Validators.required],
      ToAccountNo:['',Validators.required],
      TransactionRemarks:['',Validators.required]
    })
    this.loginService.getUsers().subscribe((Users)=>{
      this.user = Users[0];
    })
    this.loginService.getAccount().subscribe((Account:any[])=>{
      this.accountInfo = Account.filter(x=>x.CustomerId == this.user.CustomerId);
    })
    this.loginService.getAccount().subscribe((Account:any[])=>{
      this.ToAccountInfo = Account.filter(x=>x.AccountNo != this.accountInfo[0].AccountNo);
    })
    this.loginService.getBranches().subscribe((ret:any[])=>{
      this.Branches = ret;
    })
  }
  FetchAccount(accountNo:string){
    this.account = this.accountInfo.filter(x=>x.AccountNo==accountNo)[0];
    this.CustomerIdBind = this.account.CustomerId;
    this.PrimaryOwnerBind = this.account.PrimaryOwner;
    this.AccountTypeBind = this.account.AccountType;
    this.BranchBind = this.account.Branch;
  }
  ngOnInit(): void {
  }
  FundTransfer(fundTransfer:NgForm){
    const objFundTransfer = new FundTransfer();
    objFundTransfer.TransactionDate =formatDate(new Date(), 'yyyy/MM/dd', 'en')
    objFundTransfer.AccountNo=fundTransfer.value.AccountNo;;
    objFundTransfer.FromAccount = fundTransfer.value.AccountNo;
    objFundTransfer.ToAccount = fundTransfer.value.ToAccountNo;
    objFundTransfer.TransactionAmount = fundTransfer.value.TransferAmount;
    objFundTransfer.TransactionRemarks = fundTransfer.value.TransRemarks;
    objFundTransfer.TransactionType = fundTransfer.value.TransactionType;
    objFundTransfer.TransactionTime = formatDate(new Date(), 'hh:mm', 'en-US');
    this.loginService.fundTransfer(objFundTransfer).subscribe((ret:any)=>
    {
      if(ret=='success'){
        this.isSuccess=true;
        this.AccountNoBind='';
        this.CustomerIdBind='';
        this.PrimaryOwnerBind = '';
        this.AccountTypeBind ='';
        this.BranchBind='';
        this.ToAccountNoBind='';
        this.TransactionRemarksBind ='';
        this.TransferAmountBind=0;
        this.TransactionTypeBind = '';
        this.TransactionRemarksBind=''
      }
    }
    );
  }
}
