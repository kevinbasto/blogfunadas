import { Inject, Injectable } from '@angular/core';
import { Novel } from '../../../../../../../core/interfaces/novel.interface';
import { SystemMessage } from '../../../../../../../core/interfaces/system-message';
import { EditNovelRepo } from '../../../../../../../core/repos/novels/edit-novel.repo';
import { EDIT_NOVEL_REPO } from '../../../../../../repos/novels/novels.tokens';

@Injectable({
  providedIn: 'root'
})
export class EditNovelService {

  constructor(
    @Inject(EDIT_NOVEL_REPO) private editNovelRepo : EditNovelRepo
  ) { }

  editNovel(genre : string, novel : string, content : Novel) : Promise <SystemMessage>{
    return new Promise<SystemMessage>((resolve, reject) => {
      this.editNovelRepo.editNovel(genre, novel, content)
      .then(res => resolve(res))
      .catch(err => reject(err));
    })
  }
}
