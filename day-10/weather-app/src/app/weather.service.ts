import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export type Unit = 'metric' | 'imperial';

export interface Place {
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

export interface DailyForecast {
  date: string;
  code: number;
  max: number;
  min: number;
  rainChance: number;
}

export interface Weather {
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    wind: number;
    precipitation: number;
    code: number;
    isDay: boolean;
  };
  daily: DailyForecast[];
  units: { temp: string; wind: string; rain: string };
}

interface GeoResponse {
  results?: { name: string; admin1?: string; country?: string; latitude: number; longitude: number }[];
}

interface ForecastResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
    is_day: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

// Open-Meteo: free, no API key required.
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  searchPlaces(name: string): Observable<Place[]> {
    const params = new HttpParams().set('name', name).set('count', 5).set('language', 'en');
    return this.http.get<GeoResponse>(GEO_URL, { params }).pipe(
      map((res) =>
        (res.results ?? []).map((r) => ({
          name: r.name,
          region: [r.admin1, r.country].filter(Boolean).join(', '),
          latitude: r.latitude,
          longitude: r.longitude,
        })),
      ),
    );
  }

  getWeather(place: Place, unit: Unit): Observable<Weather> {
    const imperial = unit === 'imperial';
    const params = new HttpParams()
      .set('latitude', place.latitude)
      .set('longitude', place.longitude)
      .set(
        'current',
        'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,is_day',
      )
      .set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max')
      .set('timezone', 'auto')
      .set('forecast_days', 7)
      .set('temperature_unit', imperial ? 'fahrenheit' : 'celsius')
      .set('wind_speed_unit', imperial ? 'mph' : 'kmh')
      .set('precipitation_unit', imperial ? 'inch' : 'mm');

    return this.http.get<ForecastResponse>(FORECAST_URL, { params }).pipe(
      map((r) => ({
        current: {
          temp: Math.round(r.current.temperature_2m),
          feelsLike: Math.round(r.current.apparent_temperature),
          humidity: r.current.relative_humidity_2m,
          wind: Math.round(r.current.wind_speed_10m),
          precipitation: r.current.precipitation,
          code: r.current.weather_code,
          isDay: r.current.is_day === 1,
        },
        daily: r.daily.time.map((date, i) => ({
          date,
          code: r.daily.weather_code[i],
          max: Math.round(r.daily.temperature_2m_max[i]),
          min: Math.round(r.daily.temperature_2m_min[i]),
          rainChance: r.daily.precipitation_probability_max[i] ?? 0,
        })),
        units: {
          temp: imperial ? '°F' : '°C',
          wind: imperial ? 'mph' : 'km/h',
          rain: imperial ? 'in' : 'mm',
        },
      })),
    );
  }
}