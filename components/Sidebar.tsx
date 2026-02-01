import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Code2, User, LayoutDashboard, Thermometer, HelpCircle, ArrowLeft, CloudSun, Star, MapPin, ScrollText, Settings, Map } from 'lucide-react';
import { Unit, AppContextType } from '../types';

interface Props {
  unit: Unit;
  toggleUnit: () => void;
  favorites?: AppContextType['favorites'];
  setActiveLocation?: AppContextType['setActiveLocation'];
}

export const Sidebar: React.FC<Props> = ({ unit, toggleUnit, favorites = [], setActiveLocation }) => {
  const navigate = useNavigate();
  
  const navItems = [
    { to: "/app/dashboard", icon: <LayoutDashboard size={24} />, label: "Weather" },
    { to: "/app/radar", icon: <Map size={24} />, label: "Radar" },
    { to: "/app/settings", icon: <Settings size={24} />, label: "Settings" },
    { to: "/app/changelog", icon: <ScrollText size={24} />, label: "Changelog" },
    { to: "/app/developers", icon: <Code2 size={24} />, label: "API & Widgets" },
    { to: "/app/about", icon: <User size={24} />, label: "About" },
    { to: "/app/faq", icon: <HelpCircle size={24} />, label: "FAQ" },
  ];

  const handleFavoriteClick = (fav: any) => {
    if (setActiveLocation) {
        setActiveLocation(fav);
        navigate('/app/dashboard');
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[280px] h-screen fixed left-0 top-0 bg-m3-surfaceContainerLow z-50 transition-colors duration-300 p-3 overflow-y-auto scrollbar-hide">
        
        {/* Logo Area */}
        <div className="px-6 py-6 mb-2 flex items-center gap-3">
          <div className="text-m3-primary">
            <CloudSun size={32} />
          </div>
          <span className="text-[22px] font-medium text-m3-onSurface tracking-tight">
            MyWeather
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 mb-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-m3-secondaryContainer text-m3-onSecondaryContainer font-semibold'
                    : 'text-m3-onSurfaceVariant hover:bg-m3-surfaceContainerHigh'
                }`
              }
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Favorites Section */}
        {favorites && favorites.length > 0 && (
            <div className="px-4 mb-4">
                <div className="text-xs font-bold text-m3-onSurfaceVariant uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                    <Star size={12} />
                    Saved Locations
                </div>
                <div className="space-y-1">
                    {favorites.map((fav) => (
                        <button
                            key={fav.name}
                            onClick={() => handleFavoriteClick(fav)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-full hover:bg-m3-surfaceContainerHigh transition-colors text-left group"
                        >
                            <div className="p-1.5 bg-m3-secondaryContainer/50 text-m3-onSecondaryContainer rounded-full">
                                <MapPin size={14} />
                            </div>
                            <span className="text-sm font-medium text-m3-onSurface group-hover:text-m3-primary transition-colors truncate">
                                {fav.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Bottom Actions */}
        <div className="p-2 space-y-2 mt-auto">
           {/* Unit Toggle */}
          <button
            onClick={toggleUnit}
            className="flex items-center justify-between w-full px-4 py-3 rounded-full hover:bg-m3-surfaceContainerHigh transition-colors text-m3-onSurface"
          >
            <div className="flex items-center gap-3">
              <Thermometer size={20} className="text-m3-outline" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <span className="text-xs font-bold bg-m3-primary text-m3-onPrimary px-3 py-1 rounded-full">
              °{unit}
            </span>
          </button>

          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-full text-m3-onSurfaceVariant hover:bg-m3-surfaceContainerHigh transition-colors text-sm font-medium">
             <ArrowLeft size={20} />
             Back to Landing
          </Link>
          
          <div className="text-[11px] text-m3-outline text-center py-2 font-medium">
             © 2024 Google Style Weather
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-m3-surfaceContainer text-m3-onSurface border-t border-m3-outline/20 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-start overflow-x-auto p-2 gap-3 scrollbar-hide px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 px-1 rounded-2xl transition-all min-w-[72px] flex-shrink-0 ${
                  isActive 
                  ? 'text-m3-onSurface font-medium' 
                  : 'text-m3-onSurfaceVariant opacity-70'
                }`
              }
            >
              <div className={({ isActive }) => isActive ? "bg-m3-secondaryContainer text-m3-onSecondaryContainer px-5 py-1 rounded-full" : "px-5 py-1"}>
                 {item.icon}
              </div>
              <span className="text-[10px] mt-1 truncate w-full text-center">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};