import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { DatabaseException } from '../../core/exceptions/database.exception';
import { Genre } from '../../core/interfaces/genre.interface';
import { GenresRepo } from '../../core/repos/genres.repo';

@Injectable()
export class GenresRepoService implements GenresRepo {

  constructor(
    private angularFirestore : AngularFirestore
  ) { }

  async createGenre(genre : Genre) : Promise<string> {
    let id : string;
    await this.angularFirestore
    .collection('genres')
    .add(genre)
    .then( (res : DocumentReference) => id = res.id)
    .catch(error => { throw new DatabaseException(error);  });
    return id;
  };

  async getGenre(genreId : string) : Promise<Genre> {
    let genre : Genre
    await this.angularFirestore.collection('genres').doc(genreId)
    .valueChanges()
    .pipe(take(1))
    .toPromise()
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
