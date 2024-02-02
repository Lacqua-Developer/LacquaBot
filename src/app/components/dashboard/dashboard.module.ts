import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ConfigComponent } from './config/config.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { AlertasComponent } from './alertas/alertas.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    DashboardComponent,
    ConfigComponent,
    AlertasComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule
  ]

})
export class DashboardModule { }
