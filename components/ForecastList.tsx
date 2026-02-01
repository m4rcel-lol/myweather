import React from 'react';
import { WeatherData, Unit } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface Props {
  weather: WeatherData;
  unit: Unit;
}

export const ForecastList: React.FC<Props> = ({ weather, unit }) => {
  const daily = weather.daily;
  const temp = (c: number) => unit === 'F' ? Math.round((c * 9/5) + 32) : Math.round(c);

  return (
    <div className="w-full h-full p-6 rounded-3xl glass-panel text-white animate-slide-in-right">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2 opacity-90">
        7-Day Forecast
      </h3>
      <div className="space-y-3">
        {daily.time.map((t, index) => {
          const date = new Date(t);
          const isToday = index === 0;
          return (
            <div 
                key={t} 
                className="flex items-center justify-between hover:bg-white/10 p-3 rounded-2xl transition-all duration-300 group cursor-default"
                style={{ animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`, opacity: 0 }}
            >
              <div className="w-20">
                <p className={`font-semibold text-sm ${isToday ? 'text-blue-200' : 'text-white'}`}>
                  {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                   {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </p>
              </div>
              
              <div className="flex items-center gap-3 flex-1 justify-center">
                 <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors group-hover:scale-110 duration-300">
                    <WeatherIcon code={daily.weathercode[index]} size={20} />
                 </div>
                 {daily.precipitation_probability_max[index] > 20 && (
                     <span className="text-xs text-blue-300 font-bold bg-blue-500/10 px-2 py-0.5 rounded-full">
                        {daily.precipitation_probability_max[index]}%
                     </span>
                 )}
              </div>

              <div className="w-24 flex items-center justify-end gap-3 text-sm">
                <span className="font-bold text-lg">{temp(daily.temperature_2m_max[index])}°</span>
                <span className="text-white/40 font-medium">{temp(daily.temperature_2m_min[index])}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
