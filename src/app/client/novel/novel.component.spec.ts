import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { ReposModule } from '../../repos/repos.module';

import { NovelComponent } from './novel.component';

describe('NovelComponent', () => {
  let component: NovelComponent;
  let fixture: ComponentFixture<NovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovelComponent ],
      imports: [ 
        ReposModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
