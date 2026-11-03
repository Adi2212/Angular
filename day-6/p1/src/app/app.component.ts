import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  interval,
  map,
  Observable,
  Subject,
  Subscription,
  tap
} from 'rxjs';

export interface StreamLogItem {
  id: number;
  time: string;
  source: string;
  type: 'next' | 'complete' | 'error' | 'teardown' | 'info';
  value: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  // Active navigation tab
  activeTab = signal<'all' | 'basics' | 'operators' | 'custom' | 'interop' | 'subjects'>('all');

  // ==========================================
  // Lesson 1 & 5: Signals -> Observable Interop
  // ==========================================
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  // Observable piped from Signal and converted back to Signal
  clickCountDoubled$ = this.clickCount$.pipe(
    map((count) => count * 2)
  );
  clickCountDoubled = toSignal(this.clickCountDoubled$, { initialValue: 0 });

  // Filtered observable (only emit when count is even)
  clickCountEven$ = this.clickCount$.pipe(
    filter((count) => count % 2 === 0)
  );
  clickCountEven = toSignal(this.clickCountEven$, { initialValue: 0 });

  // ==========================================
  // Lesson 2 & 6: Observable -> Signal (interval)
  // ==========================================
  // Infinite interval stream converted directly to a Signal
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  // Manual interval with subscription lifecycle management
  manualIntervalValue = signal(0);
  isManualIntervalActive = signal(false);
  private manualIntervalSub?: Subscription;

  // ==========================================
  // Lesson 3: Pipeable Operators (Debounce & Filter)
  // ==========================================
  searchQuery = signal('');
  searchSubject$ = new Subject<string>();
  debouncedSearchValue = signal('');
  searchEmissionsCount = signal(0);

  // Filter & Map Demo
  operatorInputNumber = signal(5);
  operatorMappedResult = signal(10);
  operatorFilterPassed = signal(true);

  // ==========================================
  // Lesson 4: Custom Observable (new Observable())
  // ==========================================
  customStreamStatus = signal<'IDLE' | 'RUNNING' | 'COMPLETED' | 'ERROR' | 'UNSUBSCRIBED'>('IDLE');
  customStreamValue = signal<string>('No emission yet');
  private customStreamSub?: Subscription;

  // ==========================================
  // Lesson 7: Subjects & BehaviorSubjects
  // ==========================================
  // BehaviorSubject retains latest value
  statusBehaviorSubject$ = new BehaviorSubject<string>('🟢 Online - Ready');
  currentStatus = toSignal(this.statusBehaviorSubject$, { initialValue: '🟢 Online - Ready' });

  // Regular Subject (multicast event emitter)
  broadcastSubject$ = new Subject<string>();
  lastBroadcastMessage = signal<string>('No broadcasts yet');

  // ==========================================
  // Real-time Stream Activity Log
  // ==========================================
  streamLogs = signal<StreamLogItem[]>([]);

  ngOnInit(): void {
    // 1. Subscribe to clickCount$ stream and log events
    const clickSub = this.clickCount$.subscribe({
      next: (val) => {
        this.addLog('clickCount$ (toObservable)', 'next', `Signal converted to Observable emitted: ${val}`);
      }
    });

    // 2. Debounced search input stream
    const searchSub = this.searchSubject$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe({
      next: (val) => {
        this.debouncedSearchValue.set(val);
        this.searchEmissionsCount.update((c) => c + 1);
        this.addLog('searchSubject$ (debounceTime 400ms)', 'next', `Debounced value: "${val}"`);
      }
    });

    // 3. Multicast broadcast listener
    const broadcastSub = this.broadcastSubject$.subscribe({
      next: (msg) => {
        this.lastBroadcastMessage.set(msg);
        this.addLog('broadcastSubject$ (Subject)', 'next', `Broadcast received: "${msg}"`);
      }
    });

    // Clean up subscriptions when component is destroyed
    this.destroyRef.onDestroy(() => {
      clickSub.unsubscribe();
      searchSub.unsubscribe();
      broadcastSub.unsubscribe();
      this.stopManualInterval();
      this.stopCustomObservable();
      this.addLog('Lifecycle', 'teardown', 'AppComponent destroyed. All subscriptions safely cleaned up.');
    });

    this.addLog('App Init', 'info', 'AppComponent initialized. Reactive streams active.');
  }

  // --- Click Counter Actions ---
  onClick(): void {
    this.clickCount.update((prev) => prev + 1);
  }

  onResetClick(): void {
    this.clickCount.set(0);
    this.addLog('clickCount', 'info', 'Click counter reset to 0');
  }

  // --- Manual Interval Controls ---
  startManualInterval(): void {
    if (this.isManualIntervalActive()) return;

    this.isManualIntervalActive.set(true);
    this.addLog('Manual interval(1000)', 'info', 'Subscribed to interval(1000).pipe(map(v => v * 2))');

    this.manualIntervalSub = interval(1000).pipe(
      map((val) => val * 2),
      tap((val) => {
        if (val > 0 && val % 10 === 0) {
          this.addLog('interval$.pipe(tap)', 'info', `Milestone tapped at val=${val}`);
        }
      })
    ).subscribe({
      next: (val) => {
        this.manualIntervalValue.set(val);
        this.addLog('Manual interval(1000)', 'next', `Emitted: ${val}`);
      },
      complete: () => {
        this.addLog('Manual interval(1000)', 'complete', 'Stream completed');
      }
    });
  }

  stopManualInterval(): void {
    if (this.manualIntervalSub) {
      this.manualIntervalSub.unsubscribe();
      this.manualIntervalSub = undefined;
      this.isManualIntervalActive.set(false);
      this.addLog('Manual interval(1000)', 'teardown', 'Unsubscribed from manual interval stream.');
    }
  }

  // --- Search Stream Handlers ---
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchQuery.set(value);
    this.searchSubject$.next(value);
  }

  // --- Operators Demo Handler ---
  updateOperatorInput(newVal: number): void {
    this.operatorInputNumber.set(newVal);
    this.operatorMappedResult.set(newVal * 3);
    this.operatorFilterPassed.set(newVal % 2 === 0);
    this.addLog(
      'Operators Lab',
      'next',
      `Input ${newVal} -> map(*3): ${newVal * 3} | filter(isEven): ${newVal % 2 === 0 ? 'PASSED ✅' : 'FILTERED OUT ❌'}`
    );
  }

  // --- Custom Observable (new Observable()) ---
  startCustomObservable(shouldFail = false): void {
    this.stopCustomObservable();

    this.customStreamStatus.set('RUNNING');
    this.customStreamValue.set('Stream starting...');
    this.addLog('new Observable()', 'info', `Observer subscribed (willFail: ${shouldFail})`);

    const custom$ = new Observable<string>((subscriber) => {
      let tick = 0;
      this.addLog('Producer Function', 'info', 'Observable constructor body executing');

      const timer = setInterval(() => {
        tick++;
        if (shouldFail && tick === 3) {
          clearInterval(timer);
          subscriber.error(new Error('Simulated network stream interruption!'));
          return;
        }

        if (tick > 4) {
          clearInterval(timer);
          subscriber.next('Final packet #4 emitted');
          subscriber.complete();
          return;
        }

        subscriber.next(`Data packet #${tick} at ${new Date().toLocaleTimeString()}`);
      }, 1200);

      // Teardown logic
      return () => {
        clearInterval(timer);
        this.addLog('Teardown Function', 'teardown', 'Interval timer cleared during observable teardown');
      };
    });

    this.customStreamSub = custom$.subscribe({
      next: (val) => {
        this.customStreamValue.set(val);
        this.addLog('new Observable()', 'next', val);
      },
      error: (err: Error) => {
        this.customStreamStatus.set('ERROR');
        this.customStreamValue.set(`Error: ${err.message}`);
        this.addLog('new Observable()', 'error', err.message);
      },
      complete: () => {
        this.customStreamStatus.set('COMPLETED');
        this.customStreamValue.set('Stream completed successfully! 🎉');
        this.addLog('new Observable()', 'complete', 'Observable emitted complete notification.');
      }
    });
  }

  stopCustomObservable(): void {
    if (this.customStreamSub) {
      this.customStreamSub.unsubscribe();
      this.customStreamSub = undefined;
      this.customStreamStatus.set('UNSUBSCRIBED');
      this.addLog('new Observable()', 'teardown', 'Manually unsubscribed from custom stream');
    }
  }

  // --- Subject & BehaviorSubject Actions ---
  updateStatus(status: string): void {
    this.statusBehaviorSubject$.next(status);
    this.addLog('BehaviorSubject', 'next', `Status updated: "${status}"`);
  }

  sendBroadcast(message: string): void {
    this.broadcastSubject$.next(message);
  }

  // --- Logger Utilities ---
  addLog(source: string, type: StreamLogItem['type'], value: string): void {
    const item: StreamLogItem = {
      id: Date.now() + Math.random(),
      time: new Date().toLocaleTimeString(),
      source,
      type,
      value
    };
    this.streamLogs.update((logs) => [item, ...logs.slice(0, 39)]);
  }

  clearLogs(): void {
    this.streamLogs.set([]);
  }

  setActiveTab(tab: 'all' | 'basics' | 'operators' | 'custom' | 'interop' | 'subjects'): void {
    this.activeTab.set(tab);
  }
}
