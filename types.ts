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
  apparent_temperature?: number;
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  weathercode: number[];
  uv_index?: number[];
  visibility?: number[];
  surface_pressure?: number[];
  cloud_cover?: number[];
  precipitation_probability: number[];
  windspeed_10m?: number[];
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  precipitation_probability_max: number[];
  precipitation_sum?: number[];
  windspeed_10m_max?: number[];
  uv_index_max?: number[];
}

export interface AirQuality {
  us_aqi: number;
  pm2_5: number;
  uv_index?: number;
  alder_pollen?: number;
  birch_pollen?: number;
  grass_pollen?: number;
  mugwort_pollen?: number;
  olive_pollen?: number;
  ragweed_pollen?: number;
}

export interface WeatherData {
  current_weather: CurrentWeather;
  hourly: HourlyForecast;
  daily: DailyForecast;
  air_quality?: AirQuality;
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
export type WindUnit = 'km/h' | 'mph' | 'm/s';
export type PressureUnit = 'hPa' | 'inHg';
export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange';

export interface Favorite {
  name: string;
  latitude: number;
  longitude: number;
}

export interface ChangelogPost {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: {
    type: 'feature' | 'improvement' | 'fix';
    text: string;
  }[];
}

export interface AppContextType {
  unit: Unit;
  setUnit: (u: Unit) => void;
  windUnit: WindUnit;
  setWindUnit: (u: WindUnit) => void;
  pressureUnit: PressureUnit;
  setPressureUnit: (u: PressureUnit) => void;
  themeColor: ThemeColor;
  setThemeColor: (c: ThemeColor) => void;
  isDay: boolean;
  setIsDay: (d: boolean) => void;
  favorites: Favorite[];
  addFavorite: (f: Favorite) => void;
  removeFavorite: (name: string) => void;
  activeLocation: Favorite | null;
  setActiveLocation: (f: Favorite | null) => void;
}