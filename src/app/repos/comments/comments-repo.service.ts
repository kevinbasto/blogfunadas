import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Comment } from '../../core/interfaces/comment.interface';
import { CommentsRepo } from '../../core/repos/comments.repo';

@Injectable()
export class CommentsRepoService implements CommentsRepo{

  constructor(
    private angularFirestore : AngularFirestore
  ) { }

  async createComment( location : string, comment : Comment ) : Promise<any> {
    await this.angularFirestore.collection(location).add(comment)
    .catch(error => { throw error });
  }
  
  async getComment( location : string, commentId : string ) : Promise<Comment> {
    let comment : Comment
    await this.angularFirestore.collection(location).doc(commentId).valueChanges()
    .pipe(take(1)).toPromise()
    .then( (res : any) => comment = res)
    .catch(error => { throw error });
    return comment;
  }

  async updateComment( location : string, commentId : string, comment : Comment ) : Promise<any> {
    await this.angularFirestore.collection(location).doc(commentId).update(comment)
    .catch(error => { throw error });
  }

  async deleteComment( location : string, commentId : string ) : Promise<any> {
    await this.angularFirestore.collection(location).doc(commentId).delete()
    .catch(error => { throw error });
  }

  async getComments( page : number, pageSize : number, location : string ) : Promise<Array<Comment>> {
    let comments : Array<Comment>;
    await this.angularFirestore.collection(location, ref => ref.startAt( ((page - 1) * pageSize) + 1).limit(page * pageSize))
    .valueChanges().pipe(take(1)).toPromise()
    .then( (res : any) => comments = res)
    .catch(error => { throw error });
    return comments;
  }
}
