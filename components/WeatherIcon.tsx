import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, 
  CloudDrizzle, Moon, CloudFog, CloudSun 
} from 'lucide-react';

interface Props {
  code: number;
  isDay?: number; // 1 for day, 0 for night
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<Props> = ({ code, isDay = 1, className = "", size = 24 }) => {
  // WMO Weather interpretation codes (WW)
  // 0: Clear sky
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  // 45, 48: Fog
  // 51, 53, 55: Drizzle
  // 61, 63, 65: Rain
  // 71, 73, 75: Snow
  // 95, 96, 99: Thunderstorm

  if (code === 0) {
    return isDay ? <Sun className={className} size={size} /> : <Moon className={className} size={size} />;
  }
  if (code === 1 || code === 2) {
    return <CloudSun className={className} size={size} />;
  }
  if (code === 3) {
    return <Cloud className={className} size={size} />;
  }
  if (code === 45 || code === 48) {
    return <CloudFog className={className} size={size} />;
  }
  if (code >= 51 && code <= 55) {
    return <CloudDrizzle className={className} size={size} />;
  }
  if (code >= 61 && code <= 67) {
    return <CloudRain className={className} size={size} />;
  }
  if (code >= 71 && code <= 77) {
    return <CloudSnow className={className} size={size} />;
  }
  if (code >= 95) {
    return <CloudLightning className={className} size={size} />;
  }

  return <Sun className={className} size={size} />;
};
