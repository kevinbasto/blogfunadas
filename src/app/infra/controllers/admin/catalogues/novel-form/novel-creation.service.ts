import { Inject, Injectable } from '@angular/core';
import { Novel } from '../../../../../core/interfaces/novel.interface';
import { NovelsRepo } from '../../../../../core/repos/novels.repo';
import { NOVELS_REPO } from '../../../../repos/tokens';

@Injectable({
  providedIn: 'root'
})
export class NovelCreationService {

  constructor(
    @Inject(NOVELS_REPO) private novelsRepo : NovelsRepo
  ) { }

  createNovel(genre : string, novel : Novel){
    this.novelsRepo.createNovel(genre, novel)
  }
}
