import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

import { NovelsRepoService } from './novels-repo.service';

describe('NovelsRepoService', () => {
  let service: NovelsRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ NovelsRepoService ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(NovelsRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
