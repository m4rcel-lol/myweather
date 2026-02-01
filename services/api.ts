import { WeatherData, GeoLocation } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1';

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current_weather: 'true',
    hourly: 'temperature_2m,relativehumidity_2m,weathercode',
    daily: 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max',
    timezone: 'auto',
  });

  const response = await fetch(`${BASE_URL}/forecast?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch weather data');
  return response.json();
};

export const searchCity = async (query: string): Promise<GeoLocation[]> => {
  if (query.length < 2) return [];
  const params = new URLSearchParams({
    name: query,
    count: '5',
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`${GEO_URL}/search?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to search city');
  const data = await response.json();
  return data.results || [];
};

export const getCityNameFromCoords = async (lat: number, lon: number): Promise<string> => {
    // Reverse geocoding is not directly supported by Open-Meteo in the same way, 
    // but usually client knows the city if they searched. 
    // For "Current Location", we can't easily get the city name without a reverse geo API.
    // We will use a free reverse geocoding service or just display coords if failed.
    // Using bigdatacloud free api for reverse geocoding as a fallback or similar free ones.
    // Actually, let's just stick to "Your Location" if we rely purely on lat/lon without search,
    // Or use a widely available public API for this.
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data = await response.json();
        return data.city || data.locality || "Your Location";
    } catch (e) {
        return "Unknown Location";
    }
}
