import React from 'react';
import { changelogData } from '../services/changelog';
import { Sparkles, Wrench, Bug, History } from 'lucide-react';

export const Changelog: React.FC = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature': return <Sparkles size={16} className="text-blue-500" />;
      case 'fix': return <Bug size={16} className="text-red-500" />;
      default: return <Wrench size={16} className="text-orange-500" />;
    }
  };

  const getTypeStyle = (type: string) => {
     switch (type) {
      case 'feature': return 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20';
      case 'fix': return 'bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/20';
      default: return 'bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/20';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fade-in pb-24">
      <div className="mb-12 flex items-center gap-4">
         <div className="p-4 rounded-2xl bg-m3-primaryContainer text-m3-onPrimaryContainer">
            <History size={32} />
         </div>
         <div>
            <h1 className="text-4xl font-bold text-m3-onSurface">Changelog</h1>
            <p className="text-lg text-m3-onSurfaceVariant mt-1">
                Tracking the evolution of MyWeather.
            </p>
         </div>
      </div>

      <div className="relative border-l-2 border-m3-outlineVariant/30 ml-4 md:ml-8 space-y-12">
        {changelogData.map((post, index) => (
            <div key={post.version} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-m3-primary border-4 border-m3-background"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                    <h2 className="text-2xl font-bold text-m3-onSurface">v{post.version}</h2>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-m3-surfaceContainerHigh text-m3-onSurfaceVariant">
                        {post.date}
                    </span>
                </div>

                <h3 className="text-xl font-semibold text-m3-primary mb-3">{post.title}</h3>
                <p className="text-m3-onSurfaceVariant mb-6 max-w-2xl leading-relaxed">
                    {post.description}
                </p>

                <div className="grid gap-3 max-w-3xl">
                    {post.changes.map((change, i) => (
                        <div 
                            key={i} 
                            className="flex items-start gap-4 p-4 rounded-xl bg-m3-surfaceContainer hover:bg-m3-surfaceContainerHigh transition-colors"
                        >
                            <div className={`shrink-0 p-2 rounded-lg border ${getTypeStyle(change.type)}`}>
                                {getTypeIcon(change.type)}
                            </div>
                            <div>
                                <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${
                                    change.type === 'feature' ? 'text-blue-600 dark:text-blue-400' : 
                                    change.type === 'fix' ? 'text-red-600 dark:text-red-400' : 
                                    'text-orange-600 dark:text-orange-400'
                                }`}>
                                    {change.type === 'feature' ? 'New Feature' : change.type === 'fix' ? 'Bug Fix' : 'Improvement'}
                                </span>
                                <p className="text-sm text-m3-onSurface font-medium">
                                    {change.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};