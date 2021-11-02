import { TestBed } from '@angular/core/testing';

import { LoadNovelformDataService } from './load-novelform-data.service';

describe('LoadNovelformDataService', () => {
  let service: LoadNovelformDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadNovelformDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
