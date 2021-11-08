import { TestBed } from '@angular/core/testing';

import { FetchChapterService } from './fetch-chapter.service';

describe('FetchChapterService', () => {
  let service: FetchChapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchChapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
