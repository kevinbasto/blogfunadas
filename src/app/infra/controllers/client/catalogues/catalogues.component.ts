import { Component, Inject, OnInit } from '@angular/core';
import { Genre } from '../../../../core/interfaces/genre.interface';
import { GenresRepo } from '../../../../core/repos/genres.repo';
import { GENRES_REPO } from '../../../repos/tokens';

@Component({
  selector: 'app-catalogues',
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.css']
})
export class CataloguesComponent implements OnInit {

  constructor(@Inject(GENRES_REPO) private genreRepo : GenresRepo ) {

  }

  ngOnInit(): void {
    let genre : Genre;
    
  }

}
