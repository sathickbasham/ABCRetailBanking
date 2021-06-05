import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginServiceService } from '../LoginService/login/login-service.service';
import { Account } from '../models/account';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
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
  AccountList:any[]=[];
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
  constructor(private fb:FormBuilder, private modalService:NgbModal, private loginService:LoginServiceService) 
  { 
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
    this.loginService.modifyAccount(account).subscribe((ret:any)=>{
      if(ret == "success"){
        this.isSuccess = true;
        this.CustomerIdBind = "";
        
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
SearchAccount(accountNo:string){
  this.loginService.getAccount().subscribe((ret:any[])=>{
    this.AccountList = ret.filter(x=>x.AccountNo==accountNo);
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
  if(this.AccountList.length > 0)
  {
    this.CustomerIdBind = this.AccountList[0].CustomerId;
    this.AccountNoBind = this.AccountList[0].AccountNo;
    this.PrimaryOwnerBind = this.AccountList[0].PrimaryOwner;
    this.BranchBind=this.AccountList[0].Branch;
    this.AccountTypeBind = this.AccountList[0].AccountType;
    this.InitialBalBind = this.AccountList[0].InitialBalance;
  }  
  this.modalService.dismissAll();
}
}
