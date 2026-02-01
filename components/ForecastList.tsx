import React, { useState } from 'react';
import { WeatherData, Unit } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { CalendarDays, Droplets, Wind, Sun, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  weather: WeatherData;
  unit: Unit;
}

export const ForecastList: React.FC<Props> = ({ weather, unit }) => {
  const daily = weather.daily;
  const temp = (c: number) => unit === 'F' ? Math.round((c * 9/5) + 32) : Math.round(c);
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
      setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="material-card w-full p-6 animate-slide-up h-full bg-m3-surfaceContainer">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-m3-secondaryContainer p-2 rounded-xl text-m3-onSecondaryContainer">
            <CalendarDays size={20} />
        </div>
        <h3 className="text-lg font-bold text-m3-onSurface">
            7-Day Forecast
        </h3>
      </div>

      <div className="space-y-2">
        {daily.time.map((t, index) => {
          const date = new Date(t);
          const isToday = index === 0;
          const isExpanded = expandedIndex === index;
          
          return (
            <div 
                key={t}
                onClick={() => toggleExpand(index)}
                className={`
                    flex flex-col rounded-2xl transition-all cursor-pointer border border-transparent
                    ${isExpanded ? 'bg-m3-surfaceContainerHigh border-m3-outlineVariant/20 pb-4' : 'hover:bg-m3-surfaceContainerHigh p-3'}
                `}
                style={{ animation: `fadeIn 0.5s ease-out forwards ${index * 0.05}s`, opacity: 0 }}
            >
              {/* Summary Row */}
              <div className={`flex items-center justify-between ${isExpanded ? 'p-3 border-b border-m3-outlineVariant/10 mb-3' : ''}`}>
                  <div className="w-24">
                    <p className={`font-semibold text-sm ${isToday ? 'text-m3-primary' : 'text-m3-onSurface'}`}>
                      {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                    <p className="text-xs text-m3-onSurfaceVariant">
                       {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-1 justify-center">
                     <div className="text-m3-onSurfaceVariant">
                        <WeatherIcon code={daily.weathercode[index]} size={24} />
                     </div>
                     {daily.precipitation_probability_max[index] > 20 && (
                         <span className="text-[10px] font-bold text-m3-primary bg-m3-primaryContainer px-2 py-0.5 rounded-md text-m3-onPrimaryContainer">
                            {daily.precipitation_probability_max[index]}%
                         </span>
                     )}
                  </div>

                  <div className="w-24 flex items-center justify-end gap-3 text-sm">
                    <div className="text-right">
                        <span className="font-bold text-lg text-m3-onSurface block leading-none">{temp(daily.temperature_2m_max[index])}°</span>
                        <span className="text-m3-onSurfaceVariant font-medium text-xs">{temp(daily.temperature_2m_min[index])}°</span>
                    </div>
                    {isExpanded ? <ChevronUp size={16} className="text-m3-onSurfaceVariant"/> : <ChevronDown size={16} className="text-m3-onSurfaceVariant"/>}
                  </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                  <div className="px-4 grid grid-cols-3 gap-2 animate-fade-in">
                      <div className="flex flex-col items-center p-2 rounded-xl bg-m3-surface/50">
                          <Droplets size={14} className="text-blue-500 mb-1" />
                          <span className="text-[10px] uppercase text-m3-onSurfaceVariant font-bold">Rain</span>
                          <span className="text-sm font-semibold text-m3-onSurface">
                              {daily.precipitation_sum?.[index] || 0} mm
                          </span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-xl bg-m3-surface/50">
                          <Wind size={14} className="text-teal-500 mb-1" />
                          <span className="text-[10px] uppercase text-m3-onSurfaceVariant font-bold">Max Wind</span>
                          <span className="text-sm font-semibold text-m3-onSurface">
                              {daily.windspeed_10m_max?.[index] || 0} km/h
                          </span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-xl bg-m3-surface/50">
                          <Sun size={14} className="text-orange-500 mb-1" />
                          <span className="text-[10px] uppercase text-m3-onSurfaceVariant font-bold">Max UV</span>
                          <span className="text-sm font-semibold text-m3-onSurface">
                              {daily.uv_index_max?.[index]?.toFixed(0) || 0}
                          </span>
                      </div>
                  </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};