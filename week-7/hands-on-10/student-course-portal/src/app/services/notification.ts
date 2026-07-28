import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private messages: string[] = [];

  addMessage(message: string): void {
    this.messages.push(message);
    setTimeout(() => {
      this.messages.shift();
    }, 5000); // Clear after 5 seconds
  }

  getMessages(): string[] {
    return this.messages;
  }
}
