import { Component, OnInit } from '@angular/core';
import { ChatMessage, Message } from 'src/app/interfaces/message.interface'
import { User } from '../user-section/user-section.component';

import { UsersService } from '../../services/users.service';
import { P2pService } from '../../services/p2p.service';

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
  usersTyping: Array<User> = [{ name: 'Oscar' }, { name: 'Fredde' }];

  typedMessage: string;
  inputRows: number = 1;

  constructor(
    private userService: UsersService,
    private p2pService: P2pService
  ) {}

  ngOnInit(): void {
    console.log('utanför listener');

    if (this.p2pService.ready) this.initListeners();
    else this.p2pService.readyCallback = () => this.initListeners();
    // });

    // for (var i = 0; i < 30; i++) {
    //   setTimeout(() => {
    //     var timeStampForMessage = new Date().toLocaleString();
    //     var random = Math.floor(
    //       Math.random() * this.userService.getUsers().length
    //     );
    //     this.addMessage({
    //       message: 'Hej',
    //       author: this.userService.getUsers()[random],
    //       timestamp: timeStampForMessage,
    //     });
    //   }, 1000 * i);
    // }
  }

  initListeners() {
    console.log('ready.......');

    this.p2pService.sendReadyMessage()

    this.p2pService.onMessage((message: Message) => {
      // Process message
      // console.log(message);

      // console.log(message.payload.message);
      // console.log(message.author.name);
      if (this.isChatMessage(message.type, message.payload))
      {
       this.addMessage(JSON.parse(message.payload));
      }
  
      return 'hej';
    });
  }

  isChatMessage (type: number, payload : any) : payload is ChatMessage {

    return type == 0;
    
  }

  addMessage(message: ChatMessage) {
    this.messages.push(message);
  }

  onTyping() {
    var rows = this.typedMessage.split(/\r\n|\r|\n/).length;

    if (rows > 20) this.inputRows = 20;
    else this.inputRows = rows;

    // console.log('Rows: ' + this.inputRows);
  }

  sendMessage(form) {
    this.onTyping();

    console.log('skickar...');

    this.p2pService.sendChatMessage({
      type: 0,
      payload: JSON.stringify({
        author: { name: this.p2pService.user.name},
        message: this.typedMessage,
        timestamp: new Date().toLocaleString(),
      })
    });

    this.typedMessage = '';
  }

  enterSubmit(event, form) {
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage(form);
    }
  }
}
