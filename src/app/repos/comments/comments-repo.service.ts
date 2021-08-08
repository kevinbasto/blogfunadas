import { Injectable } from '@angular/core';
import { CommentsRepo } from '../../core/repos/comments.repo';

@Injectable()
export class CommentsRepoService implements CommentsRepo{

  constructor() { }

  async createComment() : Promise<any> {}
  
  async deleteComment() : Promise<any> {}
  
  async getComment() : Promise<any> {}
  
  async getComments() : Promise<any> {}
  
  async updateComment() : Promise<any> {}
  

}
