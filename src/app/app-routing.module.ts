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
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }]
  },
  {
    path : 'client',
    component: ClientComponent,
    children: [{
        path : '',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      }],
  },
  {
    path : 'admin',
    component: AdminComponent,
    children: [{
        path: '',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
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
