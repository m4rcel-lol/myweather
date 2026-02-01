import { WeatherData, GeoLocation } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1';
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

// Easter Egg Coordinates (Null Island Offset)
const SATURN_COORDS = { lat: 0.1337, lon: 0.1337 };

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

// Saturn Data Generator
const getSaturnData = (): WeatherData => {
  const now = new Date();
  now.setMinutes(0, 0, 0); // Align to top of hour for data matching
  const time = now.toISOString();
  
  // Generate 24h data
  const hourlyTimes = Array.from({length: 24}, (_, i) => {
      const d = new Date(now);
      d.setHours(d.getHours() + i);
      return d.toISOString();
  });

  // Generate 7d data
  const dailyTimes = Array.from({length: 7}, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      return d.toISOString();
  });

  return {
    current_weather: {
      temperature: -178,
      windspeed: 1600,
      winddirection: 45,
      weathercode: 3, // Overcast
      is_day: 1,
      time: time,
      apparent_temperature: -210
    },
    hourly: {
      time: hourlyTimes,
      temperature_2m: new Array(24).fill(-178),
      relativehumidity_2m: new Array(24).fill(100), // Gas giant clouds
      weathercode: new Array(24).fill(3),
      uv_index: new Array(24).fill(0.1), // Far from sun
      visibility: new Array(24).fill(500), // Thick atmosphere
      surface_pressure: new Array(24).fill(100000), // Crushing pressure
      cloud_cover: new Array(24).fill(100),
      precipitation_probability: new Array(24).fill(0), // It rains diamonds, not water, but let's say 0 for water
      windspeed_10m: new Array(24).fill(1600),
      apparent_temperature: new Array(24).fill(-210)
    },
    daily: {
      time: dailyTimes,
      weathercode: new Array(7).fill(3),
      temperature_2m_max: new Array(7).fill(-170),
      temperature_2m_min: new Array(7).fill(-185),
      sunrise: dailyTimes, // 10 hour days, just mock it
      sunset: dailyTimes,
      precipitation_probability_max: new Array(7).fill(0),
      precipitation_sum: new Array(7).fill(0),
      windspeed_10m_max: new Array(7).fill(1800),
      uv_index_max: new Array(7).fill(0)
    },
    air_quality: {
      us_aqi: 500, // Hazardous (Ammonia, Hydrogen)
      pm2_5: 999,
      alder_pollen: 0,
      birch_pollen: 0,
      grass_pollen: 0,
      mugwort_pollen: 0,
      olive_pollen: 0,
      ragweed_pollen: 0,
    },
    hourly_units: { temperature_2m: '°C' },
    daily_units: { temperature_2m_max: '°C', temperature_2m_min: '°C' }
  };
};

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  // Check for Saturn Easter Egg Coordinates (with small epsilon for float precision)
  if (Math.abs(lat - SATURN_COORDS.lat) < 0.0001 && Math.abs(lon - SATURN_COORDS.lon) < 0.0001) {
      return getSaturnData();
  }

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
    // Added windspeed_10m and apparent_temperature for hourly
    hourly: 'temperature_2m,relativehumidity_2m,weathercode,uv_index,visibility,surface_pressure,cloud_cover,precipitation_probability,windspeed_10m,apparent_temperature', 
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

    // Determine apparent temperature fallback if current object is missing or incomplete
    let apparentTemp = weatherData.current?.apparent_temperature;
    
    if (apparentTemp === undefined && weatherData.hourly?.apparent_temperature && weatherData.current_weather?.time) {
        // Fallback to hourly data if current is missing
        const currentTime = weatherData.current_weather.time;
        // Find index matching current time (handling strict ISO string match)
        const hourIndex = weatherData.hourly.time.findIndex((t: string) => t === currentTime);
        if (hourIndex !== -1) {
            apparentTemp = weatherData.hourly.apparent_temperature[hourIndex];
        } else {
             // Fallback to closest hour if exact match fail (e.g. if current_weather time is slightly off, though usually it's aligned)
             // Or just pick the hour based on local time logic
             const currentHour = new Date().getHours(); 
             // Note: this is risky if timezone differs significantly, but better than nothing
             apparentTemp = weatherData.hourly.apparent_temperature[currentHour] ?? weatherData.hourly.apparent_temperature[0];
        }
    }

    // Merge data
    const mergedData: WeatherData = {
        ...weatherData,
        current_weather: {
            ...weatherData.current_weather,
            apparent_temperature: apparentTemp,
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

  // Inject Saturn Easter Egg
  if (query.toLowerCase().trim() === 'saturn') {
      const saturn: GeoLocation = {
          id: 13371337,
          name: 'Saturn',
          latitude: SATURN_COORDS.lat,
          longitude: SATURN_COORDS.lon,
          country: 'Solar System',
          admin1: 'Gas Giant'
      };
      // Add to top of results
      results.unshift(saturn);
  }

  cityCache[cacheKey] = {
    data: results,
    timestamp: Date.now()
  };

  return results;
};

export const getCityNameFromCoords = async (lat: number, lon: number): Promise<string> => {
    // Check Easter Egg
    if (Math.abs(lat - SATURN_COORDS.lat) < 0.0001 && Math.abs(lon - SATURN_COORDS.lon) < 0.0001) {
        return "Saturn";
    }

    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data = await response.json();
        return data.city || data.locality || "Your Location";
    } catch (e) {
        return "Unknown Location";
    }
}