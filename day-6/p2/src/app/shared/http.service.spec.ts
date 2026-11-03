import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { HttpService } from './http.service';
import { ErrorService } from './error.service';

describe('HttpService (Centralized HTTP Manager)', () => {
  let service: HttpService;
  let httpTesting: HttpTestingController;
  let errorService: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        ErrorService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(HttpService);
    httpTesting = TestBed.inject(HttpTestingController);
    errorService = TestBed.inject(ErrorService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created and have idle loading state initially', () => {
    expect(service).toBeTruthy();
    expect(service.isLoading()).toBe(false);
  });

  it('should resolve relative URLs to the base URL and track isLoading', () => {
    service.get<{ message: string }>('/test-endpoint').subscribe((data) => {
      expect(data.message).toBe('success');
    });

    expect(service.isLoading()).toBe(true);

    const req = httpTesting.expectOne('http://localhost:3000/test-endpoint');
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'success' });

    expect(service.isLoading()).toBe(false);
    expect(service.requestLogs().length).toBe(1);
    expect(service.requestLogs()[0].status).toBe(200);
  });

  it('should support POST request and record logs', () => {
    service.post<{ id: string }>('/items', { name: 'New Item' }).subscribe((res) => {
      expect(res.id).toBe('123');
    });

    const req = httpTesting.expectOne('http://localhost:3000/items');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'New Item' });
    req.flush({ id: '123' });

    expect(service.requestLogs()[0].method).toBe('POST');
  });

  it('should capture HTTP errors and notify ErrorService', () => {
    service.get('/fail-endpoint').subscribe({
      error: (err) => {
        expect(err.message).toBe('Server failed');
      },
    });

    const req = httpTesting.expectOne('http://localhost:3000/fail-endpoint');
    req.flush({ message: 'Server failed' }, { status: 500, statusText: 'Internal Error' });

    expect(errorService.error()).toBe('Server failed');
    expect(service.requestLogs()[0].status).toBe(500);
    expect(service.isLoading()).toBe(false);
  });
});
