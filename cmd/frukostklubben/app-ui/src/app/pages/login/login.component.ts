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
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/message.interface';

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
    '#c6a670'
  ];





  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private p2pService: P2pService,
    private usersService: UsersService
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

  ngOnInit(): void {
    this.defaultColors =  getRandomColor(this.defaultColors,5);
  }
  login() {

    var user: User = { name: this.username.value, color: this.color };

    this.p2pService.addUser(user,
      (usernameTaken: boolean) => {
        if (!usernameTaken) {
          this.usersService.addUser(user);
          this.router.navigateByUrl('welcome');
          
        }
      }
    );
  }

  get username() {
    return this.loginForm.get('username');
  }
}
function getRandomColor(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}