export type Theme = 'clear-day' | 'clear-night' | 'cloud' | 'fog' | 'rain' | 'snow' | 'storm';

export interface Condition {
  label: string;
  icon: string;
  theme: Theme;
}

/** Maps WMO weather codes (used by Open-Meteo) to a label, icon and colour theme. */
export function describeCode(code: number, isDay = true): Condition {
  if (code === 0) {
    return isDay
      ? { label: 'Clear sky', icon: '☀️', theme: 'clear-day' }
      : { label: 'Clear night', icon: '🌙', theme: 'clear-night' };
  }
  if (code === 1) return { label: 'Mostly clear', icon: isDay ? '🌤️' : '🌙', theme: isDay ? 'clear-day' : 'clear-night' };
  if (code === 2) return { label: 'Partly cloudy', icon: '⛅', theme: 'cloud' };
  if (code === 3) return { label: 'Overcast', icon: '☁️', theme: 'cloud' };
  if (code === 45 || code === 48) return { label: 'Fog', icon: '🌫️', theme: 'fog' };
  if (code >= 51 && code <= 57) return { label: 'Drizzle', icon: '🌦️', theme: 'rain' };
  if (code >= 61 && code <= 67) return { label: 'Rain', icon: '🌧️', theme: 'rain' };
  if (code >= 71 && code <= 77) return { label: 'Snow', icon: '❄️', theme: 'snow' };
  if (code >= 80 && code <= 82) return { label: 'Rain showers', icon: '🌧️', theme: 'rain' };
  if (code === 85 || code === 86) return { label: 'Snow showers', icon: '🌨️', theme: 'snow' };
  if (code >= 95) return { label: 'Thunderstorm', icon: '⛈️', theme: 'storm' };
  return { label: 'Unknown', icon: '🌡️', theme: 'cloud' };
}