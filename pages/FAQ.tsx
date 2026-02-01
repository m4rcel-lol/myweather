import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "Where does the weather data come from?",
    answer: "We utilize the Open-Meteo API, which aggregates data from national weather services like NOAA, DWD, and MeteoFrance. This ensures high-precision forecasts without the need for an API key.",
  },
  {
    question: "Is MyWeather free to use?",
    answer: "Yes! MyWeather is completely free and open-source. There are no hidden fees, subscriptions, or advertisements.",
  },
  {
    question: "How do I embed the weather widget on my site?",
    answer: (
      <span>
        Navigate to the <a href="#/app/developers" className="text-m3-primary hover:underline">API & Widgets</a> page. There, you can copy a simple HTML iframe code snippet that works on any website. You can customize coordinates and themes via URL parameters.
      </span>
    ),
  },
  {
    question: "Does this app track my location?",
    answer: "No. Your location data is processed locally in your browser to fetch weather data and is never stored on our servers. We prioritize your privacy.",
  },
  {
    question: "Can I contribute to the project?",
    answer: "Absolutely. As a project by m4rcel-lol, we welcome feedback and ideas. Check out the 'About Dev' page for social links.",
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-300 dark:to-rose-300 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-m3-onSurfaceVariant max-w-2xl">
          Everything you need to know about MyWeather.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`bg-m3-surfaceContainer rounded-2xl transition-all duration-300 overflow-hidden ${
              openIndex === index ? 'shadow-md' : 'hover:bg-m3-surfaceContainerHigh'
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-lg font-medium pr-8 text-m3-onSurface">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-m3-onSurfaceVariant shrink-0" />
              ) : (
                <ChevronDown className="text-m3-onSurfaceVariant shrink-0" />
              )}
            </button>
            <div 
              className={`px-6 text-m3-onSurfaceVariant leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-m3-surfaceContainer text-sm text-m3-onSurfaceVariant">
            <HelpCircle size={16} />
            Still have questions? Reach out on GitHub.
        </div>
      </div>
    </div>
  );
};