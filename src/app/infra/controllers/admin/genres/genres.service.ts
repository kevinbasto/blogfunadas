import { Inject, Injectable } from '@angular/core';
import { Genre } from '../../../../core/interfaces/genre.interface';
import { SystemMessage } from '../../../../core/interfaces/system-message';
import { GenresRepo } from '../../../../core/repos/genres.repo';
import { GENRES_REPO } from '../../../repos/tokens';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(
    @Inject(GENRES_REPO) private genresRepo : GenresRepo
  ) { }

  createGenre(genre : Genre) : Promise<SystemMessage>{
    return new Promise<SystemMessage>((resolve, reject) => {
      genre.name = this.despacer(genre.name);
      this.genresRepo.createGenre(genre)
      .then(res => resolve(res))
      .catch(err => reject(err))
    })
  }

  private despacer(genre : string) : string {
    let genreDespaced : string = "";
    for(let subpart of genre.split(" "))
      genreDespaced += subpart;
    return genreDespaced;
  }
}
