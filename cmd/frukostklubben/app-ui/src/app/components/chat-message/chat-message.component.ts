import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { User } from '../user-section/user-section.component';
export interface ChatMessage {
  author: User;
  timestamp: string;
  message: string;
}

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  animations: [
    trigger('entryAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)', 'transform-origin': '0 0' }),
        animate(
          '1000ms',
          style({ opacity: 1, transform: 'scale(1) translateY(0%)' })
        ),
      ]),
    ]),
  ],
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;

  constructor() {}

  ngOnInit(): void {}
}
