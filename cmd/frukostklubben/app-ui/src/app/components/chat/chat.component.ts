import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Array<ChatMessage> = [
    { message: 'yo, fk?', author: 'Ogge' },
    { message: 'aa', author: 'Fredde' },
    { message: 'var?', author: 'Temmel' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
    { message: 'kör spinnern', author: 'Ogge' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
