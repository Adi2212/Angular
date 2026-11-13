import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  readonly query = signal<string>('');

  setQuery(q: string): void {
    this.query.set(q);
  }

  clear(): void {
    this.query.set('');
  }
}
