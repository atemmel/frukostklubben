import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { P2pService } from 'src/app/services/p2p.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private p2pService: P2pService
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  login() {
    this.p2pService.addUser(
      { name: this.username.value },
      (usernameTaken: boolean) => {
        if (!usernameTaken) this.router.navigateByUrl('welcome');
      }
    );
  }

  get username() {
    return this.loginForm.get('username');
  }
}
