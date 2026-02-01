import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, Sliders, Layout, Monitor } from 'lucide-react';

export const Developers: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  // Widget Builder State
  const [lat, setLat] = useState('40.7128');
  const [lon, setLon] = useState('-74.0060');
  const [theme, setTheme] = useState('auto');
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('500');

  const iframeSrc = `${window.location.origin}/#/embed?lat=${lat}&lon=${lon}&theme=${theme}`;
  
  const embedCode = `
<iframe 
  src="${iframeSrc}" 
  width="${width}" 
  height="${height}" 
  frameborder="0" 
  style="border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"
></iframe>
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 text-white animate-fade-in pb-24">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold mb-4">
             <Terminal size={12} />
             DEVELOPER PORTAL
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
          Widget Studio
        </h1>
        <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
          Configure, preview, and deploy beautiful weather widgets to your website in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Controls Section */}
            <section className="space-y-6">
                <div className="glass-panel p-6 rounded-3xl animate-slide-up" style={{animationDelay: '0.1s'}}>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                         <Sliders size={20} className="text-blue-300"/>
                         <h2 className="text-xl font-bold">Configuration</h2>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-white/40 uppercase mb-2">Latitude</label>
                                <input 
                                    type="text" 
                                    value={lat} 
                                    onChange={(e) => setLat(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition-colors font-mono text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-white/40 uppercase mb-2">Longitude</label>
                                <input 
                                    type="text" 
                                    value={lon} 
                                    onChange={(e) => setLon(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition-colors font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase mb-2">Theme</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['auto', 'light', 'dark'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`px-4 py-2 rounded-xl text-sm capitalize transition-all border ${
                                            theme === t 
                                            ? 'bg-blue-500/20 border-blue-500/50 text-white' 
                                            : 'bg-black/20 border-white/5 text-white/50 hover:bg-black/30'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-white/40 uppercase mb-2">Height (px)</label>
                                <input 
                                    type="text" 
                                    value={height} 
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition-colors font-mono text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-white/40 uppercase mb-2">Width</label>
                                <input 
                                    type="text" 
                                    value={width} 
                                    onChange={(e) => setWidth(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition-colors font-mono text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Terminal size={20} className="text-green-300"/>
                            <h2 className="text-xl font-bold">Generated Code</h2>
                        </div>
                        <button 
                            onClick={handleCopy}
                            className="flex items-center gap-2 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all"
                        >
                            {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    
                    <div className="bg-black/40 rounded-xl p-4 border border-white/10 overflow-hidden relative group">
                        <pre className="overflow-x-auto text-xs font-mono text-blue-200 leading-relaxed scrollbar-hide">
                            {embedCode}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Preview Section */}
            <section className="glass-panel p-6 rounded-3xl animate-slide-up h-fit" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                     <Monitor size={20} className="text-purple-300"/>
                     <h2 className="text-xl font-bold">Live Preview</h2>
                </div>
                
                <div className="flex justify-center bg-black/20 rounded-2xl p-4 border border-white/5 min-h-[600px] relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 -z-0">
                        <span className="text-sm font-medium">Widget Preview Area</span>
                    </div>
                    <iframe 
                        src={iframeSrc} 
                        width="100%" 
                        height="100%" 
                        className="rounded-2xl shadow-2xl relative z-10"
                        style={{ maxWidth: '400px', height: '600px' }} // Fixed preview size for consistency
                    ></iframe>
                </div>
            </section>
      </div>

       {/* API Docs Link */}
       <div className="mt-12 glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h3 className="text-xl font-bold mb-2">Looking for raw data?</h3>
                <p className="text-white/60">Our widgets are powered by the Open-Meteo REST API.</p>
            </div>
            <a href="https://open-meteo.com/en/docs" target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors border border-white/10">
                Read API Documentation
            </a>
       </div>
    </div>
  );
};
