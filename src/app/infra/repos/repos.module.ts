import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CHAPTERS_REPO, COMMENTS_REPO, GENRES_REPO, NOVELS_REPO, USERS_REPO } from './tokens';
import { GenresRepoService } from './genres/genres-repo.service';
import { UsersRepoService } from './users/users-repo.service';
import { NovelsRepoService } from './novels/novels-repo.service';
import { ChaptersRepoService } from './chapters/chapters-repo.service';
import { CommentsRepoService } from './comments/comments-repo.service';
import { CreateNovelService } from './novels/create-novel/create-novel.service';
import { NovelsModule } from './novels/novels.module';
import { ChaptersModule } from './chapters/chapters.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NovelsModule,
    ChaptersModule
  ],
  providers: [
    {
      provide: USERS_REPO,
      useClass: UsersRepoService
    },
    {
      provide: GENRES_REPO,
      useClass: GenresRepoService
    },
    {
      provide: NOVELS_REPO,
      useClass: NovelsRepoService
    },
    {
      provide: CHAPTERS_REPO,
      useClass: ChaptersRepoService
    },
    {
      provide: COMMENTS_REPO,
      useClass: CommentsRepoService
    },
  ],
})
export class ReposModule { }
