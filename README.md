# MyWeather 🌤️

![Version](https://img.shields.io/badge/version-1.6.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-v19-61dafb.svg)

**MyWeather** is a next-generation weather dashboard built with **React 19**, **TypeScript**, and **Material Design 3 (Material You)**. It provides high-precision, hyper-local forecasts without tracking your data or requiring personal API keys.

Designed for aesthetics and performance, it features dynamic theming, interactive charts, real-time radar, and intelligent health insights.

---

## ✨ Features

### 🎨 Design & Customization
- **Material You UI**: A fully responsive interface following Google's Material Design 3 guidelines.
- **Dynamic Theming**: Switch between **Light** and **Dark** modes automatically based on sunset/sunrise.
- **Accent Colors**: Customize the look with Blue, Purple, Green, or Orange themes.

### 📊 Deep Weather Insights
- **Current Conditions**: Temperature, "Feels Like", Wind Direction, and Humidity.
- **Interactive Charts**: Visualize Temperature, Precipitation, Wind Speed, and UV Index trends.
- **7-Day Forecast**: Expandable cards revealing daily rain totals, max wind speeds, and UV peaks.
- **Environmental Metrics**: Air Quality (AQI), Visibility, Pressure, Cloud Cover, and Dew Point.

### 🧠 Smart Features
- **Smart Assistant**: AI-like suggestions for clothing and activities based on live conditions.
- **Severe Weather Alerts**: Automatic banners for Storms, Extreme Heat, Freezing conditions, and High UV.
- **Health & Pollen**: Tracking for Grass, Ragweed, Birch, and Olive pollen levels.
- **Astronomy**: Real-time Sun position tracking, Golden Hour calculations, and specific Moon Phases.

### 🗺️ Radar & Localization
- **Weather Radar**: Real-time precipitation map overlay (powered by RainViewer).
- **Geolocation**: Automatic GPS detection with IP-based fallback.
- **Search & Favorites**: Search global cities and save them for quick access.

### 🛠️ Developer Tools
- **Widget Studio**: Configure and generate embeddable `<iframe>` widgets for your own websites.
- **Zero-Config**: Uses the Open-Meteo API, requiring no API keys for standard usage.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Data Source**: [Open-Meteo API](https://open-meteo.com/) (Weather), [RainViewer](https://www.rainviewer.com/) (Radar), [BigDataCloud](https://www.bigdatacloud.com/) (Reverse Geocoding).

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/myweather.git
   cd myweather
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🌍 Privacy Policy

MyWeather is a **client-side only** application. 
- **Location Data**: Your latitude/longitude is processed locally in your browser to fetch weather data from Open-Meteo. It is never stored on our servers.
- **Preferences**: Settings (Units, Theme, Favorites) are stored in your browser's `localStorage`.
- **No Tracking**: No cookies, no analytics, no ads.

---

## 🤝 Contributing

Contributions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Crafted with ❤️ by <a href="https://github.com/m4rcel-lol">m4rcel-lol</a></p>
</div>
