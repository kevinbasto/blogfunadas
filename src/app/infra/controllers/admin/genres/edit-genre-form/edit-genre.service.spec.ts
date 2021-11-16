import { TestBed } from '@angular/core/testing';

import { EditGenreService } from './edit-genre.service';

describe('EditGenreService', () => {
  let service: EditGenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditGenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
