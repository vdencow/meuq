import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    public _auth: AuthService
  ) { }

  ngOnInit(): void {
      this.initForm();
  }

  initForm(): void {
    this.loginForm = this._fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(32)])]
    });
  }

  login(): void {
    let user = this.loginForm.getRawValue()
    this._auth.login(user);
  }

}
