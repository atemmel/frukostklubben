import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  
  messages: Array<ChatMessage> = [];
  d: string = new Date().toLocaleString();
  
  

  constructor() {
  }

  

  ngOnInit(): void {
    for(var i = 0; i < 30; i++){
      setTimeout(() => {
        this.d = new Date().toLocaleString();
        console.log (this.d);
        this.addMessage({message:'var?', author: 'Temmel',timestamp: this.d });
      }, 1000*i) 
  }
  }

  addMessage(message: ChatMessage) {
    this.messages.push(message);
  }
  
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}

