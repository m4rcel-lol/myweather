import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Developers } from './pages/Developers';
import { Embed } from './pages/Embed';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Landing } from './pages/Landing';
import { Changelog } from './pages/Changelog';
import { Settings } from './pages/Settings';
import { Radar } from './pages/Radar';
import { Sidebar } from './components/Sidebar';
import { Unit, WindUnit, PressureUnit, AppContextType, Favorite, ThemeColor } from './types';

// App Layout contains the Sidebar and the dynamic background logic for the Dashboard area
const AppLayout: React.FC = () => {
  const [isDay, setIsDay] = useState(true);
  
  // Settings State with Persistence
  const [unit, setUnit] = useState<Unit>(() => (localStorage.getItem('unit') as Unit) || 'C');
  const [windUnit, setWindUnit] = useState<WindUnit>(() => (localStorage.getItem('windUnit') as WindUnit) || 'km/h');
  const [pressureUnit, setPressureUnit] = useState<PressureUnit>(() => (localStorage.getItem('pressureUnit') as PressureUnit) || 'hPa');
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => (localStorage.getItem('themeColor') as ThemeColor) || 'blue');
  
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [activeLocation, setActiveLocation] = useState<Favorite | null>(null);

  // Load favorites
  useEffect(() => {
    const saved = localStorage.getItem('weather_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Save settings when changed
  useEffect(() => { localStorage.setItem('unit', unit); }, [unit]);
  useEffect(() => { localStorage.setItem('windUnit', windUnit); }, [windUnit]);
  useEffect(() => { localStorage.setItem('pressureUnit', pressureUnit); }, [pressureUnit]);
  useEffect(() => { localStorage.setItem('themeColor', themeColor); }, [themeColor]);
  useEffect(() => { localStorage.setItem('weather_favorites', JSON.stringify(favorites)); }, [favorites]);

  useEffect(() => {
    // Apply Dark Mode class
    if (!isDay) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply Theme Colors
    const root = document.documentElement;
    const themes: Record<ThemeColor, any> = {
        blue: {
            light: { primary: '#0061a4', container: '#d1e4ff' },
            dark: { primary: '#9ecaff', container: '#00497d' }
        },
        purple: {
            light: { primary: '#6750A4', container: '#EADDFF' },
            dark: { primary: '#D0BCFF', container: '#4F378B' }
        },
        green: {
            light: { primary: '#006C4C', container: '#89F8C7' },
            dark: { primary: '#6CDDB3', container: '#005138' }
        },
        orange: {
            light: { primary: '#984816', container: '#FFDBC9' },
            dark: { primary: '#FFB68F', container: '#542200' }
        }
    };

    const t = themes[themeColor];
    if (t) {
        // Light Mode Variables (Default in root)
        // We override the base variables which Tailwind uses via the 'm3' config
        if (isDay) {
             root.style.setProperty('--md-sys-color-primary', t.light.primary);
             root.style.setProperty('--md-sys-color-primary-container', t.light.container);
        } else {
             root.style.setProperty('--md-sys-color-primary', t.dark.primary);
             root.style.setProperty('--md-sys-color-primary-container', t.dark.container);
        }
    }

  }, [isDay, themeColor]);

  const addFavorite = (f: Favorite) => {
    if (!favorites.some(fav => fav.name === f.name)) {
      setFavorites(prev => [...prev, f]);
    }
  };

  const removeFavorite = (name: string) => {
    setFavorites(prev => prev.filter(f => f.name !== name));
  };
  
  const contextValue: AppContextType = {
    unit, setUnit,
    windUnit, setWindUnit,
    pressureUnit, setPressureUnit,
    themeColor, setThemeColor,
    isDay, setIsDay,
    favorites, addFavorite, removeFavorite,
    activeLocation, setActiveLocation
  };

  return (
    <div className="relative min-h-screen bg-m3-background text-m3-onBackground transition-colors duration-300">
      
      <Sidebar 
        unit={unit} 
        toggleUnit={() => setUnit(u => u === 'C' ? 'F' : 'C')} 
        favorites={favorites} 
        setActiveLocation={setActiveLocation} 
      />

      <main className="relative z-10 md:ml-[280px] min-h-screen transition-all duration-300 pb-24 md:pb-0 pt-4 md:pr-4">
         <div className="p-0 max-w-[1600px] mx-auto">
            <Outlet context={contextValue} />
         </div>
      </main>
    </div>
  );
};

// Landing Layout
const LandingLayout: React.FC = () => {
    return (
        <div className="bg-white dark:bg-[#131314] min-h-screen transition-colors duration-300">
             <div className="relative z-10">
                <Outlet />
             </div>
        </div>
    )
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Landing Page Route */}
        <Route element={<LandingLayout />}>
            <Route path="/" element={<Landing />} />
        </Route>

        {/* Main Application Routes (with Sidebar) */}
        <Route path="/app" element={<AppLayout />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="radar" element={<Radar />} />
          <Route path="changelog" element={<Changelog />} />
          <Route path="settings" element={<Settings />} />
          <Route path="developers" element={<Developers />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Standalone Embed Route */}
        <Route path="/embed" element={<Embed />} />
      </Routes>
    </HashRouter>
  );
};

export default App;