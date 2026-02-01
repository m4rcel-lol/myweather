export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  weathercode: number[];
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  precipitation_probability_max: number[];
}

export interface WeatherData {
  current_weather: CurrentWeather;
  hourly: HourlyForecast;
  daily: DailyForecast;
  hourly_units: {
    temperature_2m: string;
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
}

export enum WeatherType {
  Clear = 'Clear',
  Cloudy = 'Cloudy',
  Rain = 'Rain',
  Snow = 'Snow',
  Storm = 'Storm',
  Fog = 'Fog',
}

export interface WidgetConfig {
  location: GeoLocation;
  theme: 'light' | 'dark' | 'auto';
  transparent: boolean;
}

export type Unit = 'C' | 'F';

export interface AppContextType {
  unit: Unit;
  setUnit: (u: Unit) => void;
  isDay: boolean;
  setIsDay: (d: boolean) => void;
}
