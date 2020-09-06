import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {trigger, state, style, animate, transition, group, query, animateChild, keyframes} from '@angular/animations';
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
      transition(':enter', [
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
        ]),
        transition(':leave',[
          style({ transform: 'rotate(0)' }),
          animate('2000ms ease-in-out', style({ transform: 'rotate(+1580deg)'})),
          ])
      ]),
      trigger('leaveAnimation', [
        transition(':leave', [
          style({ opacity: 1, transform: 'translateX(0%)'}),
          group( [
          animate('2000ms ease-in', keyframes([ 
            style({ opacity: 1,transform: 'translateX(0%)', offset:0.5 }),
            style({ opacity: 1,transform: 'translateX(110%)',offset:1 })])),
          query('@*', animateChild())
          ])
        ])
      ])
  ]
  })


export class UserSectionComponent implements OnInit {
  users: Array<User> = this.usersService.getUsers();
  state: string = 'default';

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private cdRef:ChangeDetectorRef,
    public usersService: UsersService) {
      this.matIconRegistry.addSvgIcon(
      "wheel",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/wheel.svg")
    );}

  ngOnInit(): void {
    
  }
  kollaSkiten(user){
    this.cdRef.detectChanges();
    user.showHelmet = false;
    console.log(user);
    console.log(this.usersService.usersInChat);
    this.users;
  }

  removeUser(user: User) {

    user.showHelmet = false;
    //This most be here because Angular knows that i want to remove it, so angular dont want to update the icon when stuff that is going to be removed..
    setTimeout(() => {
    this.usersService.removeUsers(user.name);
    }, 0);
  }
}
