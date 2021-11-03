import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CHAPTERS_REPO, COMMENTS_REPO, CREATE_NOVEL_REPO, GENRES_REPO, NOVELS_REPO, USERS_REPO } from './tokens';
import { GenresRepoService } from './genres/genres-repo.service';
import { UsersRepoService } from './users/users-repo.service';
import { NovelsRepoService } from './novels/novels-repo.service';
import { ChaptersRepoService } from './chapters/chapters-repo.service';
import { CommentsRepoService } from './comments/comments-repo.service';
import { CreateNovelService } from './novels/create-novel/create-novel.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
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
    {
      provide: CREATE_NOVEL_REPO,
      useClass: CreateNovelService
    }
  ],
})
export class ReposModule { }
