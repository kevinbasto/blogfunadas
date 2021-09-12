import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AdminComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
