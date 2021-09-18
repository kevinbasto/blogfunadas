import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { User } from '../../../core/interfaces/user.interface';
import { UsersRepo } from '../../../core/repos/users.repo';
import { take } from 'rxjs/operators';
import { DatabaseException } from '../../../core/exceptions/database.exception';

@Injectable()
export class UsersRepoService implements UsersRepo{

  constructor(
    private angularFireStore : AngularFirestore
  ) { }

  async createUser( user : User ) : Promise<string>{
    let id : string;
    await this.angularFireStore.collection('users').add(user)
    .then( (res : DocumentReference) => { id = res.id })
    .catch(error => { throw new DatabaseException(error); });
    return id;
  }
  
  async getUser( userId : string ) : Promise<User>{
    let user : any
    await this.angularFireStore.collection('users').doc(userId)
    .valueChanges().pipe(take(1)).toPromise()
    .then( (res : any ) => { user = res; } )
    .catch(error => { throw new DatabaseException(error); });
    return user;
  }

  async updateUser(userId : string, user : User) : Promise<boolean>{
    await this.angularFireStore.collection('users')
    .doc(userId).update(user)
    .catch(error => { throw new DatabaseException(error); });
    return true;
  }

  async deleteUser( userId : string ) : Promise<boolean>{
    await this.angularFireStore.collection('users')
    .doc(userId).delete()
    .catch(error => { throw new DatabaseException(error); });
    return true;
  }
  
  async getUsers( page : number, pageSize : number) : Promise<Array<User>>{
    let users : Array<any>;
    await this.angularFireStore.collection("users", ref => ref.startAt( ((page - 1) * pageSize) + 1).limit(page * pageSize))
    .valueChanges()
    .pipe(take(1))
    .toPromise()
    .then( res => users = res )
    .catch(error => { throw new DatabaseException(error); });
    return users;
  }
  
}
