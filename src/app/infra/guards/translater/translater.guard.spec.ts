import { TestBed } from '@angular/core/testing';

import { TranslaterGuard } from './translater.guard';

describe('TranslaterGuard', () => {
  let guard: TranslaterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TranslaterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
