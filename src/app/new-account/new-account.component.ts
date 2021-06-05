import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoginServiceService } from '../LoginService/login/login-service.service';
import { Branch } from '../models/branch';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  displayedColumns: string[] = ['CustomerId', 'FirstName'];
  closeResult: string="";
  angForm:FormGroup;
  Title:string="";
  FirstName:string="";
  LastName:string="";
  Email:string="";
  Age:number=0;
  CustomerId:string="";
  Mobile:string="";
  Gender:string="";
  InitialBalance:number=0;
  Branch:string="";
  emailPattern:string="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobilePattern:string ="^[0-9]*$";
  Branches:any[]=[];
  AccountType:string="";
  userList:any[]=[];
  selectedCustomer:string="";
  CustomerIdBind:string="";
  FirstNameBind:string="";
  LastNameBind:string="";
  EmailBind:string="";
  AgeBind:number=0;  
  MobileBind:string="";
  GenderBind:string="";
  InitialBalanceBind:number=0;
  BranchBind:string="";
  AccountNo:string="";
  isSuccess:boolean=false;
  PrimaryOwnerBind:string="";
  AccountTypeBind:string="--Select--";
  AccountNoBind:string = "";
  InitialBalBind:number =0;
  constructor(private fb:FormBuilder, private modalService:NgbModal, private loginService:LoginServiceService) { 
    this.angForm=this.fb.group({
      CustomerId:['',Validators.required],
      FirstName:['', Validators.required],
      LastName:['', Validators.required],
      Email:['', [Validators.required, Validators.pattern(this.emailPattern)]],
      Mobile:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Gender:['', [Validators.required]],
      InitialBalance:['', [Validators.required, Validators.pattern(this.mobilePattern)]],
      AccountType:['',Validators.required],
      AccountNo:['', Validators.required]
    },
    );
    this.loginService.getBranches().subscribe((ret:any[])=>{
      this.Branches = ret;
    })
  }

  ngOnInit(): void {    
    
  }
  SubmitForm(registerForm:NgForm) {
    const account = new Account();
    account.CustomerId= registerForm.value.CustomerId,
    account.AccountNo=registerForm.value.AccountNo,
    account.Branch=registerForm.value.Branch,
    account.InitialBalance=registerForm.value.InitialBalance,
    account.PrimaryOwner=registerForm.value.PrimaryOwner,
    account.AccountType=registerForm.value.AccountType
    this.loginService.addAccount(account).subscribe((ret:any)=>{
      if(ret == "success"){
        this.isSuccess = true;
        this.CustomerIdBind = "";
        this.FirstNameBind = "";
        this.LastNameBind = "";
        this.GenderBind = "";
        this.EmailBind = "";
        this.MobileBind = "";
        this.PrimaryOwnerBind = "";
        this.AccountTypeBind="--Select--";
        this.AccountNoBind = "";
        this.BranchBind = "--Select--";
        this.InitialBalBind=0;
      }
       
    })

}

open(content:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result:any) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason:any) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

SearchUser(mobile:string){
  
  this.loginService.login().subscribe((User)=>
    { 
      this.userList = User.filter(x=>x.Mobile ===  Number(mobile));     
    })
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
onItemChange(item:any){
  this.selectedCustomer = item;
}
Select(){
  if(this.userList.length > 0)
  {
    this.CustomerIdBind = this.userList[0].CustomerId;
    this.FirstNameBind = this.userList[0].FirstName;
    this.LastNameBind = this.userList[0].LastName;
    this.AgeBind=this.userList[0].Age;
    this.GenderBind = this.userList[0].Gender;
    this.EmailBind = this.userList[0].Email;
    this.MobileBind = this.userList[0].Mobile;
  }  
  this.modalService.dismissAll();
}
}
