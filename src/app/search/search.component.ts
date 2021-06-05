import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../LoginService/login/login-service.service';
import { Users } from '../models/users.model';
import {Account} from '../models/account';
import {Branch} from '../models/branch';
import { FundTransfer } from '../models/fund-transfer';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  labelText:string="";
  SearchByBind:string="";
  SearchByTextBind:string="";
  user:Users=new Users();
  accountInfo:Account[]=[];
  outAccountDet:Account[]=[];
  isShowTable:boolean=false;
  finAccountDet:Account[]=[];
  Branches:Branch[]=[];
  tempAccount:FundTransfer[]=[];
  constructor(private loginService:LoginServiceService) { 
    this.loginService.getUsers().subscribe((Users)=>{
      this.user = Users[0];
    })
    this.loginService.getAccount().subscribe((Account:any[])=>{
      this.accountInfo = Account;
    })
    this.loginService.getBranches().subscribe((ret:any[])=>{
      this.Branches = ret;
    })
  }

  ngOnInit(): void {
  }
  BindLabel(searchBy:string){
    switch(searchBy){
      case '1':
        this.labelText="Customer Id";
        break;
      case '2':
        this.labelText="Account No";
        break;
    }
  }
  SearchByFunc(searchByVal:any){
    this.finAccountDet=[];
    this.isShowTable=true;
    
    switch(this.labelText){
      case 'Customer Id':
        this.outAccountDet = this.accountInfo.filter(x=>x.CustomerId==searchByVal.value);
        break;
      case 'Account No':
        this.outAccountDet = this.accountInfo.filter(x=>x.AccountNo==searchByVal.value);
        break;
    }
    for(let obj of this.outAccountDet){
      const objAccount=new Account();
      this.tempAccount=[];
      objAccount.AccountNo=obj.AccountNo;
      if(obj.AccountType=='1')
        objAccount.AccountType = "Saving Bank Account"; 
      else
        objAccount.AccountType = "Current Bank Account"; 
      objAccount.PrimaryOwner = obj.PrimaryOwner;
      objAccount.CustomerId = obj.CustomerId;
      objAccount.Branch = this.Branches.filter(x=>x.BranchId=obj.Branch)[0].BranchName;
      this.loginService.getSummary(obj.CustomerId).subscribe((TransactionDetais:any[])=>{
        if(TransactionDetais.length > 0)
        {
          this.tempAccount = TransactionDetais.filter(x=>x.AccountNo==obj.AccountNo);
          if(this.tempAccount.length>0)
            objAccount.InitialBalance = this.tempAccount[this.tempAccount.length-1].Balance;
          else
            objAccount.InitialBalance = obj.InitialBalance;
        }
        else
          objAccount.InitialBalance = objAccount.InitialBalance;
      })
      this.finAccountDet.push(objAccount);
    }
  }
}
