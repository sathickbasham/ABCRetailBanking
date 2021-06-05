import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { Branch } from 'src/app/models/branch';
import {Users} from '../../models/users.model';

@Injectable({
    providedIn: 'root'
  })
export class UserData implements InMemoryDbService {
  createDb(){
    const users: Users[]=[
      { username: "sathick", password: 'password', role: 'user', FirstName: 'Sathick', LastName:'', Age:36, Gender:'Male', Mobile:9677401017, Email:'sat@gmail.com', CustomerId:'1'  },
      { username: "admin", password: 'password', role: 'admin', FirstName: 'Domnic', LastName:'Xavier', Age:36, Gender:'Male', Mobile:9988998989, Email:'dom@gmail.com', CustomerId:'2'  },
      { username: "basha", password: 'password', role: 'user', FirstName: 'Basha', LastName:'', Age:36, Gender:'Male', Mobile:9999999999, Email:'basha@gmail.com', CustomerId:'3'  }

    ];
    const branches: Branch[]=[
        {BranchId:"1", BranchName:"Anna Nagar"},
      {BranchId:"2", BranchName:"T Nagar"},
      {BranchId:"3", BranchName:"Mount Road"},
      {BranchId:"4", BranchName:"Kodambakkam"},
      {BranchId:"5", BranchName:"Nungambakkam"}
  
      ];
    return {users, branches}
  }
}