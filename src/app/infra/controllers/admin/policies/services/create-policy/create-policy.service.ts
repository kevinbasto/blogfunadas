import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Policies } from '../../../../../../core/interfaces/terms.interface';

@Injectable({
  providedIn: 'root'
})
export class CreatePolicyService {

  constructor(
    private firestore : AngularFirestore,
    private router : Router
  ) { }

  async savePolicies(policies : Policies) {
    try {
      let id : string = await this.savePoliciesAndFetchId(policies);
      let numberId : number = await this.updateMetaAndFetchId()
      await this.updateTerms(id, numberId);
      this.router.navigate([`${this.router.url.split("/new")[0]}`])
    } catch (error) {
      console.log(error);
    }
  }

  private savePoliciesAndFetchId(policies : Policies) : Promise<string>{
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection("terms").add(policies)
      .then(res => resolve(res.id))
      .catch(error => reject(error));
    })
  }

  private updateMetaAndFetchId(){
    return new Promise<number>(async(resolve, reject) => {
      try {
        let id : number;
        await this.firestore.collection("terms").doc("meta").valueChanges().pipe(take(1)).toPromise()
        .then((meta : any) => id = meta? meta.size + 1 : 1);
        await this.firestore.doc(`terms/meta`).set({size : id});
        resolve(id);
      } catch (error) {
        reject(error);
      }
    })
  }

  private async updateTerms(termsId : string, numberId : number){
    await this.firestore.collection("terms").doc(termsId).update({ id : numberId });
  }
}
