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
      name : "the test novel 1",
      chapters: 0,
      status: 'en emision',
      author: "the author of the novel",
      genreId: 'asiaticas',
      translators: ["id1", "id2", "id3" ]
    };
    let genre = "japanese";
    let novelId : string;
    await service.createNovel(genre, novel)
    .then(id => novelId = id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    expect(novelId).toBeDefined();
    await service.deleteNovel(genre, novelId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });

  it('should get a novel without any issue', async () => {
    let novel : Novel = {
      name : "the test novel 2",
      chapters: 0,
      status: 'en emision',
      author: "the author of the novel",
      genreId: 'asiaticas',
      translators: ["id1", "id2", "id3" ]
    };
    let genre = "japanese";
    let novelId : string;
    await service.createNovel(genre, novel)
    .then(id => novelId = id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getNovel(genre, novelId)
    .then(resNovel => expect(resNovel).toEqual(novel))
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteNovel(genre, novelId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });

  it('should edit a novel without any issue', async () => {
    let novel : Novel = {
      name : "the test novel 4",
      chapters: 0,
      status: 'en emision',
      author: "the author of the novel",
      genreId: 'asiaticas',
      translators: ["id1", "id2", "id3" ]
    };
    let genre = "japanese";
    let novelId : string;
    await service.createNovel(genre, novel)
    .then(id => novelId = id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    let update : Novel = {
      name : "the test novel updated 4",
      chapters: 100,
      status: "finalizado",
      author : "the author of the novel",
      genreId: "chinas",
      translators: ["id3", "id4", "id5"]
    }
    await service.updateNovel(genre, novelId, update)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getNovel(genre, novelId)
    .then(resNovel => expect(resNovel).toEqual({...novel, ...update}) )
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    })
    await service.deleteNovel(genre, novelId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });

  it('should delete a novel', async () => {
    let novel : Novel = {
      name : "the test novel 4",
      chapters: 0,
      status: 'en emision',
      author: "the author of the novel",
      genreId: 'asiaticas',
      translators: ["id1", "id2", "id3" ]
    };
    let genre = "japanese";
    let novelId : string;
    await service.createNovel(genre, novel)
    .then(id => novelId = id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteNovel(genre, novelId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getNovel(genre, novelId)
    .then(resNovel => expect(resNovel).toBeUndefined())
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });
});
