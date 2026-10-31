import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  enteredTitle = '';
  enteredRequest = '';

  add = output<{ title: string; request: string }>();

  constructor(private ticketsService: TicketsService) {}

  onSubmit(): void {
    const title = this.enteredTitle.trim();
    const request = this.enteredRequest.trim();

    if (!title || !request) {
      return;
    }

    this.ticketsService.addTicket({ title, request });
    this.add.emit({ title, request });

    this.enteredTitle = '';
    this.enteredRequest = '';
  }
}
