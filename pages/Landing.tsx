import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Globe, Shield, Smartphone, CloudSun } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white text-[#1f1f1f] font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="w-full px-8 py-6 flex justify-between items-center max-w-[1440px] mx-auto z-50 sticky top-0 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
            <CloudSun className="text-[#0b57d0]" size={32} />
            <span className="text-xl font-medium tracking-tight text-[#444746]">MyWeather</span>
        </div>
        <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
                <Link to="/app/about" className="text-[#444746] hover:text-[#0b57d0] transition-colors text-sm font-medium">About</Link>
                <Link to="/app/developers" className="text-[#444746] hover:text-[#0b57d0] transition-colors text-sm font-medium">Developers</Link>
                <Link to="/app/faq" className="text-[#444746] hover:text-[#0b57d0] transition-colors text-sm font-medium">FAQ</Link>
            </div>
            <Link 
                to="/app/dashboard" 
                className="px-6 py-3 bg-[#0b57d0] text-white rounded-full font-medium text-sm hover:bg-[#0842a0] transition-all shadow-md hover:shadow-lg"
            >
                Launch App
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tight mb-8 leading-[1.1] text-[#1f1f1f]">
                Weather,<br />
                <span className="text-[#0b57d0]">reimagined.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#444746] max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
                A simple, beautiful weather experience designed for clarity.
                No ads. No tracking. Just the forecast.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
                <Link 
                    to="/app/dashboard" 
                    className="w-full sm:w-auto px-8 py-4 bg-[#0b57d0] text-white rounded-full font-medium text-lg hover:bg-[#0842a0] hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                    Get Started
                    <ArrowRight size={20} />
                </Link>
                <Link 
                    to="/app/developers" 
                    className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#0b57d0] border border-[#747775] rounded-full font-medium text-lg hover:bg-[#f0f4f8] hover:border-[#0b57d0] transition-all flex items-center justify-center gap-2"
                >
                    Widgets
                </Link>
            </div>
        </div>
        
        {/* Product Shot */}
        <div className="max-w-6xl mx-auto relative group perspective-1000">
             <div className="absolute inset-x-20 inset-y-10 bg-gradient-to-t from-[#d3e3fd] to-transparent rounded-[60px] blur-3xl -z-10 opacity-60"></div>
             <div className="rounded-[32px] overflow-hidden border border-[#e1e3e1] shadow-2xl bg-[#f8f9fa] transform group-hover:scale-[1.01] transition-transform duration-700 ease-out">
                 <div className="grid grid-cols-1 md:grid-cols-2 p-12 gap-12 items-center">
                      <div className="space-y-6">
                          <div className="w-16 h-16 bg-[#c2e7ff] rounded-2xl flex items-center justify-center text-[#001d35] mb-4">
                             <CloudSun size={32} />
                          </div>
                          <h3 className="text-4xl font-semibold text-[#1f1f1f]">Precise data. <br/>Local privacy.</h3>
                          <p className="text-[#444746] text-lg">
                              We use Open-Meteo's high-precision API to deliver hyperlocal forecasts directly to your browser. Your location data never touches our servers.
                          </p>
                      </div>
                      <div className="relative h-[400px] w-full bg-white rounded-3xl shadow-sm border border-[#e1e3e1] p-6 flex flex-col">
                           <div className="flex justify-between items-center mb-8">
                               <div>
                                   <div className="text-4xl font-semibold text-[#1f1f1f]">72°</div>
                                   <div className="text-[#444746]">San Francisco</div>
                               </div>
                               <CloudSun size={48} className="text-[#fbbc04]" />
                           </div>
                           <div className="space-y-4 mt-auto">
                               <div className="flex justify-between items-center p-4 bg-[#f0f4f8] rounded-xl">
                                   <span className="font-medium text-[#1f1f1f]">Tuesday</span>
                                   <span className="font-medium text-[#1f1f1f]">74° / 60°</span>
                               </div>
                               <div className="flex justify-between items-center p-4 bg-[#f0f4f8] rounded-xl">
                                   <span className="font-medium text-[#1f1f1f]">Wednesday</span>
                                   <span className="font-medium text-[#1f1f1f]">72° / 58°</span>
                               </div>
                           </div>
                      </div>
                 </div>
             </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 px-6 bg-[#f0f4f8]">
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-10 rounded-[32px] bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#e8def8] flex items-center justify-center text-[#65558f] mb-6">
                        <Zap size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-[#1f1f1f]">Instant</h3>
                    <p className="text-[#444746] leading-relaxed">
                        Built with React 19 for zero-latency interactions. Data caches locally for instant load times.
                    </p>
                </div>

                <div className="p-10 rounded-[32px] bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#d3e3fd] flex items-center justify-center text-[#041e49] mb-6">
                        <Smartphone size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-[#1f1f1f]">Adaptive</h3>
                    <p className="text-[#444746] leading-relaxed">
                        A responsive Material Design interface that feels native on every device, from phones to desktops.
                    </p>
                </div>

                <div className="p-10 rounded-[32px] bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#c4eed0] flex items-center justify-center text-[#072711] mb-6">
                        <Shield size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-[#1f1f1f]">Secure</h3>
                    <p className="text-[#444746] leading-relaxed">
                        No trackers. No cookies. No third-party analytics. Just a secure connection to weather satellites.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="font-semibold text-lg text-[#1f1f1f]">Google Style Weather</span>
                </div>
                <p className="text-[#747775] text-sm">© {new Date().getFullYear()} m4rcel-lol.</p>
            </div>
            
            <div className="flex gap-8 text-sm font-medium">
                <a href="https://github.com/m4rcel-lol" target="_blank" rel="noreferrer" className="text-[#444746] hover:text-[#0b57d0] transition-colors">
                    GitHub
                </a>
                <Link to="/app/about" className="text-[#444746] hover:text-[#0b57d0] transition-colors">About</Link>
                <Link to="/app/developers" className="text-[#444746] hover:text-[#0b57d0] transition-colors">API</Link>
            </div>
        </div>
      </footer>
    </div>
  );
};