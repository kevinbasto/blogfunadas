import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { Comment } from '../../core/interfaces/comment.interface';

import { CommentsRepoService } from './comments-repo.service';

describe('CommentsRepoService', () => {
  let service: CommentsRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CommentsRepoService ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(CommentsRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a chapter', async() => {
    let location : string = "updates/comments/comments";
    let comment : Comment = {
      author : "test@test.com",
      content : "lorem ipsum dolor sit amet consectetur adipicising elit"
    }
    let commentId : string;
    await service.createComment(location, comment)
    .then(res => commentId = res)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    expect(commentId).toBeDefined();
    await service.deleteComment(location, commentId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    })
  });

  it('should get a chapter', async() => {
    let location : string = "updates/comments/comments";
    let comment : Comment = {
      author : "test@test.com",
      content : "lorem ipsum dolor sit amet consectetur adipicising elit"
    }
    let commentId : string;
    await service.createComment(location, comment)
    .then(res => commentId = res)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getComment(location, commentId)
    .then(resComment => expect(resComment).toEqual(comment))
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteComment(location, commentId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined()
    })
  });

  it('should edit comment', async() => {
    let location : string = "updates/comments/comments";
    let comment : Comment = {
      author : "test@test.com",
      content : "lorem ipsum dolor sit amet consectetur adipicising elit"
    }
    let commentId : string;
    await service.createComment(location, comment)
    .then(res => commentId = res)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    let update : Comment = {
      author: "testupdate@update.com",
      content: "lorem ipsum update sit update"
    };
    await service.updateComment(location, commentId, update)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getComment(location, commentId)
    .then(resComment => {
      expect(resComment).toEqual({...comment, ...update});
    })
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteComment(location, commentId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });
  
  it('should delete a comment', async() => {
    let location : string = "updates/comments/comments";
    let comment : Comment = {
      author : "test@test.com",
      content : "lorem ipsum dolor sit amet consectetur adipicising elit"
    }
    let commentId : string;
    await service.createComment(location, comment)
    .then(res => commentId = res)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteComment(location, commentId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getComment(location, commentId)
    .then(comment => expect(comment).toBeUndefined())
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });
});
