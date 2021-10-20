import { TestBed } from '@angular/core/testing';

import { NovelCreationService } from './new-novel-creation.service';

describe('NovelCreationService', () => {
  let service: NovelCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
