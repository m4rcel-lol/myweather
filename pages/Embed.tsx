import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchWeather } from '../services/api';
import { WeatherData } from '../types';
import { WeatherIcon } from '../components/WeatherIcon';
import { Loader2 } from 'lucide-react';

export const Embed: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  
  const lat = parseFloat(params.get('lat') || '40.7128');
  const lon = parseFloat(params.get('lon') || '-74.0060');
  const themeParam = params.get('theme') || 'auto';

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather(lat, lon).then(setWeather).catch(console.error).finally(() => setLoading(false));
  }, [lat, lon]);

  if (loading) return <div className="flex items-center justify-center h-screen bg-transparent"><Loader2 className="animate-spin text-gray-500" /></div>;
  if (!weather) return <div className="p-4 text-center">Error</div>;

  const current = weather.current_weather;
  
  // Theme logic for embed
  const isDay = current.is_day === 1;
  const isDark = themeParam === 'dark' || (themeParam === 'auto' && !isDay);
  
  return (
    <div className={`w-full h-full flex flex-col p-6 overflow-hidden relative ${isDark ? 'text-white' : 'text-slate-800'}`}>
      {/* Background */}
      <div className={`absolute inset-0 -z-10 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-blue-400 to-blue-200'
      }`}></div>

      <div className="flex justify-between items-start">
        <div>
           <h1 className="text-4xl font-bold">{Math.round(current.temperature)}°</h1>
           <p className="opacity-80 mt-1 capitalize">{current.weathercode === 0 ? 'Clear Sky' : 'Partly Cloudy'}</p>
        </div>
        <WeatherIcon code={current.weathercode} isDay={current.is_day} size={48} />
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex justify-between text-sm opacity-70">
            <span>Wind</span>
            <span>{current.windspeed} km/h</span>
        </div>
         <div className="flex justify-between text-sm opacity-70">
            <span>Humidity</span>
            <span>{weather.hourly.relativehumidity_2m[0]}%</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/20">
         <div className="flex justify-between items-center">
            {weather.daily.time.slice(1, 4).map((t, i) => (
                <div key={t} className="flex flex-col items-center">
                    <span className="text-xs opacity-60 mb-1">{new Date(t).toLocaleDateString('en-US', {weekday: 'short'})}</span>
                    <WeatherIcon code={weather.daily.weathercode[i+1]} size={18} />
                    <span className="text-sm font-bold mt-1">{Math.round(weather.daily.temperature_2m_max[i+1])}°</span>
                </div>
            ))}
         </div>
      </div>

      <a href="/#/" target="_blank" className="absolute bottom-2 right-4 text-[10px] opacity-40 hover:opacity-100">
        Powered by MyWeather
      </a>
    </div>
  );
};
