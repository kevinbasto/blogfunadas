import { Injectable } from '@angular/core';
import { Chapter } from '../../../../../../../core/interfaces/chapter.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchChapterService {

  constructor() { }

  fetchChapter() : Promise<Chapter>{
    return new Promise<Chapter>((resolve, reject) => {});
  }
}
