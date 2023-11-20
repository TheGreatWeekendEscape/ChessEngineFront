import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StompWebSocketService } from '../stomp-websocket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  title = 'websocket-frontend';
  input;
  constructor(public messageService: StompWebSocketService) {}
  sendMessage() {
    if (this.input) {
      this.messageService.sendMessage(this.input);
      this.input = '';
    }
  }

}
