import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { Place } from './place.model';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpService = inject(HttpService);

  private userPlaces = signal<Place[]>([]);
  loadedUserPlaces = this.userPlaces.asReadonly();

  /**
   * GET /places
   * Fetches all available global places through the centralized HttpService.
   */
  loadAvailablePlaces(): Observable<Place[]> {
    return this.httpService
      .get<{ places: Place[] }>('/places', {
        customErrorMessage: 'Something went wrong fetching available places. Please try again later.',
      })
      .pipe(map((resData) => resData.places));
  }

  /**
   * GET /user-places
   * Fetches user's saved places and updates the internal reactive signal.
   */
  loadUserPlaces(): Observable<Place[]> {
    return this.httpService
      .get<{ places: Place[] }>('/user-places', {
        customErrorMessage: 'Something went wrong fetching your favorite places. Please try again later.',
      })
      .pipe(
        map((resData) => resData.places),
        tap({
          next: (places) => this.userPlaces.set(places),
        })
      );
  }

  /**
   * PUT /user-places
   * Optimistically adds a place to favorites and syncs via HttpService with automatic rollback.
   */
  addPlaceToUserPlaces(place: Place): Observable<{ userPlaces: Place[] }> {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpService
      .put<{ userPlaces: Place[] }>(
        '/user-places',
        { placeId: place.id },
        {
          customErrorMessage: 'Failed to store selected place. Reverting changes.',
        }
      )
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          return throwError(() => error);
        })
      );
  }

  /**
   * DELETE /user-places/:id
   * Optimistically removes a place from favorites and syncs via HttpService with automatic rollback.
   */
  removeUserPlace(place: Place): Observable<{ userPlaces: Place[] }> {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpService
      .delete<{ userPlaces: Place[] }>(`/user-places/${place.id}`, {
        customErrorMessage: 'Failed to remove selected place. Reverting changes.',
      })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          return throwError(() => error);
        })
      );
  }
}
