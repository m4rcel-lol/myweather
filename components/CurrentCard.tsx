import React from 'react';
import { WeatherData, Unit } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Wind, Droplets, ArrowDown, ArrowUp } from 'lucide-react';

interface Props {
  weather: WeatherData;
  locationName: string;
  unit: Unit;
}

export const CurrentCard: React.FC<Props> = ({ weather, locationName, unit }) => {
  const current = weather.current_weather;
  const today = weather.daily;

  const temp = (c: number) => unit === 'F' ? Math.round((c * 9/5) + 32) : Math.round(c);

  return (
    <div className="w-full p-6 md:p-10 rounded-[2rem] glass-panel text-white relative overflow-hidden group animate-slide-up transition-all hover:shadow-2xl">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] group-hover:bg-yellow-400/30 transition-all duration-1000"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 drop-shadow-md">{locationName}</h2>
          <p className="text-white/80 font-medium text-lg">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="mt-8 flex flex-col items-center md:items-start">
            <div className="flex items-start leading-none">
                <span className="text-8xl md:text-9xl font-bold tracking-tighter drop-shadow-xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                {temp(current.temperature)}
                </span>
                <span className="text-5xl mt-2 font-medium text-white/80">°{unit}</span>
            </div>
            
            <div className="flex items-center gap-3 mt-4 px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
                <WeatherIcon code={current.weathercode} isDay={current.is_day} size={24} className="text-yellow-300 drop-shadow-sm" />
                <span className="text-lg font-medium">
                   {current.weathercode === 0 ? 'Clear Sky' : 
                    current.weathercode < 3 ? 'Partly Cloudy' :
                    current.weathercode > 60 ? 'Rainy' : 
                    current.weathercode === 45 ? 'Foggy' : 'Cloudy'}
                </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px]">
             {/* Stats Column */}
             <div className="p-4 rounded-2xl bg-black/10 hover:bg-black/20 transition-colors backdrop-blur-sm flex items-center justify-between gap-6 border border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-white/10 text-white"><Wind size={22} /></div>
                    <div>
                        <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Wind</p>
                        <p className="font-semibold text-lg">{current.windspeed} <span className="text-sm opacity-60">km/h</span></p>
                    </div>
                </div>
            </div>

             <div className="p-4 rounded-2xl bg-black/10 hover:bg-black/20 transition-colors backdrop-blur-sm flex items-center justify-between gap-6 border border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-white/10 text-white"><Droplets size={22} /></div>
                    <div>
                        <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Humidity</p>
                        <p className="font-semibold text-lg">{weather.hourly.relativehumidity_2m[0]}<span className="text-sm opacity-60">%</span></p>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/10 hover:bg-black/20 transition-colors backdrop-blur-sm border border-white/5">
                <div className="flex items-center justify-around gap-4">
                    <div className="flex flex-col items-center">
                         <div className="flex items-center text-white text-xl">
                            <ArrowUp size={16} className="mr-1 text-red-300" />
                            <span className="font-bold">{temp(today.temperature_2m_max[0])}°</span>
                         </div>
                         <p className="text-[10px] text-white/50 uppercase mt-1">High</p>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                     <div className="flex flex-col items-center">
                         <div className="flex items-center text-white text-xl">
                            <ArrowDown size={16} className="mr-1 text-blue-300" />
                            <span className="font-bold">{temp(today.temperature_2m_min[0])}°</span>
                         </div>
                         <p className="text-[10px] text-white/50 uppercase mt-1">Low</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
