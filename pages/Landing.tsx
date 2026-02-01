import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Globe, Shield, Layout, Smartphone, Github } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-white overflow-x-hidden relative selection:bg-purple-500/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px]"></div>
      </div>

      {/* Navigation */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto z-50 relative">
        <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-yellow-400 to-orange-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold tracking-tight">MyWeather</span>
        </div>
        <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
                <Link to="/app/about" className="text-white/60 hover:text-white transition-colors text-sm font-medium">About</Link>
                <Link to="/app/developers" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Developers</Link>
                <Link to="/app/faq" className="text-white/60 hover:text-white transition-colors text-sm font-medium">FAQ</Link>
            </div>
            <Link 
                to="/app/dashboard" 
                className="px-6 py-2.5 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
            >
                Launch App
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium mb-8 animate-fade-in backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="bg-gradient-to-r from-emerald-200 to-green-100 bg-clip-text text-transparent font-bold">Live on Vercel</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] animate-slide-up">
                Forecasts without <br />
                <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">compromise.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 animate-slide-up leading-relaxed" style={{animationDelay: '0.1s'}}>
                The most beautiful, privacy-focused weather experience. <br className="hidden md:block"/>
                Open source, ad-free, and available via API.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up mb-24" style={{animationDelay: '0.2s'}}>
                <Link 
                    to="/app/dashboard" 
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group border border-white/10"
                >
                    Get Started
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                    to="/app/developers" 
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                    <Layout size={20} />
                    Widget Studio
                </Link>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative max-w-5xl mx-auto animate-slide-up perspective-1000" style={{animationDelay: '0.3s'}}>
                 {/* Glow behind dashboard */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/30 rounded-full blur-[100px] -z-10"></div>
                 
                 <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a]/80 backdrop-blur-xl group hover:scale-[1.01] transition-transform duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20"></div>
                    
                    {/* Mock Browser Header */}
                    <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="ml-4 px-4 py-1.5 bg-black/20 rounded-md text-xs text-white/30 font-mono w-64 flex items-center justify-between">
                            <span>myweather.m5rcel.work</span>
                            <Shield size={10} />
                        </div>
                    </div>

                    {/* Mock Content */}
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="md:col-span-2 h-64 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/5 p-6 flex flex-col justify-between">
                             <div className="flex justify-between items-start">
                                <div>
                                    <div className="h-8 w-48 bg-white/10 rounded-lg mb-2"></div>
                                    <div className="h-4 w-24 bg-white/5 rounded-lg"></div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-yellow-400/20"></div>
                             </div>
                             <div className="h-20 w-32 bg-white/10 rounded-lg"></div>
                        </div>
                        <div className="h-64 rounded-2xl bg-white/5 border border-white/5 p-6 space-y-4">
                            <div className="h-8 w-full bg-white/10 rounded-lg"></div>
                            <div className="h-8 w-full bg-white/5 rounded-lg"></div>
                            <div className="h-8 w-full bg-white/5 rounded-lg"></div>
                            <div className="h-8 w-full bg-white/5 rounded-lg"></div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineered for performance</h2>
                <p className="text-white/50">Everything you need, nothing you don't.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-300 mb-6 group-hover:scale-110 transition-transform">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                    <p className="text-white/60 leading-relaxed">
                        Built with React 19 and Vite. Cached intelligent data fetching ensures instant load times across the globe.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 transition-transform">
                        <Smartphone size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Mobile First</h3>
                    <p className="text-white/60 leading-relaxed">
                        Responsive glassmorphism design that feels native on iOS and Android devices.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-300 mb-6 group-hover:scale-110 transition-transform">
                        <Shield size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Privacy Centric</h3>
                    <p className="text-white/60 leading-relaxed">
                        Your location never leaves your browser. We proxy no data and store no logs.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/20 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="font-bold text-lg">MyWeather</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">v1.3.0</span>
                </div>
                <p className="text-white/40 text-sm">© {new Date().getFullYear()} m4rcel-lol. All rights reserved.</p>
            </div>
            
            <div className="flex gap-8 text-sm font-medium">
                <a href="https://github.com/m4rcel-lol" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
                    <Github size={16} />
                    GitHub
                </a>
                <Link to="/app/about" className="text-white/60 hover:text-white transition-colors">About</Link>
                <Link to="/app/developers" className="text-white/60 hover:text-white transition-colors">API</Link>
            </div>
        </div>
      </footer>
    </div>
  );
};