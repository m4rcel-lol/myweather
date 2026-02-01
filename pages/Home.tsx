import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchWeather, getCityNameFromCoords } from '../services/api';
import { WeatherData, GeoLocation, AppContextType } from '../types';
import { CurrentCard } from '../components/CurrentCard';
import { ForecastList } from '../components/ForecastList';
import { WeatherChart } from '../components/WeatherChart';
import { SearchBar } from '../components/SearchBar';
import { Loader2, Sunrise, Sunset } from 'lucide-react';

export const Home: React.FC = () => {
  const { isDay, setIsDay, unit } = useOutletContext<AppContextType>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('New York');
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async (lat: number, lon: number, name?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(lat, lon);
      setWeather(data);
      setIsDay(!!data.current_weather.is_day);
      
      if (name) {
        setLocationName(name);
      } else {
        const detectedName = await getCityNameFromCoords(lat, lon);
        setLocationName(detectedName);
      }
    } catch (err) {
      setError("Failed to load weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        loadWeather(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        loadWeather(51.5074, -0.1278, "London");
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocationSelect = (loc: GeoLocation) => {
    loadWeather(loc.latitude, loc.longitude, loc.name);
  };

  // Unit conversion helper
  const temp = (c: number) => unit === 'F' ? Math.round((c * 9/5) + 32) : Math.round(c);

  return (
    <div className="w-full px-4 py-8 md:px-8 max-w-7xl mx-auto animate-fade-in">
      {/* Mobile Header (Search is in sidebar on desktop usually, but let's put it here for main content) */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
         <div className="md:hidden flex items-center gap-2 self-start mb-2">
            <span className="text-xl font-bold text-white">Dashboard</span>
         </div>
         
        <div className="w-full md:w-auto md:ml-auto z-40">
            <SearchBar onLocationSelect={handleLocationSelect} className="w-full md:w-96" />
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
            <Loader2 className="animate-spin mb-4 text-white/50" size={48} />
            <p className="text-lg font-light tracking-wide animate-pulse">Scanning atmosphere...</p>
        </div>
      ) : error ? (
        <div className="text-center text-white bg-red-500/20 p-8 rounded-3xl border border-red-500/30 animate-slide-up">
            <p className="text-xl font-bold mb-2">Oops!</p>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">Retry</button>
        </div>
      ) : weather && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <CurrentCard weather={weather} locationName={locationName} unit={unit} />
                
                {/* Highlights Grid */}
                <div className="grid grid-cols-2 gap-4">
                     <div className="glass-panel p-4 rounded-3xl flex items-center justify-between px-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
                        <div>
                            <p className="text-xs text-white/50 uppercase font-bold tracking-wider mb-1">Sunrise</p>
                            <p className="text-xl text-white font-semibold">
                                {new Date(weather.daily.sunrise[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                        </div>
                        <Sunrise className="text-yellow-300" size={32} />
                     </div>
                     <div className="glass-panel p-4 rounded-3xl flex items-center justify-between px-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
                        <div>
                            <p className="text-xs text-white/50 uppercase font-bold tracking-wider mb-1">Sunset</p>
                            <p className="text-xl text-white font-semibold">
                                {new Date(weather.daily.sunset[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                        </div>
                        <Sunset className="text-orange-300" size={32} />
                     </div>
                </div>

                <WeatherChart weather={weather} unit={unit} />
            </div>
            
            <div className="lg:col-span-1">
                <ForecastList weather={weather} unit={unit} />
            </div>
        </div>
      )}
    </div>
  );
};
