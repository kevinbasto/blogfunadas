import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { User } from '../../../core/interfaces/user.interface';
import { UsersRepo } from '../../../core/repos/users.repo';
import { take } from 'rxjs/operators';
import { DatabaseException } from '../../../core/exceptions/database.exception';

@Injectable()
export class UsersRepoService implements UsersRepo{

  constructor(
    private firestore : AngularFirestore
  ) { }

  async createUser( uid : string, user : User ) : Promise<any>{
    user.id = await this.fetchUserId() + 1;
    await this.updateMeta(user.id);
    user.url = uid;
    await this.firestore.collection('users').doc(uid).set(user)
    .catch(error => { throw new DatabaseException(error); });
  }

  private fetchUserId(){
    return new Promise<number>((resolve, reject) => {
      this.firestore.doc(`/users/meta`)
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then((res : any) => resolve(res.size))
      .catch(error => reject(error));
    })
  }

  private updateMeta(currentSize : number){
    return new Promise<void>((resolve, reject) => {
      this.firestore.doc(`/users/meta`).set({ size : currentSize})
      .catch(error => reject(error));
      resolve();
    })
  }
  
  async getUser( userId : string ) : Promise<User>{
    let user : any
    await this.firestore.collection('users').doc(userId)
    .valueChanges().pipe(take(1)).toPromise()
    .then( (res : any ) => { user = res; } )
    .catch(error => { throw new DatabaseException(error); });
    return user;
  }

  async updateUser(userId : string, user : User) : Promise<boolean>{
    await this.firestore.collection('users')
    .doc(userId).update(user)
    .catch(error => { throw new DatabaseException(error); });
    return true;
  }

  async deleteUser( userId : string ) : Promise<boolean>{
    await this.firestore.collection('users')
    .doc(userId).delete()
    .catch(error => { throw new DatabaseException(error); });
    return true;
  }
  
  async getUsers( page : number, pageSize : number) : Promise<Array<User>>{
    let users : Array<any>;
    await this.firestore.collection("users", ref => ref.startAt( ((page - 1) * pageSize) + 1).limit(page * pageSize))
    .valueChanges()
    .pipe(take(1))
    .toPromise()
    .then( res => users = res )
    .catch(error => { throw new DatabaseException(error); });
    return users;
  }
  
}
