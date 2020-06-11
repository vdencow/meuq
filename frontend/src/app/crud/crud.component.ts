import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  constructor(public _crud: CrudService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this._crud.find();
  }

  edit(user) {
    let dialogRef = this._dialog.open(AddDialogComponent, {
      panelClass: ['col-lg-5', 'col-md-6', 'col-sm-8', 'col-xs-11'],
      data: user
    })
  }

  create() {
    let dialogRef = this._dialog.open(AddDialogComponent, {
      panelClass: ['col-lg-5', 'col-md-6', 'col-sm-8', 'col-xs-11']
    })
  }

  aas(user) {
    console.log('delete', user)
    this._crud.delete(user);
  }

}
