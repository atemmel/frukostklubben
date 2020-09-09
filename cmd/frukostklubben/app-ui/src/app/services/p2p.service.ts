import { Injectable } from '@angular/core';
import { ChatMessage } from '../components/chat-message/chat-message.component';

declare var astilectron: any;

@Injectable({
  providedIn: 'root',
})
export class P2pService {
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
}
