import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition, group, query, animateChild} from '@angular/animations';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from 'src/app/services/users.service';
export interface User {
  name: string;
  color?: string;
  showHelmet?: boolean;
}

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss'],
  animations: [
    trigger('entryAnimation', [
      transition(':enter, :leave', [
        style({ opacity: 1, transform: 'translateX(100%)'}),
        group( [
        animate('2000ms ease-out', style({ opacity: 1,transform: 'translateX(0%)' })),
        query('@*', animateChild())
        ])
      ])
    ]),
    trigger('rotateAnimation', [
      transition(':enter',[
        style({ transform: 'rotate(0)' }),
        animate('2000ms ease-out', style({ transform: 'rotate(-720deg)'})),
        ])
      ])
  ]
  
  })


export class UserSectionComponent implements OnInit {
  users: Array<User> = this.usersService.getUsers();
  state: string = 'default';

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private usersService: UsersService) {
      this.matIconRegistry.addSvgIcon(
      "wheel",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/wheel.svg")
    );}

  ngOnInit(): void {
    // for(var i = 0; i < 5; i++){
      
    //   setTimeout(() => {
    //     this.addUser({name:'Temmel', color: 'green' });
    //   }, 2000*i); 

    // }

  }
  addUser(user: User) {
    // this.users.push(user);
  }
}
