import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Genre } from '../../../../../core/interfaces/genre.interface';
import { SystemMessage } from '../../../../../core/interfaces/system-message';
import { GenresRepo } from '../../../../../core/repos/genres.repo';
import { Sidebar } from '../../../../../core/services/sidebar';
import { GENRES_REPO } from '../../../../repos/tokens';
import { SidebarServiceToken } from '../../../../services/services.token';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(
    @Inject(GENRES_REPO) private genresRepo : GenresRepo,
    @Inject(SidebarServiceToken) private sidebar : Sidebar,
    private router : Router
  ) { }

  createGenre(genre : Genre) : Promise<SystemMessage>{
    return new Promise<SystemMessage>((resolve, reject) => {
      genre.name = this.despacer(genre.name);
      this.genresRepo.createGenre(genre)
      .then(res => {
        resolve(res);
        this.sidebar.deleteSidebarElements();
        this.router.navigate(['/admin/genres']);
      })
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
