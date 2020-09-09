import { Injectable } from '@angular/core';
import { ChatMessage } from '../components/chat-message/chat-message.component';
import { User } from '../components/user-section/user-section.component';

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

  public onMessage(callback: (message: ChatMessage) => void) {
    astilectron.onMessage(callback);
  }

  public sendChatMessage(message: ChatMessage) {
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
}
