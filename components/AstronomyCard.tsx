import React, { useEffect, useState } from 'react';
import { DailyForecast } from '../types';
import { Sunrise, Sunset, Moon, Clock, Camera } from 'lucide-react';

interface Props {
  daily: DailyForecast;
  className?: string;
}

export const AstronomyCard: React.FC<Props> = ({ daily, className }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const sunrise = new Date(daily.sunrise[0]);
  const sunset = new Date(daily.sunset[0]);
  
  // Golden Hour: ~1 hour after sunrise, ~1 hour before sunset
  const amGoldenEnd = new Date(sunrise.getTime() + 60 * 60 * 1000);
  const pmGoldenStart = new Date(sunset.getTime() - 60 * 60 * 1000);

  // Calculate Daylight Duration
  const diffMs = sunset.getTime() - sunrise.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  // Sun Position Percentage (0 to 1)
  let sunPercent = (now.getTime() - sunrise.getTime()) / (sunset.getTime() - sunrise.getTime());
  sunPercent = Math.max(0, Math.min(1, sunPercent));
  
  // Calculate SVG Arc coordinates for Sun
  const angle = sunPercent * Math.PI;
  const r = 45;
  const cx = 50;
  const cy = 50;
  
  const sx = cx - r * Math.cos(angle);
  const sy = cy - r * Math.sin(angle);

  // Moon Phase
  const getMoonPhase = (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 3) {
        year--;
        month += 12;
    }

    const c = 365.25 * year;
    const e = 30.6 * month;
    const jd = c + e + day - 694039.09;
    const b = jd / 29.53058;
    const phaseIndex = parseInt(b.toString());
    const phase = b - phaseIndex;

    if (phase < 0.03) return { name: 'New Moon', icon: '🌑' };
    if (phase < 0.22) return { name: 'Waxing Crescent', icon: '🌒' };
    if (phase < 0.28) return { name: 'First Quarter', icon: '🌓' };
    if (phase < 0.47) return { name: 'Waxing Gibbous', icon: '🌔' };
    if (phase < 0.53) return { name: 'Full Moon', icon: '🌕' };
    if (phase < 0.72) return { name: 'Waning Gibbous', icon: '🌖' };
    if (phase < 0.78) return { name: 'Last Quarter', icon: '🌗' };
    return { name: 'Waning Crescent', icon: '🌘' };
  };

  const moonPhase = getMoonPhase(new Date());

  return (
    <div className={`material-card p-6 bg-m3-surfaceContainer flex flex-col justify-between ${className} animate-slide-in-right`}>
       <div className="flex items-center justify-between mb-4">
         <h3 className="text-xs font-bold text-m3-onSurfaceVariant uppercase tracking-wider">Astronomy</h3>
         <div className="text-xl">{moonPhase.icon}</div>
       </div>

       {/* Sun Arc Visual */}
       <div className="relative h-24 w-full mb-2">
            <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
                <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 4" />
                {now > sunrise && now < sunset && (
                    <g>
                        <circle cx={sx} cy={sy} r="6" fill="#fbbf24" className="shadow-lg drop-shadow-md" />
                        <circle cx={sx} cy={sy} r="3" fill="#fff" fillOpacity="0.8" />
                    </g>
                )}
            </svg>
            <div className="absolute bottom-0 w-full flex justify-between text-[10px] font-bold text-m3-onSurfaceVariant uppercase">
                <span>Sunrise</span>
                <span>Sunset</span>
            </div>
       </div>

       <div className="space-y-4">
            <div className="flex items-center justify-between">
                 <div className="text-left">
                    <p className="text-base font-semibold text-m3-onSurface">
                        {sunrise.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-base font-semibold text-m3-onSurface">
                        {sunset.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                </div>
            </div>
            
            <div className="w-full h-px bg-m3-outlineVariant/30"></div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                     <div className="flex items-center gap-2 mb-1 text-m3-onSurfaceVariant">
                         <Moon size={14} />
                         <span className="text-xs">Phase</span>
                     </div>
                     <span className="font-semibold text-sm text-m3-onSurface">{moonPhase.name}</span>
                </div>
                <div className="flex flex-col items-end">
                     <div className="flex items-center gap-2 mb-1 text-m3-onSurfaceVariant">
                         <Camera size={14} />
                         <span className="text-xs">Golden Hour</span>
                     </div>
                     <span className="font-semibold text-sm text-m3-onSurface text-right">
                         {pmGoldenStart.toLocaleTimeString([], {hour:'numeric', minute:'2-digit'})}
                     </span>
                </div>
            </div>
       </div>
    </div>
  );
};