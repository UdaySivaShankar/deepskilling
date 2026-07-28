import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  providers: [NotificationService] // Component-level provider
})
export class NotificationComponent implements OnInit {
  messages: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.messages = this.notificationService.getMessages();
  }

  simulateNotification() {
    this.notificationService.addMessage('This is a local component notification!');
  }
}
