import { Component, OnInit } from '@angular/core';

export interface User {
  name: string;
  color?: string;
}

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss'],
})
export class UserSectionComponent implements OnInit {
  users: Array<User> = [
    { name: 'Ogge', color: 'cyan' },
    { name: 'Fredde', color: 'yellow' },
    { name: 'Temmel', color: 'red' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
