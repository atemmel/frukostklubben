import { Injectable } from '@angular/core';
import { User } from '../components/user-section/user-section.component';
import { Type } from '@angular/compiler/src/core';
import { Message } from '../interfaces/message.interface';

declare var astilectron: any;

@Injectable({
  providedIn: 'root',
})
export class P2pService {
  private loggedInUser: User;

  public ready: boolean = false;

  public readyCallback: () => void;

  constructor() {
    document.addEventListener('astilectron-ready', () => {
      console.log('ready...');

      this.ready = true;
      if (this.readyCallback) this.readyCallback();
    });
  }

  public onMessage(callback: (message: Message) => void) {
    astilectron.onMessage(callback);
  }

  public sendChatMessage(message: Message) {
    astilectron.sendMessage(message);
  }

  get user(): User {
    return this.loggedInUser;
  }

  public addUser(user: User, callback: (usernameTaken: boolean) => void) {
    //handle username checking here...

    this.loggedInUser = user;

    callback(false);
  }

  public sendReadyMessage() {

    astilectron.sendMessage({
      type : 1, 
      payload: JSON.stringify({
        chatReady: true
      })
    });
  }
}
