import { TestBed } from '@angular/core/testing';

import { UsersRepoService } from './users-repo.service';

describe('UsersRepoService', () => {
  let service: UsersRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
