import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user-section/user-section.component';

import {
  trigger,
  transition,
  animate,
  style,
  state,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-user-typing',
  templateUrl: './user-typing.component.html',
  styleUrls: ['./user-typing.component.scss'],
  animations: [
    trigger('jumpAnimation', [
      state('initial', style({ transform: 'translateY(0%)' })),
      state('jump', style({ transform: 'translateY(-75%)' })),
      transition('initial <=> jump', [animate('250ms')]),
    ]),
  ],
})
export class UserTypingComponent implements OnInit {
  @Input() usersTyping: Array<User>;

  dotStates: Array<'initial' | 'jump'> = ['initial', 'initial', 'initial'];

  constructor() {}

  ngOnInit(): void {
    this.dotStates[0] = 'jump';
  }

  animationDone(dotIndex: number) {
    if (this.dotStates[dotIndex] === 'initial') {
      if (dotIndex == 2) this.dotStates[0] = 'jump';
      else this.dotStates[dotIndex + 1] = 'jump';
    } else {
      this.dotStates[dotIndex] = 'initial';
    }
  }
}
