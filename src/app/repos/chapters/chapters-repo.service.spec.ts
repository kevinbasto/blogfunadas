import { TestBed } from '@angular/core/testing';

import { ChaptersRepoService } from './chapters-repo.service';

describe('ChaptersRepoService', () => {
  let service: ChaptersRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaptersRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
