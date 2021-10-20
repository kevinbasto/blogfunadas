import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNovelFormComponent } from './new-novel-form.component';

describe('NovelFormComponent', () => {
  let component: NewNovelFormComponent;
  let fixture: ComponentFixture<NewNovelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNovelFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNovelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
