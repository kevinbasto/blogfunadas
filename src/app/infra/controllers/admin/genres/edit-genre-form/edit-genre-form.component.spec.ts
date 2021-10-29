import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGenreFormComponent } from './edit-genre-form.component';

describe('EditGenreFormComponent', () => {
  let component: EditGenreFormComponent;
  let fixture: ComponentFixture<EditGenreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGenreFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGenreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
