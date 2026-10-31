import { Injectable, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  // In-memory tickets state (localStorage is not used)
  private ticketsSignal = signal<Ticket[]>([
    {
      id: 't1',
      title: 'Fix server database latency',
      request: 'High response latency noticed during query execution on main node.',
      status: 'open'
    },
    {
      id: 't2',
      title: 'Update SSL certificates',
      request: 'SSL certificate for payment gateway expires in two weeks.',
      status: 'open'
    },
    {
      id: 't3',
      title: 'Resolve memory leak in worker',
      request: 'Background queue consumer memory usage increases steadily over 24h.',
      status: 'closed'
    }
  ]);

  readonly tickets = this.ticketsSignal.asReadonly();

  get allTickets(): Ticket[] {
    return this.ticketsSignal();
  }

  getTickets(): Ticket[] {
    return this.ticketsSignal();
  }

  addTicket(ticketData: { title: string; request?: string; text?: string }): Ticket {
    const requestText = ticketData.request || ticketData.text || '';
    const newTicket: Ticket = {
      id: new Date().getTime().toString(),
      title: ticketData.title,
      request: requestText,
      status: 'open'
    };

    this.ticketsSignal.update((currentTickets) => [newTicket, ...currentTickets]);
    return newTicket;
  }

  closeTicket(id: string): void {
    this.ticketsSignal.update((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: 'closed' } : ticket
      )
    );
  }

  markAsCompleted(id: string): void {
    this.closeTicket(id);
  }

  toggleTicketStatus(id: string): void {
    this.ticketsSignal.update((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: ticket.status === 'open' ? 'closed' : 'open' }
          : ticket
      )
    );
  }
}
