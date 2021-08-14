import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, DocumentReference } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { User } from '../../core/interfaces/user.interface';

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

  it('should create a user without any problem', async () => {
    let user : User = {
      email: "test@test.com",
      profile: "testprofilePicture"
    }

    let id : string;
    await service.createUser(user)
    .then( res => id = res)
    .catch(error => {
      expect(error).toBeUndefined();
    });
    expect(id).toBeDefined();

    await service.deleteUser(id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    })
  });

  it('should get a user without any problem', async() => {
    let user : User = {
      email: "test@test.com",
      profile: "testpicgoeshere"
    };
    let id : string;
    await service.createUser(user)
    .then(res => id = res)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });

    let test;
    await service.getUser(id)
    .then(res => test = res)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    expect(test).toEqual(user);
    await service.deleteUser(id)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    })
  });

  it('should update a user without any problem', async() => {
    let user : User = {
      email : "test3@test.com",
      profile: "testpicturegoeshere"
    };
    let id : string;
    await service.createUser(user)
    .then(userId => id = userId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    let update : User = {
      email : "test3@update.com",
      profile: "thetest3updatedpicturetest"
    };
    await service.updateUser(id, update)
    .then(res => expect(res).toBeTruthy())
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getUser(id)
    .then(user => expect(user).toEqual({...user, ...update}))
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
  });

  it('should successfully delete a object', async() => {
    let user : User = {
      email: "test4@test.com",
      profile: "testusernumber4"
    };
    let userId : string;
    await service.createUser(user)
    .then(id => userId = id)
    .catch(error=> {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.deleteUser(userId)
    .catch(error => {
      console.log(error);
      expect(error).toBeUndefined();
    });
    await service.getUser(userId)
    .then(user => {
      console.log(user);
      expect(user).toBeUndefined()
    })
    .catch(error=> {
      console.log(error);
      expect(error).toBeUndefined();
    })
  })
});
