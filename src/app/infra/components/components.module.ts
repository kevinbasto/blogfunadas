import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ServicesModule,

    MatSidenavModule,
    MatIconModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports : [
    NavbarComponent,
    SidebarComponent,
    TableComponent
  ]
})
export class ComponentsModule { }
