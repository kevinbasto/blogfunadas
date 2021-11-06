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
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FileDropperComponent } from './file-dropper/file-dropper.component';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    TableComponent,
    FileDropperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ServicesModule,
    DirectivesModule,

    MatSidenavModule,
    MatIconModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  exports : [
    NavbarComponent,
    SidebarComponent,
    TableComponent,
    FileDropperComponent
  ]
})
export class ComponentsModule { }
