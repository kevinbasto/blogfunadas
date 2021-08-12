import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

import { GenresRepoService } from './genres-repo.service';

describe('GenresRepoService', () => {
  let service: GenresRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GenresRepoService
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(GenresRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
