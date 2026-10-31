import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketItemComponent } from './ticket/ticket.component';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket, app-tickets',
  standalone: true,
  imports: [CommonModule, NewTicketComponent, TicketItemComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  constructor(private ticketsService: TicketsService) {}

  get tickets(): Ticket[] {
    return this.ticketsService.tickets();
  }

  get openTicketsCount(): number {
    return this.tickets.filter((ticket) => ticket.status === 'open').length;
  }

  get closedTicketsCount(): number {
    return this.tickets.filter((ticket) => ticket.status === 'closed').length;
  }

  onCloseTicket(id: string): void {
    this.ticketsService.closeTicket(id);
  }
}
