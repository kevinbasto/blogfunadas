import { TestBed } from '@angular/core/testing';

import { EditChapterService } from './edit-chapter.service';

describe('EditChapterService', () => {
  let service: EditChapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditChapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
