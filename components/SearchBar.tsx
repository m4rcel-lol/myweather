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
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full h-12 bg-m3-surfaceContainerHigh text-m3-onSurface placeholder:text-m3-outline rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-m3-primary transition-all shadow-sm hover:shadow-md border border-transparent"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-m3-onSurfaceVariant" size={20} />
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-m3-surfaceContainerHigh rounded-[20px] shadow-lg overflow-hidden z-50 py-2">
          {results.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-6 py-3 hover:bg-m3-surfaceContainer transition-colors flex items-center gap-4"
            >
              <div className="bg-m3-secondaryContainer p-2 rounded-full text-m3-onSecondaryContainer">
                 <MapPin size={18} />
              </div>
              <div>
                <p className="font-medium text-m3-onSurface leading-tight">{loc.name}</p>
                <p className="text-xs text-m3-onSurfaceVariant">
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