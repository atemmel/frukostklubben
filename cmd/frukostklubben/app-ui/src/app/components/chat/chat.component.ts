import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../chat-message/chat-message.component';
import { User } from '../user-section/user-section.component';

import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Array<ChatMessage> = [];
  d: string = new Date().toLocaleString();

  usersTyping: Array<User> = [{ name: 'Oscar' }, { name: 'Fredde' }];

  typedMessage: string;
  inputRows: number = 1;

  constructor() {}

  ngOnInit(): void {
    for (var i = 0; i < 30; i++) {
      setTimeout(() => {
        this.d = new Date().toLocaleString();
        console.log(this.d);
        this.addMessage({
          message: 'var?',
          author: 'Temmel',
          timestamp: this.d,
        });
      }, 1000 * i);
    }
  }

  addMessage(message: ChatMessage) {
    this.messages.push(message);
  }

  onTyping() {
    var rows = this.typedMessage.split(/\r\n|\r|\n/).length;

    if (rows > 20) this.inputRows = 20;
    else this.inputRows = rows;

    console.log('Rows: ' + this.inputRows);
  }

  sendMessage(form) {
    console.log('message: ' + this.typedMessage + '---end');
    this.typedMessage = '';
    this.onTyping();

    console.log('--' + this.typedMessage + '----');
  }

  enterSubmit(event, form) {
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage(form);
    }
  }
}
