import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

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
});
