import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

import { ChaptersRepoService } from './chapters-repo.service';

describe('ChaptersRepoService', () => {
  let service: ChaptersRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ChaptersRepoService ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(ChaptersRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
