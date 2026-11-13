import { Component, computed, inject, signal } from '@angular/core';
import { WeatherService, Place, Unit, Weather } from './weather.service';
import { describeCode } from './weather.codes';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  private api = inject(WeatherService);

  query = signal('');
  unit = signal<Unit>('metric');
  place = signal<Place | null>(null);
  weather = signal<Weather | null>(null);
  suggestions = signal<Place[]>([]);
  loading = signal(false);
  error = signal('');

  condition = computed(() => {
    const w = this.weather();
    return describeCode(w?.current.code ?? 0, w?.current.isDay ?? true);
  });

  /** Daily rows, with each day's low–high positioned against the week's overall range. */
  days = computed(() => {
    const w = this.weather();
    if (!w) return [];
    const lo = Math.min(...w.daily.map((d) => d.min));
    const hi = Math.max(...w.daily.map((d) => d.max));
    const span = Math.max(hi - lo, 1);
    return w.daily.map((d, i) => ({
      ...d,
      label: i === 0 ? 'Today' : new Date(d.date + 'T00:00').toLocaleDateString(undefined, { weekday: 'short' }),
      condition: describeCode(d.code),
      left: ((d.min - lo) / span) * 100,
      width: Math.max(((d.max - d.min) / span) * 100, 4),
    }));
  });

  constructor() {
    this.selectPlace({ name: 'London', region: 'England, United Kingdom', latitude: 51.5072, longitude: -0.1276 });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const q = this.query().trim();
    if (!q) return;

    this.error.set('');
    this.loading.set(true);
    this.api.searchPlaces(q).subscribe({
      next: (places) => {
        this.loading.set(false);
        if (places.length === 0) {
          this.suggestions.set([]);
          this.error.set(`No places found for “${q}”. Check the spelling or try a nearby city.`);
        } else if (places.length === 1) {
          this.selectPlace(places[0]);
        } else {
          this.suggestions.set(places);
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Couldn’t search right now. Check your connection and try again.');
      },
    });
  }

  selectPlace(place: Place) {
    this.place.set(place);
    this.suggestions.set([]);
    this.query.set('');
    this.load();
  }

  setUnit(unit: Unit) {
    if (unit === this.unit()) return;
    this.unit.set(unit);
    this.load();
  }

  useMyLocation() {
    if (!navigator.geolocation) {
      this.error.set('Your browser doesn’t support location. Search for a city instead.');
      return;
    }
    this.loading.set(true);
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        this.selectPlace({
          name: 'Your location',
          region: '',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      () => {
        this.loading.set(false);
        this.error.set('Location access was blocked. Allow it in your browser settings, or search for a city.');
      },
    );
  }

  private load() {
    const place = this.place();
    if (!place) return;
    this.error.set('');
    this.loading.set(true);
    this.api.getWeather(place, this.unit()).subscribe({
      next: (w) => {
        this.weather.set(w);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Couldn’t load the forecast. Check your connection and try again.');
      },
    });
  }
}