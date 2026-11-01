import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, map, Observable, scan, startWith } from 'rxjs';

export interface TickerData {
  symbol: string;
  price: number;
  change: number;
  trend: 'up' | 'down';
  timestamp: Date;
}

export interface AsyncUserData {
  id: string;
  name: string;
  role: string;
  responseTimeMs: number;
}

@Component({
  selector: 'app-async-pipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './async-pipe.component.html',
  styleUrl: './async-pipe.component.css'
})
export class AsyncPipeComponent implements OnInit {
  // Live Observable Stream for ticker
  liveTicker$!: Observable<TickerData[]>;

  // Async Promise
  userPromise$!: Promise<AsyncUserData>;

  ngOnInit() {
    this.initTickerStream();
    this.fetchUserPromise();
  }

  initTickerStream() {
    const basePrices: Record<string, number> = {
      'BTC / USD': 68420.50,
      'ETH / USD': 3450.25,
      'SOL / USD': 178.80
    };

    // Emit simulated updates every 1.5s
    this.liveTicker$ = interval(1500).pipe(
      scan((_acc: TickerData[]): TickerData[] => {
        return Object.keys(basePrices).map((symbol): TickerData => {
          const delta = (Math.random() - 0.48) * (basePrices[symbol] * 0.008);
          basePrices[symbol] = Math.max(10, basePrices[symbol] + delta);
          return {
            symbol,
            price: basePrices[symbol],
            change: delta,
            trend: (delta >= 0 ? 'up' : 'down') as 'up' | 'down',
            timestamp: new Date()
          };
        });
      }, [] as TickerData[]),
      startWith(
        Object.keys(basePrices).map((symbol): TickerData => ({
          symbol,
          price: basePrices[symbol],
          change: 0,
          trend: 'up',
          timestamp: new Date()
        }))
      )
    );
  }

  fetchUserPromise() {
    this.userPromise$ = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'USR-8821',
          name: 'Sarah Connor',
          role: 'Principal Systems Architect',
          responseTimeMs: 340
        });
      }, 1200);
    });
  }

  reloadPromise() {
    this.fetchUserPromise();
  }
}
