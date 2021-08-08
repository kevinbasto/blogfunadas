import { Injectable } from '@angular/core';
import { NovelsRepo } from '../../core/repos/novels.repo';

@Injectable()
export class NovelsRepoService implements NovelsRepo{

  constructor() { }

  async createNovel() : Promise<any> {}
  
  async deleteNovel() : Promise<any> {}
  
  async getNovel() : Promise<any> {}
  
  async getNovels() : Promise<any> {}
  
  async updateNovel() : Promise<any> {}
  
}
