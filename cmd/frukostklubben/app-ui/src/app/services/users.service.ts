import { Injectable } from '@angular/core';
import { User } from '../components/user-section/user-section.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersInChat: Array<User> = [{ name: 'Oscar', color: 'cyan' }, { name: 'Fredde', color: 'Yellow' } ,{ name: 'Isak', color: 'brown'  }, { name: 'Temmel', color: 'teal' }, { name: 'Mona', color: 'blue' } ];
  loginUser: User;
  constructor() { }

  getUsers(): Array<User> {
    return this.usersInChat;
  }
  removeUsers(name: string){
    if(this.usersInChat.length !== 0)
    {
      let toRemoveIndex: number;
      for(var i = 0; i < this.usersInChat.length; i++)
      {
        if(this.usersInChat[i].name === name)
        {
          toRemoveIndex = i;
        }
      }
      this.usersInChat.splice(toRemoveIndex, 1);
    }
  }

  addUser(user: User) {
    this.usersInChat.push(user);
  }
}
