import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AppContextType } from '../types';
import { Sliders, Thermometer, Wind, Gauge, Palette } from 'lucide-react';

export const Settings: React.FC = () => {
  const { 
    unit, setUnit, 
    windUnit, setWindUnit, 
    pressureUnit, setPressureUnit,
    themeColor, setThemeColor 
  } = useOutletContext<AppContextType>();

  const SettingSection = ({ title, icon: Icon, children }: any) => (
    <div className="material-card bg-m3-surfaceContainer p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-m3-primaryContainer text-m3-onPrimaryContainer rounded-xl">
                <Icon size={20} />
            </div>
            <h2 className="text-lg font-bold text-m3-onSurface">{title}</h2>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
  );

  const RadioOption = ({ label, value, current, onChange }: any) => (
    <label className="flex items-center justify-between p-4 rounded-xl bg-m3-surfaceContainerHigh hover:bg-m3-surface cursor-pointer transition-colors">
        <span className="font-medium text-m3-onSurface">{label}</span>
        <div className="flex items-center gap-2">
            <span className="text-sm text-m3-onSurfaceVariant font-mono">{value}</span>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${current === value ? 'border-m3-primary' : 'border-m3-outline'}`}>
                {current === value && <div className="w-2.5 h-2.5 rounded-full bg-m3-primary"></div>}
            </div>
        </div>
        <input 
            type="radio" 
            name={label} 
            value={value} 
            checked={current === value} 
            onChange={() => onChange(value)} 
            className="hidden" 
        />
    </label>
  );

  const ColorOption = ({ color, value }: any) => {
      const colors: any = {
          blue: 'bg-blue-600',
          purple: 'bg-purple-600',
          green: 'bg-green-600',
          orange: 'bg-orange-600'
      };
      return (
          <button 
            onClick={() => setThemeColor(value)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${colors[value]} ${themeColor === value ? 'ring-4 ring-offset-2 ring-m3-primary ring-offset-m3-surface' : 'opacity-70 hover:opacity-100'}`}
          >
              {themeColor === value && <div className="w-2 h-2 bg-white rounded-full" />}
          </button>
      );
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 animate-fade-in pb-24">
      <div className="mb-8 flex items-center gap-4">
         <div className="p-4 rounded-2xl bg-m3-secondaryContainer text-m3-onSecondaryContainer">
            <Sliders size={32} />
         </div>
         <div>
            <h1 className="text-4xl font-bold text-m3-onSurface">Settings</h1>
            <p className="text-lg text-m3-onSurfaceVariant mt-1">
                Customize your weather experience.
            </p>
         </div>
      </div>

      <SettingSection title="Appearance" icon={Palette}>
         <div className="p-4 bg-m3-surfaceContainerHigh rounded-xl">
             <label className="block text-sm font-bold text-m3-onSurfaceVariant mb-4">Accent Color</label>
             <div className="flex gap-4">
                 <ColorOption color="blue" value="blue" />
                 <ColorOption color="purple" value="purple" />
                 <ColorOption color="green" value="green" />
                 <ColorOption color="orange" value="orange" />
             </div>
         </div>
      </SettingSection>

      <SettingSection title="Temperature" icon={Thermometer}>
         <RadioOption label="Celsius" value="C" current={unit} onChange={setUnit} />
         <RadioOption label="Fahrenheit" value="F" current={unit} onChange={setUnit} />
      </SettingSection>

      <SettingSection title="Wind Speed" icon={Wind}>
         <RadioOption label="Kilometers per hour" value="km/h" current={windUnit} onChange={setWindUnit} />
         <RadioOption label="Miles per hour" value="mph" current={windUnit} onChange={setWindUnit} />
         <RadioOption label="Meters per second" value="m/s" current={windUnit} onChange={setWindUnit} />
      </SettingSection>

      <SettingSection title="Pressure" icon={Gauge}>
         <RadioOption label="Hectopascals" value="hPa" current={pressureUnit} onChange={setPressureUnit} />
         <RadioOption label="Inches of Mercury" value="inHg" current={pressureUnit} onChange={setPressureUnit} />
      </SettingSection>

    </div>
  );
};