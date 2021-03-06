import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './infra/controllers/client/client.component';
import { ClientModule } from "./infra/controllers/client/client.module";
import { AdminComponent } from './infra/controllers/admin/admin.component';
import { AdminModule } from "./infra/controllers/admin/admin.module";
import { AuthComponent } from './infra/controllers/auth/auth.component';
import { AuthModule } from "./infra/controllers/auth/auth.module";
import { AuthGuard } from './infra/guards/auth/auth.guard';
import { NonAuthGuard } from './infra/guards/non-auth/non-auth.guard';
import { RolesGuard } from './infra/guards/roles/roles.guard';

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
      }
    ],
    canActivateChild : [NonAuthGuard]
  },
  {
    path : 'client',
    component: ClientComponent,
    children: [{
        path : '',
        loadChildren: () => import('./infra/controllers/client/client.module').then(m => m.ClientModule)
      }
    ],
    canActivateChild: [AuthGuard]
  },
  {
    path : 'admin',
    component: AdminComponent,
    children: [{
        path: '',
        loadChildren: () => import('./infra/controllers/admin/admin.module').then(m => m.AdminModule)
      }
    ],
    canActivateChild: [AuthGuard, RolesGuard]
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
