import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../ticket.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-item, app-single-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketItemComponent {
  ticket = input.required<Ticket>();
  close = output<string>();
  detailsVisible = false;

  constructor(private ticketsService: TicketsService) {}

  onToggleDetails(): void {
    this.detailsVisible = !this.detailsVisible;
  }

  onCloseTicket(): void {
    this.ticketsService.closeTicket(this.ticket().id);
    this.close.emit(this.ticket().id);
  }
}

// Re-export as TicketComponent for naming compatibility
export { TicketItemComponent as TicketComponent };
