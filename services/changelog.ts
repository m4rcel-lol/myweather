import { ChangelogPost } from '../types';

export const changelogData: ChangelogPost[] = [
  {
    version: "1.6.0",
    date: "February 01, 2026",
    title: "Themes & Alerts",
    description: "Personalize your dashboard and stay safe with severe weather warnings.",
    changes: [
      { type: 'feature', text: "Added severe weather alert banners for Storms, Heat, Cold, and High UV." },
      { type: 'feature', text: "Theme Customization: Choose between Blue, Purple, Green, and Orange accents." },
      { type: 'feature', text: "Extended Charts: Added new tabs for Wind Speed (Line Chart) and UV Index (Bar Chart)." },
      { type: 'feature', text: "Astronomy Upgrade: Added Golden Hour calculation." }
    ]
  },
  {
    version: "1.5.0",
    date: "February 01, 2026",
    title: "Maps & Details",
    description: "Introducing weather radar and deeper forecast insights.",
    changes: [
      { type: 'feature', text: "Added 'Weather Radar' page with real-time precipitation map." },
      { type: 'feature', text: "Daily Forecast cards are now expandable, revealing Rain totals, Max Wind, and UV Index." },
      { type: 'improvement', text: "Added Visual Sun Tracker to the Astronomy card." },
      { type: 'fix', text: "Fixed Pressure and Visibility units not respecting settings." },
      { type: 'feature', text: "Added Dew Point calculation." }
    ]
  },
  {
    version: "1.4.0",
    date: "February 01, 2026",
    title: "Health & Customization",
    description: "Putting you in control with new settings and health-focused insights.",
    changes: [
      { type: 'feature', text: "Added dedicated Settings page." },
      { type: 'feature', text: "Customizable units for Wind (mph, km/h, m/s) and Pressure (hPa, inHg)." },
      { type: 'feature', text: "New 'Pollen & Health' card tracking Grass, Ragweed, and Birch allergens." },
      { type: 'improvement', text: "Persisted user preferences across sessions." }
    ]
  },
  {
    version: "1.3.0",
    date: "February 01, 2026",
    title: "Astronomy Update",
    description: "Expanding our celestial data and keeping you in the loop with project updates.",
    changes: [
      { type: 'feature', text: "Added specific Moon Phase calculations (New Moon, Waxing Crescent, etc.)." },
      { type: 'feature', text: "Introduced the Changelog page to track project history." },
      { type: 'improvement', text: "Upgraded the 'Sun Cycle' card to a full 'Astronomy' module including daylight duration." }
    ]
  },
  {
    version: "1.2.0",
    date: "February 01, 2026",
    title: "Smart Insights",
    description: "Making the weather personal with Favorites and intelligent recommendations.",
    changes: [
      { type: 'feature', text: "Added 'Favorites' system. Save locations by clicking the star icon." },
      { type: 'feature', text: "Implemented 'Smart Assistant' suggesting clothing based on conditions." },
      { type: 'feature', text: "Added Precipitation Probability Bar Chart toggle." },
      { type: 'improvement', text: "Added Wind Direction indicator arrow." }
    ]
  },
  {
    version: "1.1.0",
    date: "February 01, 2026",
    title: "Data Deep Dive",
    description: "Enhancing the environmental data available to the user.",
    changes: [
      { type: 'feature', text: "Added Environmental Cards for UV Index, Visibility, Pressure, and Air Quality." },
      { type: 'feature', text: "Added interactive Tooltip to the UV Index card." },
      { type: 'feature', text: "Added horizontal scrolling Hourly Forecast." }
    ]
  },
  {
    version: "1.0.0",
    date: "February 01, 2026",
    title: "Initial Release",
    description: "The first public release of MyWeather, bringing Material You design to the web.",
    changes: [
      { type: 'feature', text: "Complete Material Design 3 UI System implementation." },
      { type: 'feature', text: "Integration with Open-Meteo API." },
      { type: 'feature', text: "Dynamic Light/Dark mode based on local sunset times." }
    ]
  }
];