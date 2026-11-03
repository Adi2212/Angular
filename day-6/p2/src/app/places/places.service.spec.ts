import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { PlacesService } from './places.service';
import { Place } from './place.model';
import { HttpService } from '../shared/http.service';
import { ErrorService } from '../shared/error.service';

describe('PlacesService with Central HttpService', () => {
  let service: PlacesService;
  let httpTesting: HttpTestingController;
  let httpService: HttpService;
  let errorService: ErrorService;

  const mockPlace: Place = {
    id: 'p1',
    title: 'Forest Waterfall',
    image: { src: 'forest-waterfall.jpg', alt: 'Waterfall' },
    lat: 44.5,
    lon: -80.3,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlacesService,
        HttpService,
        ErrorService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(PlacesService);
    httpService = TestBed.inject(HttpService);
    httpTesting = TestBed.inject(HttpTestingController);
    errorService = TestBed.inject(ErrorService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(httpService).toBeTruthy();
  });

  it('GET /places: should delegate to HttpService and track active loading state', () => {
    expect(httpService.isLoading()).toBe(false);

    service.loadAvailablePlaces().subscribe((places) => {
      expect(places.length).toBe(1);
      expect(places[0].title).toBe('Forest Waterfall');
    });

    expect(httpService.isLoading()).toBe(true);

    const req = httpTesting.expectOne('http://localhost:3000/places');
    expect(req.request.method).toBe('GET');
    req.flush({ places: [mockPlace] });

    expect(httpService.isLoading()).toBe(false);
  });

  it('GET /user-places: should update loadedUserPlaces signal via HttpService', () => {
    service.loadUserPlaces().subscribe((places) => {
      expect(places.length).toBe(1);
      expect(service.loadedUserPlaces().length).toBe(1);
    });

    const req = httpTesting.expectOne('http://localhost:3000/user-places');
    expect(req.request.method).toBe('GET');
    req.flush({ places: [mockPlace] });

    expect(service.loadedUserPlaces().length).toBe(1);
  });

  it('PUT /user-places: should perform optimistic update and rollback on 500 error', () => {
    service.addPlaceToUserPlaces(mockPlace).subscribe({
      error: () => {
        expect(service.loadedUserPlaces().length).toBe(0);
        expect(errorService.error()).toBeTruthy();
      },
    });

    // Optimistically added
    expect(service.loadedUserPlaces().length).toBe(1);

    const req = httpTesting.expectOne('http://localhost:3000/user-places');
    expect(req.request.method).toBe('PUT');
    req.flush('Server Error', { status: 500, statusText: 'Internal Error' });

    expect(service.loadedUserPlaces().length).toBe(0);
  });

  it('DELETE /user-places/:id: should perform optimistic delete and rollback on error', () => {
    // Prime initial list
    service.loadUserPlaces().subscribe();
    httpTesting.expectOne('http://localhost:3000/user-places').flush({ places: [mockPlace] });
    expect(service.loadedUserPlaces().length).toBe(1);

    // Remove
    service.removeUserPlace(mockPlace).subscribe({
      error: () => {
        expect(service.loadedUserPlaces().length).toBe(1);
      },
    });

    // Optimistically removed
    expect(service.loadedUserPlaces().length).toBe(0);

    const req = httpTesting.expectOne('http://localhost:3000/user-places/p1');
    expect(req.request.method).toBe('DELETE');
    req.flush('Error deleting', { status: 500, statusText: 'Internal Error' });

    // Rolled back
    expect(service.loadedUserPlaces().length).toBe(1);
  });
});
