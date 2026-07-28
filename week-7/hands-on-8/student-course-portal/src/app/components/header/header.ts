import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(AuthService);

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  toggleLogin() {
    if (this.isLoggedIn) {
      this.authService.logout();
    } else {
      this.authService.login();
    }
  }
}
