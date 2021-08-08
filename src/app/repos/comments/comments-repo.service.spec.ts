import { TestBed } from '@angular/core/testing';

import { CommentsRepoService } from './comments-repo.service';

describe('CommentsRepoService', () => {
  let service: CommentsRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
