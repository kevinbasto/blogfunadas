import { TestBed } from '@angular/core/testing';

import { FetchNovelService } from './fetch-novel.service';

describe('FetchNovelService', () => {
  let service: FetchNovelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchNovelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
