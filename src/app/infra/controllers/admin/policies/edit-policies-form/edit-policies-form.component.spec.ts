import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPoliciesFormComponent } from './edit-policies-form.component';

describe('EditPoliciesFormComponent', () => {
  let component: EditPoliciesFormComponent;
  let fixture: ComponentFixture<EditPoliciesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPoliciesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPoliciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
