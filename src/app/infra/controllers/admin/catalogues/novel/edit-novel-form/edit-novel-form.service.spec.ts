import { TestBed } from '@angular/core/testing';

import { EditNovelFormService } from './edit-novel-form.service';

describe('EditNovelFormService', () => {
  let service: EditNovelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditNovelFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
