import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { Branch } from 'src/app/models/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService implements InMemoryDbService {
  createDb(){
    const branches: Branch[]=[
      {BranchId:"1", BranchName:"Anna Nagar"},
    {BranchId:"2", BranchName:"T Nagar"},
    {BranchId:"3", BranchName:"Mount Road"},
    {BranchId:"4", BranchName:"Kodambakkam"},
    {BranchId:"5", BranchName:"Nungambakkam"}

    ];
    return {branches};
  }
  constructor() { }
}
