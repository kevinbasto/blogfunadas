import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginDto } from '../../core/interfaces/auth/login.interface';
import { SystemMessage } from '../../core/interfaces/system-message';
import { Login } from '../../core/services/auth/login';

@Injectable()
export class LoginService implements Login{

  constructor(
    private angularFireAuth : AngularFireAuth
  ) { }

    emailLogin( loginData : LoginDto ) : Promise<any>{
      return new Promise<any>((resolve, reject) => {
        this.angularFireAuth.signInWithEmailAndPassword(loginData.email, loginData.password)
        .then(res => resolve(this.getEmailLoginSuccessMessage()))
        .catch(error => reject(this.getEmailLoginErrorMessage()))
      })
    }

    getEmailLoginSuccessMessage() : SystemMessage {
      return {
        name : "success",
        message : "tu sesión se ha iniciado correctamente, te redirijiremos en breve"
      }
    }

    getEmailLoginErrorMessage() : SystemMessage {
      return {
        name : "error",
        message : "hubo un problema al iniciar sesión, o tus credenciales no son correctas"
      }
    }
}
