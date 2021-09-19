import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports : [
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
