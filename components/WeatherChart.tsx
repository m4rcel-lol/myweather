import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, LineChart, Line } from 'recharts';
import { WeatherData, Unit } from '../types';
import { Thermometer, CloudRain, Wind, Sun } from 'lucide-react';

interface Props {
  weather: WeatherData;
  unit: Unit;
}

export const WeatherChart: React.FC<Props> = ({ weather, unit }) => {
  const [chartType, setChartType] = useState<'temp' | 'rain' | 'wind' | 'uv'>('temp');
  const tempConvert = (c: number) => unit === 'F' ? Math.round((c * 9/5) + 32) : c;

  // Find correct start index
  const getCurrentIndex = () => {
    if (!weather.current_weather?.time || !weather.hourly?.time) return 0;
    const currentStr = weather.current_weather.time;
    
    const exactIndex = weather.hourly.time.indexOf(currentStr);
    if (exactIndex !== -1) return exactIndex;

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

  const data = weather.hourly.time.slice(currentHourIndex, currentHourIndex + 24).map((time, i) => {
      const globalIndex = currentHourIndex + i;
      return {
        time: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        temp: tempConvert(weather.hourly.temperature_2m[globalIndex]),
        rain: weather.hourly.precipitation_probability[globalIndex] || 0,
        wind: weather.hourly.windspeed_10m?.[globalIndex] || 0,
        uv: weather.hourly.uv_index?.[globalIndex] || 0,
      };
  });

  const renderChart = () => {
    switch(chartType) {
        case 'temp':
            return (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--md-sys-color-primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--md-sys-color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="time" stroke="#888" tick={{fontSize: 11}} tickLine={false} axisLine={false} interval={3} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: 'var(--md-sys-color-primary)', fontWeight: 600 }}
                    formatter={(val: number) => [`${Math.round(val)}°${unit}`, 'Temperature']}
                />
                <Area type="monotone" dataKey="temp" stroke="var(--md-sys-color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" animationDuration={1000} />
              </AreaChart>
            );
        case 'rain':
            return (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="time" stroke="#888" tick={{fontSize: 11}} tickLine={false} axisLine={false} interval={3} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#3b82f6', fontWeight: 600 }}
                    formatter={(val: number) => [`${val}%`, 'Rain Chance']}
                />
                <Bar dataKey="rain" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={1000} />
              </BarChart>
            );
        case 'wind':
            return (
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="time" stroke="#888" tick={{fontSize: 11}} tickLine={false} axisLine={false} interval={3} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#14b8a6', fontWeight: 600 }}
                    formatter={(val: number) => [`${val} km/h`, 'Wind Speed']}
                />
                <Line type="monotone" dataKey="wind" stroke="#14b8a6" strokeWidth={3} dot={false} animationDuration={1000} />
              </LineChart>
            );
        case 'uv':
            return (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="time" stroke="#888" tick={{fontSize: 11}} tickLine={false} axisLine={false} interval={3} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#f97316', fontWeight: 600 }}
                    formatter={(val: number) => [`${val.toFixed(1)}`, 'UV Index']}
                />
                <Bar dataKey="uv" fill="#f97316" radius={[4, 4, 0, 0]} animationDuration={1000} />
              </BarChart>
            );
    }
  };

  const ToggleBtn = ({ type, icon: Icon }: any) => (
      <button 
        onClick={() => setChartType(type)}
        className={`p-2 rounded-md transition-all ${chartType === type ? 'bg-m3-surface shadow-sm text-m3-primary' : 'text-m3-onSurfaceVariant hover:text-m3-onSurface'}`}
      >
        <Icon size={18} />
      </button>
  );

  return (
    <div className="material-card w-full p-6 animate-slide-up bg-m3-surfaceContainer" style={{animationDelay: '0.2s'}}>
      <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-m3-onSurface">
                {chartType === 'temp' ? 'Temperature' : chartType === 'rain' ? 'Precipitation' : chartType === 'wind' ? 'Wind Speed' : 'UV Index'}
            </h3>
            <p className="text-xs text-m3-onSurfaceVariant">Next 24 Hours</p>
          </div>
          
          <div className="flex bg-m3-surfaceContainerHigh rounded-lg p-1">
             <ToggleBtn type="temp" icon={Thermometer} />
             <ToggleBtn type="rain" icon={CloudRain} />
             <ToggleBtn type="wind" icon={Wind} />
             <ToggleBtn type="uv" icon={Sun} />
          </div>
      </div>
      
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};