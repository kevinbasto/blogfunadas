import { Injectable } from '@angular/core';
import { ChaptersRepo } from '../../core/repos/chapters.repo';

@Injectable()
export class ChaptersRepoService implements ChaptersRepo{

  constructor() { }

  async createChapter() : Promise<any> {}
  
  async deleteChapter() : Promise<any> {}
  
  async getChapter() : Promise<any> {}
  
  async updateChapter() : Promise<any> {}
  
}
