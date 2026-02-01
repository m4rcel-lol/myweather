import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchCity } from '../services/api';
import { GeoLocation } from '../types';

interface Props {
  onLocationSelect: (loc: GeoLocation) => void;
  className?: string;
}

export const SearchBar: React.FC<Props> = ({ onLocationSelect, className }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const locations = await searchCity(query);
        setResults(locations);
        setShowDropdown(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [query]);

  const handleSelect = (loc: GeoLocation) => {
    onLocationSelect(loc);
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-lg"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={18} />
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden z-50 border border-white/20">
          {results.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-black/5 dark:border-white/5 last:border-0"
            >
              <MapPin size={16} className="text-blue-500 dark:text-blue-400" />
              <div>
                <p className="font-medium text-slate-800 dark:text-white leading-tight">{loc.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {[loc.admin1, loc.country].filter(Boolean).join(', ')}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};