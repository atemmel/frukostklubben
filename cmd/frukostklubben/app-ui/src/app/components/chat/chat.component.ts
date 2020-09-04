import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  
  messages: Array<ChatMessage> = [];

  constructor() {
    //this.sleep(1).then(() => {
     
  //});
  }

  

  ngOnInit(): void {
    for(var i = 0; i < 30; i++){
      setTimeout(() => {
        console.log("!!!!!!");
        this.addMessage({message:'var?', author: 'Temmel'});
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

