import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../../../environments/environment';
import { ReposModule } from '../../../repos/repos.module';

import { CataloguesComponent } from './catalogues.component';

describe('CataloguesComponent', () => {
  let component: CataloguesComponent;
  let fixture: ComponentFixture<CataloguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CataloguesComponent ],
      imports: [ 
        ReposModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CataloguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
