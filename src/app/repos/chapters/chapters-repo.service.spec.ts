import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { Chapter } from '../../core/interfaces/chapter.interface';

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

  it('should create a chapter within a novel', async() => {
    let chapter : Chapter = {
      title: "the fastest man alive",
      content: "content lorem ipsum",
      translators: ["id1", "id2", "id3"]
    };
    let novel = "testNovel";
    let genre = "testGenre";
    let chapterId = "1";
    await service.createChapter(genre, novel, chapterId, chapter)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getChapter(genre, novel, chapterId)
    .then(resChapter => { expect(resChapter).toEqual(chapter)})
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteChapter(genre, novel, chapterId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    })
  });

  it('should get a chapter within a novel', async() => {
    let chapter : Chapter = {
      title: "the fastest man alive",
      content: "content lorem ipsum",
      translators: ["id1", "id2", "id3"]
    };
    let novel = "testNovel";
    let genre = "testGenre";
    let chapterId = "1";
    await service.createChapter(genre, novel, chapterId, chapter)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getChapter(genre, novel, chapterId)
    .then(resNovel => { expect(resNovel).toBeDefined() })
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteChapter(genre, novel, chapterId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });

  it('should edit a chapter within a novel', async() => {
    let chapter : Chapter = {
      title: "the fastest man alive",
      content: "content lorem ipsum",
      translators: ["id1", "id2", "id3"]
    };
    let novel = "testNovel";
    let genre = "testGenre";
    let chapterId = "1";
    await service.createChapter(genre, novel, chapterId, chapter)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    let update: Chapter = {
      title: "the fastest man alive updated",
      content: "content lorem ipsum",
      translators: ["id1", "id2", "id3"]
    }
    await service.updateChapter(genre, novel, chapterId, update)
    .catch(error => { 
      console.log(error);
      expect(error).toBeUndefined();
    })
    await service.getChapter(genre, novel, chapterId)
    .then(resNovel => { expect(resNovel).toEqual({...chapter, ...update}) })
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteChapter(genre, novel, chapterId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });

  it('should delete a chapter', async () => {
    let chapter : Chapter = {
      title: "the fastest man alive",
      content: "content lorem ipsum",
      translators: ["id1", "id2", "id3"]
    };
    let novel = "testNovel";
    let genre = "testGenre";
    let chapterId = "1";
    await service.createChapter(genre, novel, chapterId, chapter)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getChapter(genre, novel, chapterId)
    .then(resChapter => { expect(resChapter).toBeDefined() })
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteChapter(genre, novel, chapterId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    })
    await service.getChapter(genre, novel, chapterId)
    .then(resChapter => {
      expect(resChapter).toBeUndefined();
    })
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });
});
