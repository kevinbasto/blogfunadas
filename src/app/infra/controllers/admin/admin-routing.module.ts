import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GuardsModule } from '../../guards/guards.module';
import { AdminGuard } from '../../guards/roles/admin/admin.guard';

const routes : Routes = [
  {
    path : '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'genres',
    loadChildren: () => import('./genres/genres.module').then(m => m.GenresModule),
    canActivateChild : [AdminGuard]
  },
  {
    path: 'policies',
    loadChildren: () => import('./policies/policies.module').then(m => m.PoliciesModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then(m => m.TermsModule )
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: ':genre',
    loadChildren : () => import('./catalogues/catalogues.module').then(m => m.CataloguesModule)
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GuardsModule
  ]
})
export class AdminRoutingModule { }
