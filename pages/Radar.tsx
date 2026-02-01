import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AppContextType } from '../types';
import { Map, Layers, Loader2 } from 'lucide-react';
import { fetchIpLocation } from '../services/api';

export const Radar: React.FC = () => {
  const { activeLocation } = useOutletContext<AppContextType>();
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);
  
  useEffect(() => {
    // If a favorite is active (selected from sidebar), use that
    if (activeLocation) {
        setCoords({ lat: activeLocation.latitude, lon: activeLocation.longitude });
        return;
    }

    // Otherwise determine user's current location via GPS or IP
    const determineLocation = async () => {
        try {
            // Try GPS
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
            });
            setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        } catch (e) {
            console.log("GPS unavailable in Radar, trying IP fallback...");
            try {
                // Try IP
                const ipLoc = await fetchIpLocation();
                setCoords({ lat: ipLoc.latitude, lon: ipLoc.longitude });
            } catch (err) {
                // Final Fallback to London if everything fails
                setCoords({ lat: 51.5074, lon: -0.1278 });
            }
        }
    };

    determineLocation();
  }, [activeLocation]);

  // Loading state prevents iframe from loading with wrong coords initially
  if (!coords) {
      return (
        <div className="w-full h-[calc(100vh-2rem)] md:h-screen flex flex-col items-center justify-center p-8 animate-fade-in">
             <Loader2 className="animate-spin text-m3-primary mb-4" size={48} />
             <p className="text-m3-onSurfaceVariant font-medium">Acquiring satellite lock...</p>
        </div>
      );
  }

  // RainViewer Embed URL construction
  // loc: lat,lon
  // 8: Zoom Level
  // layer: radar
  const embedUrl = `https://www.rainviewer.com/map.html?loc=${coords.lat},${coords.lon},8&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&c=3&o=83&lm=1&layer=radar&sm=1&sn=1`;

  return (
    <div className="w-full h-[calc(100vh-2rem)] md:h-screen flex flex-col p-4 md:p-8 animate-fade-in pb-24 md:pb-8">
      <div className="mb-6 flex items-center gap-4">
         <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Map size={32} />
         </div>
         <div>
            <h1 className="text-3xl md:text-4xl font-bold text-m3-onSurface">Weather Radar</h1>
            <p className="text-lg text-m3-onSurfaceVariant mt-1">
                Real-time precipitation and satellite imagery.
            </p>
         </div>
      </div>

      <div className="flex-1 w-full bg-m3-surfaceContainer rounded-3xl overflow-hidden border border-m3-outlineVariant/20 relative shadow-xl">
         <iframe 
            src={embedUrl} 
            width="100%" 
            height="100%" 
            className="absolute inset-0 border-0"
            allowFullScreen
         />
         
         <div className="absolute bottom-6 left-6 bg-m3-surface/90 backdrop-blur-md p-3 rounded-xl border border-m3-outline/10 text-xs text-m3-onSurface font-medium flex items-center gap-2 pointer-events-none">
             <Layers size={14} />
             RainViewer Data
         </div>
      </div>
    </div>
  );
};