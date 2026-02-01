import { WeatherData, GeoLocation } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1';
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

// Simple in-memory cache to prevent spamming the API (DDoS protection / Rate Limiting)
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const weatherCache: Record<string, CacheEntry<WeatherData>> = {};
const cityCache: Record<string, CacheEntry<GeoLocation[]>> = {};
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes (Matched to Auto-Refresh interval)

export const fetchIpLocation = async (): Promise<{latitude: number, longitude: number, city: string}> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('IP Location failed');
    const data = await response.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city
    };
  } catch (error) {
    console.warn("Primary IP Geolocation failed, trying backup...");
    // Very simple backup or just throw to let the app handle fallback
    throw error;
  }
};

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  // Create a cache key based on coordinates (rounded to 2 decimal places to group nearby requests)
  const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  
  const cached = weatherCache[cacheKey];
  if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
    return cached.data;
  }

  // 1. Fetch Forecast Data
  const forecastParams = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current_weather: 'true',
    current: 'apparent_temperature,winddirection_10m', // Add feels like and accurate wind dir
    // Added windspeed_10m for hourly charts
    hourly: 'temperature_2m,relativehumidity_2m,weathercode,uv_index,visibility,surface_pressure,cloud_cover,precipitation_probability,windspeed_10m', 
    // Added precipitation_sum, windspeed_10m_max, uv_index_max for detailed daily view
    daily: 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,precipitation_sum,windspeed_10m_max,uv_index_max',
    timezone: 'auto',
  });

  // 2. Fetch Air Quality Data
  const aqiParams = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'us_aqi,pm2_5,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen',
  });

  try {
    const [weatherRes, aqiRes] = await Promise.all([
      fetch(`${BASE_URL}/forecast?${forecastParams.toString()}`),
      fetch(`${AIR_QUALITY_URL}?${aqiParams.toString()}`)
    ]);

    if (!weatherRes.ok) throw new Error('Failed to fetch weather data');
    
    const weatherData = await weatherRes.json();
    let aqiData = null;

    if (aqiRes.ok) {
        aqiData = await aqiRes.json();
    }

    // Merge data
    const mergedData: WeatherData = {
        ...weatherData,
        current_weather: {
            ...weatherData.current_weather,
            apparent_temperature: weatherData.current?.apparent_temperature,
            winddirection: weatherData.current?.winddirection_10m ?? weatherData.current_weather.winddirection,
        },
        air_quality: aqiData ? {
            us_aqi: aqiData.current.us_aqi,
            pm2_5: aqiData.current.pm2_5,
            alder_pollen: aqiData.current.alder_pollen,
            birch_pollen: aqiData.current.birch_pollen,
            grass_pollen: aqiData.current.grass_pollen,
            mugwort_pollen: aqiData.current.mugwort_pollen,
            olive_pollen: aqiData.current.olive_pollen,
            ragweed_pollen: aqiData.current.ragweed_pollen,
        } : undefined
    };

    // Store in cache
    weatherCache[cacheKey] = {
        data: mergedData,
        timestamp: Date.now()
    };

    return mergedData;
  } catch (e) {
      console.error(e);
      throw e;
  }
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