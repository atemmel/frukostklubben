import { Component, Inject, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  animateChild,
  keyframes,
} from '@angular/animations';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-fk-popup',
  templateUrl: './fk-popup.component.html',
  styleUrls: ['./fk-popup.component.scss'],
  animations: [
    trigger('leaveLeft', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0%)' }),
        animate(
          '1000ms ease-in',
          style({ opacity: 0, transform: 'translateX(-250%)' })
        ),
      ]),
    ]),
    trigger('enterLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1000ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('leaveRight', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0%)' }),
        animate(
          '1000ms ease-in',
          style({ opacity: 0, transform: 'translateX(250%)' })
        ),
      ]),
    ]),
    trigger('enterRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1000ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('winnerEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-500%)' }),
        animate(
          '2000ms ease-out',
          style({ opacity: 1, transform: 'translateY(0%)' })
        ),
      ]),
    ]),
  ],
})
export class FkPopupDialog implements OnInit {
  selectedGroup: 'left' | 'right' | '';

  playoffStarted: boolean = false;

  restaurants: Array<string> = [
    'Divan',
    'Big boy',
    'PC',
    'Curres',
    'Max',
    'Donken',
    'Ecosub',
    'Great Eastern',
    'Biteline',
  ];

  leftRestaurants: Array<string>;
  rightRestaurants: Array<string>;

  rightListState: string;
  leftListState: string;

  pendingStart: boolean = false;

  ngOnInit() {
    this.divideRestaurants();
  }

  divideRestaurants() {
    this.leftRestaurants = this.restaurants.slice(
      0,
      this.restaurants.length / 2
    );

    this.rightRestaurants = this.restaurants.slice(this.restaurants.length / 2);
  }

  startPlayoff() {
    this.selectedGroup = 'left';

    this.playoffStarted = true;

    let rnd = 25 + Math.floor(Math.random() * 15);

    // let rnd = Math.floor(Math.random() * 5) + 5;

    console.log(rnd);

    for (let i = 1; i < rnd; i++) {
      setTimeout(() => {
        this.selectedGroup == 'left'
          ? (this.selectedGroup = 'right')
          : (this.selectedGroup = 'left');

        if (i == rnd - 1) this.playoffDone();
      }, i * i * 10);
    }
  }

  playoffDone() {
    let finalGroup = this.selectedGroup;

    setTimeout(() => {
      for (let i = 1; i <= 8; i++) {
        setTimeout(() => {
          this.selectedGroup == ''
            ? (this.selectedGroup = finalGroup)
            : (this.selectedGroup = '');

          if (i == 8) this.initNewPlayoff();
        }, i * 100);
      }
    }, 1000);
  }

  initNewPlayoff() {
    if (this.selectedGroup == 'left') {
      this.restaurants = this.leftRestaurants;
    } else {
      this.restaurants = this.rightRestaurants;
    }

    this.selectedGroup = '';

    this.leftRestaurants = [];
    this.rightRestaurants = [];

    // this.divideRestaurants();

    if (this.restaurants.length > 1)
      setTimeout(() => (this.pendingStart = true), 1500);
  }

  enterDone() {
    console.log('enter done');

    if (this.pendingStart) {
      setTimeout(() => this.startPlayoff(), 250);
      this.pendingStart = false;
    }
  }

  leaveDone() {
    this.divideRestaurants();
  }
}
