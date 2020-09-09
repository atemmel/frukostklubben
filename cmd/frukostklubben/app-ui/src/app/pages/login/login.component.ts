import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { EventEmitter, Input, Output } from '@angular/core';

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

  @Input() heading: string;
  @Input() color: string;
  @Output() event = new EventEmitter();
  public show = false;
  public defaultColors: string[] = [
    '#ffffff',
    '#FFFF00',
    '#3e6158',
    '#3f7a89',
    '#96c582',
    '#b7d5c4',
    '#bcd6e7',
    '#7c90c1',
    '#9d8594',
    '#dad0d8',
    '#4b4fce',
    '#4e0a77',
    '#a367b5',
    '#ee3e6d',
    '#d63d62',
    '#c6a670',
    '#f46600',
    '#cf0500',
    '#efabbd',
    '#8e0622',
    '#f0b89a',
    '#f0ca68',
    '#62382f',
    '#c97545',
    '#c1800b'
  ];





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
  /**
   * Change color from default colors
   * @param {string} color
   */
  public changeColor(color: string): void {
    this.color = color;
    this.event.emit(this.color);
    this.show = false;
  }


  /**
   * Change color from input
   * @param {string} color
   */

  /**
   * Change status of visibility to color picker
   */
  public toggleColors(): void {
    this.show = !this.show;
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
