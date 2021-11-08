import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNovelFormComponent } from './edit-novel-form.component';

describe('EditNovelFormComponent', () => {
  let component: EditNovelFormComponent;
  let fixture: ComponentFixture<EditNovelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNovelFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNovelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
