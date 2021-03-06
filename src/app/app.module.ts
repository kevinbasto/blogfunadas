import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './infra/controllers/client/client.component';
import { AdminComponent } from './infra/controllers/admin/admin.component';
import { AuthComponent } from './infra/controllers/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './infra/components/components.module';

import { environment } from '../environments/environment';

import { GuardsModule } from './infra/guards/guards.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ReposModule } from './infra/repos/repos.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from "@angular/fire/storage";


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AdminComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    GuardsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,

    MatSidenavModule,
    MatIconModule,
    ReposModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
