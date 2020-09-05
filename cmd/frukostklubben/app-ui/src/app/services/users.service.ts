import { Injectable } from '@angular/core';
import { User } from '../components/user-section/user-section.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersInChat: Array<User> = [{ name: 'Oscar', color: 'cyan' }, { name: 'Fredde', color: 'Yellow' } ,{ name: 'Isak', color: 'brown'  }, { name: 'Temmel', color: 'teal' }, { name: 'Mona', color: 'blue' } ];

  constructor() { }

  getUsers(): Array<User> {
    return this.usersInChat;
  }
}
