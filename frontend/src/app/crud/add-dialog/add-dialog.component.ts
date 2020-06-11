import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from '../crud.service';
import { CrudModel } from '../crud.model';




@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html'
})
export class AddDialogComponent implements OnInit {

  user: FormGroup;
  hasError: boolean = false;


  passwordConfirmationValidator(formControl: FormControl) {
    return formControl.parent ? (formControl.value == formControl.parent.get('password').value ? null : {match: true}) : null
  }

  passwordRequired(formControl: FormControl) {
    console.log(formControl.value)
    if (formControl.parent) {
      return (formControl.parent.get('url').value ? null : (!!formControl.value && formControl.value !== '') ? null : {required: true})
    }else {
      return  null
    }

  }

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private _fb: FormBuilder,
    private _crud: CrudService,
    @Inject(MAT_DIALOG_DATA) private userData?: CrudModel
  ) { }

  ngOnInit(): void {
    this.user = this._fb.group({
      url: [this.userData ? this.userData.url : null],
      email: [this.userData ? this.userData.email : '', Validators.compose([Validators.required, Validators.email])],
      username: [this.userData ? this.userData.username : '', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([this.passwordRequired, Validators.minLength(4)])],
      confirmation: ['', this.passwordConfirmationValidator],
      id: [this.userData ? this.userData.id : null],
    })
  }


  finish() {
    let user1 = this.user.getRawValue();
    //delete user1.password;
    //delete user1.confirmation;
    this._crud.addOrUpdate(user1).subscribe(data => {
        this._crud.find();
        this.dialogRef.close();
    }, err => {
      this.hasError = true;
    })
  }

  cancel() {
    this.dialogRef.close();
  }

}
