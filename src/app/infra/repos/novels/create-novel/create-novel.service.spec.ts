import { TestBed } from '@angular/core/testing';

import { CreateNovelService } from './create-novel.service';

describe('CreateNovelService', () => {
  let service: CreateNovelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNovelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
