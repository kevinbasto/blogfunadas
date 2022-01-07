import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPoliciesFormComponent } from './new-policies-form.component';

describe('NewPoliciesFormComponent', () => {
  let component: NewPoliciesFormComponent;
  let fixture: ComponentFixture<NewPoliciesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPoliciesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPoliciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
