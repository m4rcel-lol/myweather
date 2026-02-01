import React from 'react';
import { WeatherData, Unit } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Clock } from 'lucide-react';

interface Props {
  weather: WeatherData;
  unit: Unit;
}

export const HourlyForecast: React.FC<Props> = ({ weather, unit }) => {
  const tempConvert = (c: number) => unit === 'F' ? Math.round((c * 9/5) + 32) : Math.round(c);
  
  // Find current index based on data time, not system time
  const getCurrentIndex = () => {
    if (!weather.current_weather?.time || !weather.hourly?.time) return 0;
    const currentStr = weather.current_weather.time;
    
    // Try exact
    const exactIndex = weather.hourly.time.indexOf(currentStr);
    if (exactIndex !== -1) return exactIndex;

    // Try fuzzy hour match
    const currentDt = new Date(currentStr);
    currentDt.setMinutes(0, 0, 0);
    const targetTime = currentDt.getTime();

    const fuzzyIndex = weather.hourly.time.findIndex(t => {
        const d = new Date(t);
        d.setMinutes(0, 0, 0);
        return d.getTime() === targetTime;
    });

    return fuzzyIndex !== -1 ? fuzzyIndex : 0;
  };

  const currentHourIndex = getCurrentIndex();
  
  // Get next 24 hours
  const next24Hours = weather.hourly.time
    .slice(currentHourIndex, currentHourIndex + 24)
    .map((t, i) => {
        const globalIndex = currentHourIndex + i;
        return {
            time: t,
            temp: weather.hourly.temperature_2m[globalIndex],
            code: weather.hourly.weathercode[globalIndex],
            isDay: (new Date(t).getHours() > 6 && new Date(t).getHours() < 20) ? 1 : 0 // approximate logic for hourly icons
        }
    });

  return (
    <div className="material-card p-6 bg-m3-surfaceContainer w-full animate-slide-up" style={{animationDelay: '0.1s'}}>
       <div className="flex items-center gap-3 mb-4 text-m3-onSurfaceVariant">
            <Clock size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Hourly Forecast</span>
       </div>
       
       <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x">
          {next24Hours.map((hour, index) => (
             <div 
                key={hour.time} 
                className="flex flex-col items-center min-w-[70px] snap-start"
             >
                 <span className="text-xs font-medium text-m3-onSurfaceVariant mb-3">
                    {index === 0 ? 'Now' : new Date(hour.time).toLocaleTimeString([], {hour: 'numeric', hour12: true})}
                 </span>
                 <WeatherIcon code={hour.code} isDay={hour.isDay} size={28} className="mb-3 text-m3-primary" />
                 <span className="text-lg font-bold text-m3-onSurface">
                    {tempConvert(hour.temp)}°
                 </span>
             </div>
          ))}
       </div>
    </div>
  );
};