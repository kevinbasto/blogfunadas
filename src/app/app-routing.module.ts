import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './infra/controllers/client/client.component';
import { ClientModule } from "./infra/controllers/client/client.module";
import { AdminComponent } from './infra/controllers/admin/admin.component';
import { AdminModule } from "./infra/controllers/admin/admin.module";
import { AuthComponent } from './infra/controllers/auth/auth.component';
import { AuthModule } from "./infra/controllers/auth/auth.module";

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
        loadChildren: () => import('./infra/controllers/auth/auth.module').then(m => m.AuthModule)
      }]
  },
  {
    path : 'client',
    component: ClientComponent,
    children: [{
        path : '',
        loadChildren: () => import('./infra/controllers/client/client.module').then(m => m.ClientModule)
      }],
  },
  {
    path : 'admin',
    component: AdminComponent,
    children: [{
        path: '',
        loadChildren: () => import('./infra/controllers/admin/admin.module').then(m => m.AdminModule)
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
