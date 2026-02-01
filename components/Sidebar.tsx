import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Code2, User, LayoutDashboard, Thermometer, HelpCircle, ArrowLeft } from 'lucide-react';
import { Unit } from '../types';

interface Props {
  unit: Unit;
  toggleUnit: () => void;
}

export const Sidebar: React.FC<Props> = ({ unit, toggleUnit }) => {
  const navItems = [
    { to: "/app/dashboard", icon: <LayoutDashboard size={20} />, label: "Weather" },
    { to: "/app/developers", icon: <Code2 size={20} />, label: "API & Widgets" },
    { to: "/app/about", icon: <User size={20} />, label: "About Dev" },
    { to: "/app/faq", icon: <HelpCircle size={20} />, label: "FAQ" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 glass-panel border-r border-white/10 z-50 transition-all duration-300 bg-black/10 backdrop-blur-xl">
        <div className="p-8 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-tr from-yellow-400 to-orange-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">MyWeather</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-4">
          <button
            onClick={toggleUnit}
            className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5"
          >
            <div className="flex items-center gap-3">
              <Thermometer size={18} className="text-white/60" />
              <span className="text-sm font-medium">Units</span>
            </div>
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-md">
              °{unit}
            </span>
          </button>

          <Link to="/" className="flex items-center gap-3 p-3 text-white/40 hover:text-white transition-colors text-sm">
             <ArrowLeft size={16} />
             Back to Home
          </Link>
          
          <div className="text-[10px] text-white/30 text-center">
             v1.3.0 • m4rcel-lol
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full glass-panel border-t border-white/10 z-50 pb-safe bg-black/20 backdrop-blur-xl">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  isActive ? 'text-white' : 'text-white/50'
                }`
              }
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
           <button
            onClick={toggleUnit}
             className="flex flex-col items-center gap-1 p-2 rounded-xl text-white/50"
            >
            <span className="text-xs font-bold border border-white/30 rounded px-1">°{unit}</span>
             <span className="text-[10px] font-medium">Units</span>
          </button>
        </div>
      </nav>
    </>
  );
};
