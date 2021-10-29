import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Genre } from '../../../../../core/interfaces/genre.interface';

@Injectable({
  providedIn: 'root'
})
export class EditGenreService {

  constructor(
    private firestore : AngularFirestore,
    private router : Router
  ) { }

  getData() : Promise<Genre>{
    return new Promise<Genre>((resolve, reject) => {
      let urlTree = this.router.url.split("/");
      let genre : string = urlTree[urlTree.length - 1];
      this.firestore.doc<Genre>(`/genres/${genre}`)
      .valueChanges().pipe(take(1)).toPromise()
      .then(genre => resolve(genre))
      .catch(error => reject(error));
    });
  }
}
