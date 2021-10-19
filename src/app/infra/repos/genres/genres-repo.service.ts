import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { DatabaseException } from '../../../core/exceptions/database.exception';
import { Genre } from '../../../core/interfaces/genre.interface';
import { MenuItem } from '../../../core/interfaces/menu-item';
import { SystemMessage } from '../../../core/interfaces/system-message';
import { GenresRepo } from '../../../core/repos/genres.repo';

@Injectable()
export class GenresRepoService implements GenresRepo {

  constructor(
    private angularFirestore : AngularFirestore
  ) { }

  /**
   * it creates a genre and updates the table document 
   * 1. get the latest id, if zero then it will be asigned to 1
   * 1. create the genre and set the meta document
   * 2. updates the genres array
   * 3. if everything is good, it will update the sidebar
   * @param genre 
   * @returns 
   */
  async createGenre(genre : Genre) : Promise<SystemMessage> {
    // genres id
    await this.angularFirestore.collection<Genre>('genres', fn => fn.orderBy('id', 'desc').limit(1))
    .valueChanges().pipe(take(1)).toPromise()
    .then(data => { genre.id = data[0]? data[0].id : 1 });

    // genre creation
    await this.angularFirestore.collection<Genre>('genres').add(genre);

    // meta config
    await this.angularFirestore.collection(genre.name).doc(`meta`).set({ size : 0 });

    // genres update
    let genres : Array<MenuItem>;
    await this.angularFirestore.doc<any>('/info/genres').valueChanges()
    .pipe(take(1)).toPromise()
    .then((genresDoc : any) => {
      genres = genresDoc.genres;
      genres.push({
        name: genre.name,
        url : genre.name
      });
    })

    this.angularFirestore.doc('/info/genres').update({ genres : genres });
    return {
      name : "Género creado",
      message : "el género fue creado con éxito"
    }
  };

  async getGenre(genreId : string) : Promise<Genre> {
    let genre : Genre
    await this.angularFirestore.collection('genres').doc(genreId)
    .valueChanges().pipe(take(1)).toPromise()
    .then( (res : any) => genre = res )
    .catch(error => { throw new DatabaseException(error); });
    return genre;
  }

  async editGenre(genreId : string, genre : Genre) : Promise<boolean> {
    await this.angularFirestore.collection('genres').doc(genreId).update(genre)
    .catch(error => { throw new DatabaseException(error); });
    return true;
  }

  async deleteGenre(genreId : string) : Promise<boolean> {
    await this.angularFirestore.collection('genres').doc(genreId).delete()
    .catch(error => { throw new DatabaseException(error); });
    return true;
  }

  async getGenres() : Promise<Array<Genre>> {
    let genres : Array<Genre>
    await this.angularFirestore.collection('genres').valueChanges()
    .pipe(take(1)).toPromise()
    .then( (res : any) => genres  = res)
    .catch(error => { throw new DatabaseException(error); });
    return genres
  }
}
