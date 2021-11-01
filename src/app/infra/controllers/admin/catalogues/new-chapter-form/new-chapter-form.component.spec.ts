import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChapterFormComponent } from './new-chapter-form.component';

describe('NewChapterFormComponent', () => {
  let component: NewChapterFormComponent;
  let fixture: ComponentFixture<NewChapterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChapterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChapterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
