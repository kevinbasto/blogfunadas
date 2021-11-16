import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Genre } from '../../../../../core/interfaces/genre.interface';
import { SystemMessage } from '../../../../../core/interfaces/system-message';
import { GenresRepo } from '../../../../../core/repos/genres.repo';
import { Sidebar } from '../../../../../core/services/sidebar';
import { GENRES_REPO } from '../../../../repos/tokens';
import { SidebarServiceToken } from '../../../../services/services.token';

@Injectable({
  providedIn: 'root'
})
export class EditGenreService {

  constructor(
    private firestore : AngularFirestore,
    private router : Router,
    @Inject(GENRES_REPO) private genresRepo : GenresRepo,
    @Inject(SidebarServiceToken) private sidebar : Sidebar,
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

  updateGenre(currentName : string, genreId : string, genre : Genre) : Promise<SystemMessage>{
    return new Promise<SystemMessage>((resolve, reject) => {
      this.genresRepo.editGenre(currentName, genreId, genre)
      .then(res => {
        resolve(res);
        this.sidebar.deleteSidebarElements();
        this.router.navigate(['/admin/genres']);
      })
      .catch(err => reject(err));
    })
  }
}
