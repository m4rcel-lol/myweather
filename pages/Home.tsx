import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchWeather, getCityNameFromCoords, fetchIpLocation } from '../services/api';
import { WeatherData, GeoLocation, AppContextType } from '../types';
import { CurrentCard } from '../components/CurrentCard';
import { ForecastList } from '../components/ForecastList';
import { WeatherChart } from '../components/WeatherChart';
import { HourlyForecast } from '../components/HourlyForecast';
import { SearchBar } from '../components/SearchBar';
import { EnvironmentalCards } from '../components/EnvironmentalCards';
import { SmartAssistant } from '../components/SmartAssistant';
import { AstronomyCard } from '../components/AstronomyCard';
import { PollenCard } from '../components/PollenCard';
import { Loader2, AlertTriangle, X } from 'lucide-react';

export const Home: React.FC = () => {
  const { isDay, setIsDay, unit, favorites, addFavorite, removeFavorite, activeLocation, setActiveLocation } = useOutletContext<AppContextType>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('New York');
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);

  const loadWeather = async (lat: number, lon: number, name?: string, isBackground: boolean = false) => {
    if (!isBackground) {
        setLoading(true);
        setError(null);
    }
    
    try {
      const data = await fetchWeather(lat, lon);
      setWeather(data);
      setIsDay(!!data.current_weather.is_day);
      setCoords({lat, lon});
      setShowAlert(true); // Reset alert visibility on new load
      
      if (name) {
        setLocationName(name);
      } else {
        const detectedName = await getCityNameFromCoords(lat, lon);
        setLocationName(detectedName);
      }
    } catch (err) {
      if (!isBackground) setError("Failed to load weather data.");
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    const initLocation = async () => {
        try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
            });
            loadWeather(pos.coords.latitude, pos.coords.longitude);
            return;
        } catch (e) {
            console.log("GPS unavailable or denied, attempting IP fallback...");
        }

        try {
            const ipData = await fetchIpLocation();
            loadWeather(ipData.latitude, ipData.longitude, ipData.city);
        } catch (e) {
            console.error("IP Location failed", e);
            loadWeather(51.5074, -0.1278, "London");
        }
    };

    if (!activeLocation) {
        initLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen to activeLocation changes from sidebar
  useEffect(() => {
    if (activeLocation) {
        loadWeather(activeLocation.latitude, activeLocation.longitude, activeLocation.name);
    }
  }, [activeLocation]);

  // Auto-refresh interval (every 2 minutes)
  useEffect(() => {
    if (!coords) return;

    const intervalId = setInterval(() => {
        // Background refresh - doesn't show loading spinner
        loadWeather(coords.lat, coords.lon, locationName, true);
    }, 120000); // 2 minutes

    return () => clearInterval(intervalId);
  }, [coords, locationName]);

  const handleLocationSelect = (loc: GeoLocation) => {
    loadWeather(loc.latitude, loc.longitude, loc.name);
    setActiveLocation(null); // Clear selection so it doesn't fight with next search
  };

  const isFavorite = favorites.some(f => f.name === locationName);
  
  const toggleFavorite = () => {
      if (isFavorite) {
          removeFavorite(locationName);
      } else if (coords) {
          addFavorite({
              name: locationName,
              latitude: coords.lat,
              longitude: coords.lon
          });
      }
  };

  // Severe Weather Check
  const getAlert = (): { title: string, desc: string, color: string } | null => {
      if (!weather) return null;
      const { weathercode, windspeed, temperature } = weather.current_weather;
      const uv = weather.hourly.uv_index?.[new Date().getHours()] || 0;

      if (weathercode >= 95) return { title: 'Storm Warning', desc: 'Thunderstorms detected. Seek shelter immediately.', color: 'bg-red-500' };
      if (windspeed > 40) return { title: 'High Wind Alert', desc: `Wind speeds reaching ${windspeed} km/h. Secure loose objects.`, color: 'bg-orange-600' };
      if (temperature > 35) return { title: 'Heat Advisory', desc: 'Extreme heat detected. Stay hydrated.', color: 'bg-red-500' };
      if (temperature < -10) return { title: 'Freeze Warning', desc: 'Extreme cold. Protect plants and pipes.', color: 'bg-blue-600' };
      if (uv > 8) return { title: 'Extreme UV Alert', desc: 'UV Index is very high. Avoid direct sun.', color: 'bg-purple-600' };
      
      return null;
  };

  const alert = getAlert();

  return (
    <div className="w-full px-4 py-8 animate-fade-in">
      {/* Mobile Header */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
         <div className="md:hidden flex items-center gap-2 self-start mb-2">
            <span className="text-2xl font-semibold text-m3-onSurface">Weather</span>
         </div>
         
         <div className="w-full md:max-w-xl mx-auto z-40">
            <SearchBar onLocationSelect={handleLocationSelect} className="w-full" />
         </div>
      </header>

      {/* Weather Alert Banner */}
      {weather && alert && showAlert && (
          <div className={`mb-8 w-full p-4 rounded-2xl ${alert.color} text-white shadow-lg animate-slide-up flex items-start justify-between`}>
              <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-xl">
                      <AlertTriangle size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-lg">{alert.title}</h3>
                      <p className="opacity-90">{alert.desc}</p>
                  </div>
              </div>
              <button onClick={() => setShowAlert(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
              </button>
          </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-m3-primary">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="text-lg font-medium tracking-wide">Loading forecast...</p>
        </div>
      ) : error ? (
        <div className="text-center text-m3-onError bg-m3-errorContainer p-8 rounded-3xl max-w-lg mx-auto">
            <p className="text-xl font-bold mb-2">Oops!</p>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-m3-surface rounded-full shadow-sm hover:shadow-md transition-all text-m3-onSurface">Retry</button>
        </div>
      ) : weather && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <CurrentCard 
                    weather={weather} 
                    locationName={locationName} 
                    unit={unit} 
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                />
                
                <HourlyForecast weather={weather} unit={unit} />

                <EnvironmentalCards weather={weather} />

                <WeatherChart weather={weather} unit={unit} />
            </div>
            
            <div className="lg:col-span-1 flex flex-col gap-6">
                
                <SmartAssistant weather={weather} unit={unit} />

                <PollenCard weather={weather} />

                <AstronomyCard daily={weather.daily} />

                <ForecastList weather={weather} unit={unit} />
            </div>
        </div>
      )}
    </div>
  );
};