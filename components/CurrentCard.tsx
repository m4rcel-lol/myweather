import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { WeatherData, Unit, AppContextType } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Wind, Droplets, ArrowDown, ArrowUp, ThermometerSun, Star, Navigation } from 'lucide-react';

interface Props {
  weather: WeatherData;
  locationName: string;
  unit: Unit;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const CurrentCard: React.FC<Props> = ({ weather, locationName, unit, isFavorite, onToggleFavorite }) => {
  const { windUnit } = useOutletContext<AppContextType>();
  const current = weather.current_weather;
  const today = weather.daily;

  const temp = (c: number) => unit === 'F' ? Math.round((c * 9/5) + 32) : Math.round(c);

  // Wind conversion
  const formatWind = (speedKmh: number) => {
    if (windUnit === 'mph') return `${Math.round(speedKmh * 0.621371)} mph`;
    if (windUnit === 'm/s') return `${(speedKmh / 3.6).toFixed(1)} m/s`;
    return `${Math.round(speedKmh)} km/h`;
  };

  return (
    <div className="material-card w-full p-8 relative overflow-hidden group bg-m3-surfaceContainer">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        
        {/* Main Info */}
        <div className="flex flex-col gap-1 w-full md:w-auto">
           <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-m3-primaryContainer text-m3-onPrimaryContainer text-xs font-bold uppercase tracking-wider">
                        Current
                    </span>
                    <span className="text-m3-onSurfaceVariant text-sm font-medium">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                </div>
                
                {onToggleFavorite && (
                    <button 
                        onClick={onToggleFavorite}
                        className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-yellow-500 bg-yellow-500/10' : 'text-m3-onSurfaceVariant hover:bg-m3-surfaceContainerHigh'}`}
                    >
                        <Star size={24} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                )}
           </div>
           
           <h2 className="text-3xl md:text-4xl font-semibold text-m3-onSurface tracking-tight">
             {locationName}
           </h2>

           <div className="flex items-center gap-6 mt-6">
                <div className="text-[110px] leading-none font-medium text-m3-onSurface tracking-tighter">
                    {temp(current.temperature)}°
                </div>
                <div className="flex flex-col gap-2">
                    <WeatherIcon code={current.weathercode} isDay={current.is_day} size={64} className="text-m3-primary" />
                    <span className="text-xl font-medium text-m3-onSurfaceVariant capitalize">
                         {current.weathercode === 0 ? 'Clear Sky' : 
                        current.weathercode < 3 ? 'Partly Cloudy' :
                        current.weathercode > 60 ? 'Rainy' : 
                        current.weathercode === 45 ? 'Foggy' : 'Cloudy'}
                    </span>
                </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="w-full md:w-auto grid grid-cols-2 gap-3 min-w-[300px]">
            {/* Stat Item */}
            <div className="bg-m3-surfaceContainerHigh p-4 rounded-[20px] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-m3-onSurfaceVariant mb-1">
                    <Wind size={18} />
                    <span className="text-xs font-bold uppercase">Wind</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-m3-onSurface">
                        {formatWind(current.windspeed)}
                    </span>
                    {current.winddirection !== undefined && (
                        <Navigation 
                            size={16} 
                            className="text-m3-primary transition-transform duration-700"
                            style={{ transform: `rotate(${current.winddirection}deg)` }}
                        />
                    )}
                </div>
            </div>

            <div className="bg-m3-surfaceContainerHigh p-4 rounded-[20px] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-m3-onSurfaceVariant mb-1">
                    <Droplets size={18} />
                    <span className="text-xs font-bold uppercase">Humidity</span>
                </div>
                <span className="text-xl font-semibold text-m3-onSurface">
                    {weather.hourly.relativehumidity_2m[0]}<span className="text-sm font-normal opacity-60">%</span>
                </span>
            </div>

            <div className="bg-m3-surfaceContainerHigh p-4 rounded-[20px] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-m3-onSurfaceVariant mb-1">
                    <ArrowUp size={18} className="text-m3-error" />
                    <span className="text-xs font-bold uppercase">High</span>
                </div>
                <span className="text-xl font-semibold text-m3-onSurface">
                    {temp(today.temperature_2m_max[0])}°
                </span>
            </div>

             <div className="bg-m3-surfaceContainerHigh p-4 rounded-[20px] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-m3-onSurfaceVariant mb-1">
                    <ArrowDown size={18} className="text-m3-primary" />
                    <span className="text-xs font-bold uppercase">Low</span>
                </div>
                <span className="text-xl font-semibold text-m3-onSurface">
                    {temp(today.temperature_2m_min[0])}°
                </span>
            </div>
            
            {current.apparent_temperature !== undefined && (
                <div className="col-span-2 bg-m3-secondaryContainer p-4 rounded-[20px] flex items-center gap-3 text-m3-onSecondaryContainer">
                     <ThermometerSun size={20} />
                     <span className="font-medium">
                        Feels like {temp(current.apparent_temperature)}°
                     </span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};