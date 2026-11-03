import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent (Day 6 - RxJS & Observables)', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize clickCount to 0 and increment upon onClick()', fakeAsync(() => {
    expect(component.clickCount()).toBe(0);
    component.onClick();
    tick();
    expect(component.clickCount()).toBe(1);
    expect(component.clickCountDoubled()).toBe(2);
  }));

  it('should reset clickCount to 0 upon onResetClick()', () => {
    component.onClick();
    component.onClick();
    expect(component.clickCount()).toBe(2);
    component.onResetClick();
    expect(component.clickCount()).toBe(0);
  });

  it('should debounce search input events and filter distinct values', fakeAsync(() => {
    expect(component.debouncedSearchValue()).toBe('');
    
    component.searchSubject$.next('angular');
    tick(200);
    // Not yet emitted before 400ms debounce
    expect(component.debouncedSearchValue()).toBe('');

    tick(250); // total 450ms
    expect(component.debouncedSearchValue()).toBe('angular');
  }));

  it('should update status on BehaviorSubject next()', () => {
    component.updateStatus('🟡 Processing Stream...');
    expect(component.currentStatus()).toBe('🟡 Processing Stream...');
  });

  it('should start and complete custom observable stream', fakeAsync(() => {
    component.startCustomObservable(false);
    expect(component.customStreamStatus()).toBe('RUNNING');

    // Fast-forward through timer ticks
    tick(1500 * 5);
    expect(component.customStreamStatus()).toBe('COMPLETED');
  }));

  it('should start and manually stop custom observable stream', () => {
    component.startCustomObservable(false);
    expect(component.customStreamStatus()).toBe('RUNNING');
    component.stopCustomObservable();
    expect(component.customStreamStatus()).toBe('UNSUBSCRIBED');
  });

  it('should support tab navigation', () => {
    component.setActiveTab('operators');
    expect(component.activeTab()).toBe('operators');
    component.setActiveTab('interop');
    expect(component.activeTab()).toBe('interop');
  });
});
