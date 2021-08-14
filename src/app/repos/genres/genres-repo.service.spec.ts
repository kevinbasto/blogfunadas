import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { Genre } from '../../core/interfaces/genre.interface';

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

  it('should create a new genre within the app', async() => {
    let genre : Genre= {
      name : "test1",
      creationDate: "15/08/21"
    }
    let genreId : string;
    await service.createGenre(genre)
    .then(id => genreId = id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined()
    });
    expect(genreId).toBeDefined();
    await service.deleteGenre(genreId)
    .catch(error =>{
      console.log(error);
      expect(error).toBeUndefined();
    });
  });

  it('should get a genre data', async() => {
    let genre : Genre = {
      name : "testgenre2",
      creationDate: "01-01-2020"
    };
    let genreId : string;
    await service.createGenre(genre)
    .then(id => genreId = id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined()
    });
    await service.getGenre(genreId)
    .then(resGenre => {
      expect(resGenre).toEqual(genre);
    })
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined()
    });
    await service.deleteGenre(genreId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });

  it('should edit a genre', async() => {
    let genre : Genre= {
      name : "test3",
      creationDate: "15/08/21"
    }
    let genreId : string;
    await service.createGenre(genre)
    .then(id => genreId = id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined()
    });
    let update : Genre = {
      name: "test3update",
      creationDate: "15/08/21"
    }
    await service.editGenre(genreId, update)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    })
    await service.getGenre(genreId)
    .then(resGenre => {
      expect(resGenre).toEqual({...genre, ...update});
    })
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    })
    await service.deleteGenre(genreId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });

  it('should delete a genre', async() => {
    let genre : Genre= {
      name : "test4",
      creationDate: "15/08/21"
    }
    let genreId : string;
    await service.createGenre(genre)
    .then(id => genreId = id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined()
    });
    await service.deleteGenre(genreId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getGenre(genreId)
    .then(resGenre => expect(resGenre).toBeUndefined())
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  })
});
