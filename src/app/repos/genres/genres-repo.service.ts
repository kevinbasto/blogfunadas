import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { DatabaseException } from '../../core/exceptions/database.exception';
import { Genre } from '../../core/interfaces/genre.interface';
import { GenresRepo } from '../../core/repos/genres.repo';

@Injectable()
export class GenresRepoService implements GenresRepo {

  constructor(
    private angularFirestore : AngularFirestore
  ) { }

  async createGenre(genre : Genre) : Promise<any> {
    this.angularFirestore
    .collection('genres')
    .doc(genre.name).set(genre)
    .catch(error => { throw new DatabaseException(error); });
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

  async editGenre(genreId : string, genre : Genre) : Promise<any> {
    await this.angularFirestore.collection('genres').doc(genreId).update(genre)
    .catch(error => { throw new DatabaseException(error); });
  }

  async deleteGenre(genreId : string) : Promise<any> {
    await this.angularFirestore.collection('genres').doc(genreId).delete()
    .catch(error => { throw new DatabaseException(error); });
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
