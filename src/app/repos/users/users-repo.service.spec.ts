import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

import { UsersRepoService } from './users-repo.service';

describe('UsersRepoService', () => {
  let service: UsersRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        UsersRepoService 
      ],
      imports: [ 
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(UsersRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
