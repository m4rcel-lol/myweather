import React from 'react';
import { WeatherData, Unit } from '../types';
import { Sparkles, Umbrella, Shirt, Sun, Wind, CloudRain, Rocket } from 'lucide-react';

interface Props {
  weather: WeatherData;
  unit: Unit;
}

export const SmartAssistant: React.FC<Props> = ({ weather, unit }) => {
  const current = weather.current_weather;
  const temp = current.temperature; // Celsius
  const precipProb = weather.hourly.precipitation_probability[new Date().getHours()] || 0;
  const windSpeed = current.windspeed;
  const isRainy = current.weathercode >= 61 || precipProb > 40;
  
  let suggestion = "";
  let Icon = Sparkles;
  let color = "text-m3-primary";
  let bg = "bg-m3-primaryContainer";
  let text = "text-m3-onPrimaryContainer";

  if (temp < -50 || windSpeed > 150) {
    // Extreme / Planetary conditions
    suggestion = "Extreme conditions detected. A pressure suit and oxygen supply are mandatory.";
    Icon = Rocket;
    color = "text-red-600 dark:text-red-300";
    bg = "bg-red-100 dark:bg-red-900/40";
    text = "text-red-900 dark:text-red-100";
  } else if (isRainy) {
    suggestion = "It's likely to rain. Don't forget your umbrella!";
    Icon = Umbrella;
    color = "text-blue-600 dark:text-blue-300";
    bg = "bg-blue-100 dark:bg-blue-900/40";
    text = "text-blue-900 dark:text-blue-100";
  } else if (temp < 10) {
    suggestion = "It's quite cold outside. Wear a warm coat and maybe a scarf.";
    Icon = Shirt;
    color = "text-indigo-600 dark:text-indigo-300";
    bg = "bg-indigo-100 dark:bg-indigo-900/40";
    text = "text-indigo-900 dark:text-indigo-100";
  } else if (temp > 25) {
    suggestion = "It's warm! Light clothing, sunglasses, and sunscreen are recommended.";
    Icon = Sun;
    color = "text-orange-600 dark:text-orange-300";
    bg = "bg-orange-100 dark:bg-orange-900/40";
    text = "text-orange-900 dark:text-orange-100";
  } else if (windSpeed > 20) {
    suggestion = "It's breezy today. A windbreaker might be a good choice.";
    Icon = Wind;
    color = "text-teal-600 dark:text-teal-300";
    bg = "bg-teal-100 dark:bg-teal-900/40";
    text = "text-teal-900 dark:text-teal-100";
  } else {
    suggestion = "The weather is mild. Enjoy your day comfortably!";
    Icon = CloudRain; // Generic fallback
    color = "text-m3-primary";
    bg = "bg-m3-primaryContainer";
    text = "text-m3-onPrimaryContainer";
  }

  return (
    <div className="material-card p-6 bg-m3-surfaceContainer flex flex-col justify-center h-full animate-slide-up" style={{animationDelay: '0.4s'}}>
       <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-xl ${bg} ${color}`}>
            <Icon size={24} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-m3-onSurfaceVariant">Daily Insight</span>
       </div>
       <p className={`text-lg font-medium leading-relaxed ${text === "text-m3-onPrimaryContainer" ? "text-m3-onSurface" : "text-m3-onSurface"}`}>
         {suggestion}
       </p>
    </div>
  );
};