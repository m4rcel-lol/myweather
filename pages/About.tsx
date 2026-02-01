import React from 'react';
import { Github, Twitter, Globe, Cpu, Palette, Layout } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 text-white animate-fade-in">
      <div className="mb-12">
         <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Behind the Clouds
         </h1>
         <p className="text-xl text-white/70 max-w-2xl">
            MyWeather is a passion project designed to bring elegance and precision to your daily forecast.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Developer Card */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
             <div className="absolute top-0 right-0 p-32 bg-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
             
             <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-3xl font-bold shadow-xl mb-6">
                    M
                </div>
                <h2 className="text-2xl font-bold mb-2">m4rcel-lol</h2>
                <p className="text-white/60 mb-6">Full Stack Developer & UI Enthusiast. Creating digital experiences that blend form and function.</p>
                
                <div className="flex gap-4">
                    <a href="https://github.com/m4rcel-lol" target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <Twitter size={20} />
                    </a>
                    <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <Globe size={20} />
                    </a>
                </div>
             </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-4">
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors animate-slide-in-right" style={{animationDelay: '0.1s'}}>
                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-300">
                    <Layout size={24} />
                </div>
                <div>
                    <h3 className="font-bold">React 19</h3>
                    <p className="text-sm text-white/50">Modern UI Architecture</p>
                </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors animate-slide-in-right" style={{animationDelay: '0.2s'}}>
                <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-300">
                    <Palette size={24} />
                </div>
                <div>
                    <h3 className="font-bold">Tailwind CSS</h3>
                    <p className="text-sm text-white/50">Utility-first styling & Glassmorphism</p>
                </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors animate-slide-in-right" style={{animationDelay: '0.3s'}}>
                <div className="p-3 bg-green-500/20 rounded-xl text-green-300">
                    <Cpu size={24} />
                </div>
                <div>
                    <h3 className="font-bold">Open-Meteo API</h3>
                    <p className="text-sm text-white/50">High-precision weather data</p>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-12 glass-panel p-8 rounded-3xl text-center">
          <h3 className="text-lg font-semibold mb-4">Why MyWeather?</h3>
          <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">
              Most weather apps are cluttered or track your data. MyWeather is open, privacy-focused, and designed to just work. 
              Using geolocation directly in your browser, we provide accurate forecasts without storing your location on any server.
          </p>
      </div>
    </div>
  );
};
