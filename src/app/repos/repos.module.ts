import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GENRES_REPO } from './tokens';
import { GenresRepoService } from './genres/genres-repo.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: GENRES_REPO,
      useClass: GenresRepoService
    }
  ]
})
export class ReposModule { }
