import { TestBed } from '@angular/core/testing';

import { EditNovelService } from './edit-novel.service';

describe('EditNovelService', () => {
  let service: EditNovelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditNovelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
