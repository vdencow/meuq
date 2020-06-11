import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { SharedModule } from '../shared/shared.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { CrudService } from './crud.service';


@NgModule({
  declarations: [CrudComponent, AddDialogComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    SharedModule,
  ],
  providers: [CrudService],
  entryComponents: [AddDialogComponent]
})
export class CrudModule { }
