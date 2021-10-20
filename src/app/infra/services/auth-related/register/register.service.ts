import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseException } from '../../../../core/exceptions/database.exception';
import { RegisterDto } from '../../../../core/interfaces/auth/register.interface';
import { SystemMessage } from '../../../../core/interfaces/system-message';
import { User } from '../../../../core/interfaces/user.interface';
import { UsersRepo } from '../../../../core/repos/users.repo';
import { Register } from '../../../../core/services/auth/register';
import { USERS_REPO } from '../../../repos/tokens';

@Injectable()
export class RegisterService implements Register{

  constructor(
    private afauth : AngularFireAuth,
    @Inject(USERS_REPO) private usersRepo : UsersRepo
  ) { }
  
  async emailRegister(register : RegisterDto) : Promise<any> {
    let uid : string;
    await this.afauth.createUserWithEmailAndPassword(register.email, register.password)
    .then( (credential) => uid = credential.user.uid)
    .catch(error => {throw error});
    await this.createProfileInDatabase(register, uid)
    .catch(error => { throw error });
    return this.successMessage;
  }

  async createProfileInDatabase(register : RegisterDto, uid : string){
    let user : User = {
      username : register.username,
      email : register.email,
      role: "reader"
    }
    this.usersRepo.createUser(uid, user)
    .catch(error => { throw new DatabaseException(error) });
  }

  get successMessage() : SystemMessage{
    return {
      name : "Cuenta creada",
      message: "¡Tu cuenta ha sido creada, ahora puedes acceder a la página!"
    }
  }
}
