import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientModule } from "./client/client.module";
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from "./admin/admin.module";
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from "./auth/auth.module";

const routes: Routes = [
  {
    path : '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path : 'auth',
    component: AuthComponent,
    children: [{
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
      }]
  },
  {
    path : 'client',
    component: ClientComponent,
    children: [{
        path : '',
        loadChildren: './client/client.module#ClientModule'
      }],
  },
  {
    path : 'admin',
    component: AdminComponent,
    children: [{
        path: '',
        loadChildren: './admin/admin.module#AdminModule'
      }]
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
