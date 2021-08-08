import { TestBed } from '@angular/core/testing';

import { NovelsRepoService } from './novels-repo.service';

describe('NovelsRepoService', () => {
  let service: NovelsRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelsRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
