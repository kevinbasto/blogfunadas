import { Injectable } from '@angular/core';
import { UsersRepo } from '../../core/repos/users.repo';

@Injectable()
export class UsersRepoService implements UsersRepo{

  constructor() { }

  async  createUser() : Promise<any>{}
  
  async  deleteUser() : Promise<any>{}
  
  async  getUser() : Promise<any>{}
  
  async  getUsers() : Promise<any>{}
  
  async  updateUser() : Promise<any>{}
  
}
