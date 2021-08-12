import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chapter } from '../../core/interfaces/chapter.interface';
import { ChaptersRepo } from '../../core/repos/chapters.repo';

@Injectable()
export class ChaptersRepoService implements ChaptersRepo{

  constructor(
    private angularFirestore : AngularFirestore
  ) {}

  async createChapter( genre : string, novel : string, chapter : Chapter) : Promise<any> {
    
  }
  
  async deleteChapter() : Promise<any> {}
  
  async getChapter() : Promise<any> {}
  
  async updateChapter() : Promise<any> {}
  
}
