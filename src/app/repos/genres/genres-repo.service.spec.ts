import { TestBed } from '@angular/core/testing';

import { GenresRepoService } from './genres-repo.service';

describe('GenresRepoService', () => {
  let service: GenresRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenresRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
