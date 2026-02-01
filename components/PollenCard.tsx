import React from 'react';
import { WeatherData } from '../types';
import { Flower, Sprout, Leaf, AlertCircle } from 'lucide-react';

interface Props {
  weather: WeatherData;
}

export const PollenCard: React.FC<Props> = ({ weather }) => {
  const aq = weather.air_quality;
  
  // If no Air Quality data is returned from API, show unavailable state
  if (!aq) {
      return (
        <div className="material-card p-6 bg-m3-surfaceContainer animate-slide-in-right opacity-60">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-xl">
                    <Flower size={20} />
                </div>
                <h3 className="text-xs font-bold text-m3-onSurfaceVariant uppercase tracking-wider">Pollen & Health</h3>
            </div>
            <div className="flex flex-col items-center justify-center py-4 text-m3-onSurfaceVariant text-sm gap-2">
                <AlertCircle size={24} />
                <span>Data unavailable for this location.</span>
            </div>
        </div>
      );
  }

  // Pollen data
  const pollens = [
    { name: 'Grass', val: aq.grass_pollen ?? 0, icon: Sprout, color: 'text-green-500' },
    { name: 'Ragweed', val: aq.ragweed_pollen ?? 0, icon: Leaf, color: 'text-yellow-500' },
    { name: 'Birch', val: aq.birch_pollen ?? 0, icon: Flower, color: 'text-pink-500' },
    { name: 'Olive', val: aq.olive_pollen ?? 0, icon: Leaf, color: 'text-olive-500' },
  ];

  const getLevel = (val: number) => {
    if (val < 10) return { label: 'Low', color: 'bg-green-500/20 text-green-700 dark:text-green-300' };
    if (val < 30) return { label: 'Moderate', color: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' };
    if (val < 60) return { label: 'High', color: 'bg-orange-500/20 text-orange-700 dark:text-orange-300' };
    return { label: 'Extreme', color: 'bg-red-500/20 text-red-700 dark:text-red-300' };
  };

  return (
    <div className="material-card p-6 bg-m3-surfaceContainer animate-slide-in-right">
       <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 rounded-xl">
             <Flower size={20} />
          </div>
          <h3 className="text-xs font-bold text-m3-onSurfaceVariant uppercase tracking-wider">Pollen & Health</h3>
       </div>

       <div className="grid grid-cols-2 gap-4">
          {pollens.map((p) => {
              const level = getLevel(p.val);
              return (
                <div key={p.name} className="flex flex-col gap-1 p-3 rounded-xl bg-m3-surfaceContainerHigh">
                    <div className="flex items-center gap-2 mb-1">
                        <p.icon size={14} className={p.color} />
                        <span className="text-sm font-medium text-m3-onSurface">{p.name}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md w-fit ${level.color}`}>
                        {level.label}
                    </span>
                </div>
              );
          })}
       </div>
    </div>
  );
};