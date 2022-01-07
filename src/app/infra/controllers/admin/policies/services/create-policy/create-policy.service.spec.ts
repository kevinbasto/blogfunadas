import { TestBed } from '@angular/core/testing';

import { CreatePolicyService } from './create-policy.service';

describe('CreatePolicyService', () => {
  let service: CreatePolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
