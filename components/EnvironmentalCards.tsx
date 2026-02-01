import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { WeatherData, AppContextType } from '../types';
import { Sun, Eye, Wind, Gauge, Cloud, Info, Droplets } from 'lucide-react';

interface Props {
  weather: WeatherData;
}

export const EnvironmentalCards: React.FC<Props> = ({ weather }) => {
  const { pressureUnit, windUnit } = useOutletContext<AppContextType>();
  const currentHourIndex = new Date().getHours();
  
  // Data extraction
  const uvIndex = weather.hourly.uv_index?.[currentHourIndex] ?? 0;
  const rawVisibility = weather.hourly.visibility?.[currentHourIndex] ?? 10000; // meters
  const rawPressure = weather.hourly.surface_pressure?.[currentHourIndex] ?? 1013; // hPa
  const cloudCover = weather.hourly.cloud_cover?.[currentHourIndex] ?? 0;
  const aqi = weather.air_quality?.us_aqi ?? 0;
  
  // Dew Point Calculation (Approximation)
  // T = Temp (C), RH = Humidity (%)
  const T = weather.hourly.temperature_2m?.[currentHourIndex] ?? 0;
  const RH = weather.hourly.relativehumidity_2m?.[currentHourIndex] ?? 50;
  // Simple approximation: T - ((100 - RH)/5)
  const dewPoint = Math.round(T - ((100 - RH) / 5));

  // Conversions
  // Visibility
  let visibilityDisplay = "";
  if (windUnit === 'mph') {
      // Imperial (Miles)
      const miles = (rawVisibility / 1609.34).toFixed(1);
      visibilityDisplay = `${miles} mi`;
  } else {
      // Metric (km)
      const km = (rawVisibility / 1000).toFixed(1);
      visibilityDisplay = `${km} km`;
  }

  // Pressure
  let pressureDisplay = "";
  if (pressureUnit === 'inHg') {
      pressureDisplay = `${(rawPressure * 0.02953).toFixed(2)} inHg`;
  } else {
      pressureDisplay = `${Math.round(rawPressure)} hPa`;
  }

  // Helpers for styling
  const getAQIStatus = (val: number) => {
    if (val <= 50) return { label: 'Good', color: 'bg-green-500', text: 'text-green-700 dark:text-green-300' };
    if (val <= 100) return { label: 'Moderate', color: 'bg-yellow-500', text: 'text-yellow-700 dark:text-yellow-300' };
    if (val <= 150) return { label: 'Unhealthy for Sensitive', color: 'bg-orange-500', text: 'text-orange-700 dark:text-orange-300' };
    return { label: 'Unhealthy', color: 'bg-red-500', text: 'text-red-700 dark:text-red-300' };
  };

  const getUVStatus = (val: number) => {
    if (val <= 2) return { label: 'Low', color: 'bg-green-500' };
    if (val <= 5) return { label: 'Moderate', color: 'bg-yellow-500' };
    if (val <= 7) return { label: 'High', color: 'bg-orange-500' };
    return { label: 'Very High', color: 'bg-red-500' };
  };

  const aqiStatus = getAQIStatus(aqi);
  const uvStatus = getUVStatus(uvIndex);

  const StatCard = ({ icon: Icon, title, value, sub, progressColor, progressValue, tooltip }: any) => (
    <div className="material-card p-5 flex flex-col justify-between h-44 bg-m3-surfaceContainer relative overflow-visible z-0 hover:z-10 transition-all">
        <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3 text-m3-onSurfaceVariant">
                <Icon size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
            </div>
            {tooltip && (
                <div className="group/tooltip relative ml-2">
                    <Info size={16} className="text-m3-onSurfaceVariant opacity-50 hover:opacity-100 cursor-help transition-opacity" />
                    <div className="absolute right-0 top-6 w-48 p-4 bg-m3-surfaceContainerHigh border border-m3-outlineVariant/20 rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 text-xs text-m3-onSurface backdrop-blur-md">
                       {tooltip}
                    </div>
                </div>
            )}
        </div>
        
        <div>
            <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-medium text-m3-onSurface">{value}</span>
                {sub && <span className="text-sm font-medium text-m3-onSurfaceVariant">{sub}</span>}
            </div>

            {progressValue !== undefined && (
                <div className="w-full h-2 bg-m3-surfaceContainerHigh rounded-full mt-4 overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${progressColor}`} 
                        style={{ width: `${Math.min(progressValue, 100)}%` }}
                    ></div>
                </div>
            )}
        </div>
    </div>
  );

  const uvTooltipContent = (
      <div className="space-y-2">
          <p className="font-bold border-b border-m3-outlineVariant/20 pb-1 mb-1">UV Index Guide</p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <span className="text-green-600 dark:text-green-400 font-medium">0-2</span> <span>Low</span>
              <span className="text-yellow-600 dark:text-yellow-400 font-medium">3-5</span> <span>Moderate</span>
              <span className="text-orange-600 dark:text-orange-400 font-medium">6-7</span> <span>High</span>
              <span className="text-red-600 dark:text-red-400 font-medium">8-10</span> <span>Very High</span>
              <span className="text-purple-600 dark:text-purple-400 font-medium">11+</span> <span>Extreme</span>
          </div>
      </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
      
      {/* Air Quality */}
      <StatCard 
        icon={Wind}
        title="Air Quality"
        value={Math.round(aqi)}
        sub={aqiStatus.label}
        progressColor={aqiStatus.color}
        progressValue={(aqi / 200) * 100}
      />

      {/* UV Index */}
      <StatCard 
        icon={Sun}
        title="UV Index"
        value={uvIndex.toFixed(0)}
        sub={uvStatus.label}
        progressColor={uvStatus.color}
        progressValue={(uvIndex / 11) * 100}
        tooltip={uvTooltipContent}
      />

      {/* Visibility */}
      <StatCard 
        icon={Eye}
        title="Visibility"
        value={visibilityDisplay}
        sub={rawVisibility >= 10000 ? "Clear" : "Hazy"}
      />

      {/* Pressure */}
      <StatCard 
        icon={Gauge}
        title="Pressure"
        value={pressureDisplay}
        sub={rawPressure < 1000 ? "Low" : "High"}
      />

      {/* Cloud Cover */}
      <StatCard 
        icon={Cloud}
        title="Cloud Cover"
        value={`${Math.round(cloudCover)}%`}
        progressColor="bg-m3-secondary"
        progressValue={cloudCover}
      />

      {/* Dew Point */}
      <StatCard 
        icon={Droplets}
        title="Dew Point"
        value={`${dewPoint}°`}
        sub={RH > 70 ? "Humid" : "Dry"}
      />

    </div>
  );
};