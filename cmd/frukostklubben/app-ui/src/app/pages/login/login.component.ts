import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    this.matIconRegistry.addSvgIcon(
    'wheel',
    this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/wheel.svg')
  );}

  ngOnInit(): void {
  }
  login()
  {
    this.router.navigateByUrl('chat');
  }

}
