import { Component, Input, OnInit } from '@angular/core';
export interface ChatMessage {
  author?: string;
  timestamp?: string;
  message: string;
}

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;

  constructor() {}

  ngOnInit(): void {}
}
