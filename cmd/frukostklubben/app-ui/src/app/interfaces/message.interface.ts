export interface User {
  name: string;
  color?: string;
  showHelmet?: boolean;
}

export enum MessageTypes {
  CHAT_MESSAGE = 0,
  JOIN_MESSAGE = 1,
  LEAVE_MESSAGE = 2,
  READY_MESSAGE = 3,
}

export interface Message {
  type: MessageTypes;
  payload: string;
}

export interface ChatMessage {
  author: User;
  timestamp: string;
  message: string;
}

export interface ReadyMessage {
  chatReady: boolean;
}

export interface JoinMessage {
  user: User;
}

export interface LeaveMessage {
  user: User;
}

export function isReadyMessage(
  type: MessageTypes,
  payload: any
): payload is ReadyMessage {
  return type == MessageTypes.READY_MESSAGE;
}

export function isChatMessage(
  type: MessageTypes,
  payload: any
): payload is ChatMessage {
  return type == MessageTypes.CHAT_MESSAGE;
}

export function isJoinMessage(
  type: MessageTypes,
  payload: any
): payload is ChatMessage {
  return type == MessageTypes.JOIN_MESSAGE;
}

export function isLeaveMessage(
  type: MessageTypes,
  payload: any
): payload is ChatMessage {
  return type == MessageTypes.LEAVE_MESSAGE;
}
