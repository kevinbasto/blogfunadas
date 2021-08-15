import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { Novel } from '../../core/interfaces/novel.interface';

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

  it('should create a novel without any issue', async () => {
    let novel : Novel = {
      name : "the test novel",
      chapters: 0,
      status: 'en emision',
      author: "the author of the novel",
      genreId: 'asiaticas',
      translators: ["id1", "id2", "id3" ]
    }
    let novelId : string;
    await service.createNovel('japonesas', novel)
    .then(id => novelId = id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });
});
