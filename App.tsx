import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Developers } from './pages/Developers';
import { Embed } from './pages/Embed';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Landing } from './pages/Landing';
import { Sidebar } from './components/Sidebar';
import { Unit, AppContextType } from './types';

// App Layout contains the Sidebar and the dynamic background logic for the Dashboard area
const AppLayout: React.FC = () => {
  const [isDay, setIsDay] = useState(true);
  const [unit, setUnit] = useState<Unit>('C');

  useEffect(() => {
    // If it's night, add dark mode class to html
    if (!isDay) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDay]);

  const toggleUnit = () => setUnit(prev => prev === 'C' ? 'F' : 'C');
  
  const contextValue: AppContextType = {
    unit,
    setUnit,
    isDay,
    setIsDay
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-1000 overflow-hidden ${
        isDay 
        ? 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600' 
        : 'bg-gradient-to-br from-gray-900 via-slate-800 to-slate-950'
    }`}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className={`absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] transition-all duration-1000 opacity-60 ${
            isDay ? 'bg-yellow-300/30 animate-pulse' : 'bg-purple-900/40'
         }`}></div>
         <div className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 opacity-50 ${
            isDay ? 'bg-cyan-300/20' : 'bg-blue-900/30'
         }`}></div>
      </div>

      <Sidebar unit={unit} toggleUnit={toggleUnit} />

      <main className="relative z-10 md:ml-64 min-h-screen transition-all duration-300 pb-24 md:pb-0">
         <div className="p-0">
            <Outlet context={contextValue} />
         </div>
      </main>
    </div>
  );
};

// Landing Layout (Simplified background)
const LandingLayout: React.FC = () => {
    return (
        <div className="bg-slate-950 min-h-screen">
             <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]"></div>
             </div>
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
