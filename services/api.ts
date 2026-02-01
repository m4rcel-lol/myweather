import { WeatherData, GeoLocation } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1';

// Simple in-memory cache to prevent spamming the API (DDoS protection / Rate Limiting)
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const weatherCache: Record<string, CacheEntry<WeatherData>> = {};
const cityCache: Record<string, CacheEntry<GeoLocation[]>> = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  // Create a cache key based on coordinates (rounded to 2 decimal places to group nearby requests)
  const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  
  const cached = weatherCache[cacheKey];
  if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
    return cached.data;
  }

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
  const data = await response.json();

  // Store in cache
  weatherCache[cacheKey] = {
    data,
    timestamp: Date.now()
  };

  return data;
};

export const searchCity = async (query: string): Promise<GeoLocation[]> => {
  if (query.length < 2) return [];

  const cacheKey = query.toLowerCase();
  const cached = cityCache[cacheKey];
  if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
    return cached.data;
  }

  const params = new URLSearchParams({
    name: query,
    count: '5',
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`${GEO_URL}/search?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to search city');
  const data = await response.json();
  const results = data.results || [];

  cityCache[cacheKey] = {
    data: results,
    timestamp: Date.now()
  };

  return results;
};

export const getCityNameFromCoords = async (lat: number, lon: number): Promise<string> => {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data = await response.json();
        return data.city || data.locality || "Your Location";
    } catch (e) {
        return "Unknown Location";
    }
}