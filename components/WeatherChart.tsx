import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { WeatherData, Unit } from '../types';

interface Props {
  weather: WeatherData;
  unit: Unit;
}

export const WeatherChart: React.FC<Props> = ({ weather, unit }) => {
  const currentHourIndex = new Date().getHours();
  const tempConvert = (c: number) => unit === 'F' ? Math.round((c * 9/5) + 32) : c;

  const data = weather.hourly.time.slice(currentHourIndex, currentHourIndex + 24).map((time, i) => {
      const globalIndex = currentHourIndex + i;
      return {
        time: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        temp: tempConvert(weather.hourly.temperature_2m[globalIndex]),
      };
  });

  return (
    <div className="w-full h-[320px] p-6 rounded-3xl glass-panel animate-slide-up" style={{animationDelay: '0.2s'}}>
      <h3 className="text-lg font-bold mb-6 text-white opacity-90">Temperature Trend ({unit})</h3>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.4)" 
                tick={{fontSize: 11, fill: 'rgba(255,255,255,0.6)'}}
                tickLine={false}
                axisLine={false}
                interval={3}
            />
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.7)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '16px',
                    color: '#fff',
                    padding: '8px 16px'
                }}
                itemStyle={{ color: '#fbbf24', fontWeight: 600 }}
                formatter={(value: number) => [`${Math.round(value)}°`, 'Temp']}
                labelStyle={{ color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}
            />
            <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="#fbbf24" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTemp)" 
                animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
