import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SystemMessage } from '../../../../core/interfaces/system-message';
import { Recover } from '../../../../core/services/auth/recover';

@Injectable()
export class RecoverService implements Recover{

  constructor(
    private afAuth : AngularFireAuth
  ) { }

  recoverEmailAccount( email : string ) : Promise<SystemMessage>{
    return new Promise<SystemMessage>((resolve, reject) => {
      this.afAuth.sendPasswordResetEmail(email)
      .then(res => {
        console.log(res);
        resolve(this.successMessage);
      })
      .catch(err => {
        console.log(err);
        reject(this.errorMessage);
      });
    })
    console.log("a");
  }

  private get successMessage() : SystemMessage {
    return {
      name: "¡Correo enviado!",
      message: "el correo electrónico ha sido envíado de forma correcta"
    }
  }

  private get errorMessage() : SystemMessage{
    return {
      name : "¡petición negada!",
      message : "el correo no fue envíado debido a una serie de problemas"
    }
  }
}
