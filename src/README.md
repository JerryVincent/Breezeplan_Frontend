# 🌤️ Breezeplan

**Breezeplan** is a geospatial web application that recommends personalized outdoor activities in Münster, Germany, based on real-time weather conditions. Users input their group details and available time, and Breezeplan suggests suitable activities along with navigation routes, safety tips, and live weather data — all in one place.

Built as part of the **Geoinformation in Society** course at the **University of Münster (WWU)**, MSc Geoinformatics and Spatial Data Science.

---

## 📸 Features

- 🌡️ **Real-time weather** — Fetches live temperature and wind speed for the user's current location using the [Open-Meteo API](https://open-meteo.com/)
- 📍 **Geolocation detection** — Automatically detects the user's current position via the browser Geolocation API
- 🏃 **Personalized activity suggestions** — Recommends outdoor activities (jogging, kayaking, yoga, picnics, rock climbing, and more) based on weather conditions, group size, fitness level, and available time
- 🗺️ **Google Maps routing** — Each activity includes a direct Google Maps directions link to the nearest suitable venue in Münster (Aasee, Botanischer Garten, Promenade, etc.)
- 🧭 **Safety tips** — Location-specific safety advice for every recommended activity
- 👥 **Multi-user support** — Add multiple participants, each with their own age, gender, and fitness level
- 🔔 **Toast notifications** — Real-time form validation feedback using React Toastify

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| UI Components | React Bootstrap, Material UI (MUI) |
| Icons | FontAwesome |
| HTTP Client | Axios |
| Weather API | [Open-Meteo](https://open-meteo.com/) (free, no API key required) |
| Maps | Google Maps Directions API (via redirect URL) |
| Notifications | React Toastify |
| Styling | Bootstrap 5, custom CSS |

---

## 📁 Project Structure

```
src/
├── components/
│   └── Navbarheader.jsx     # Top navigation bar
├── pages/
│   ├── Landing.jsx          # Landing / home page
│   ├── Getsuggestion.jsx    # Main activity suggestion page
│   └── Starting.jsx         # Entry flow
├── App.jsx                  # Root component with route definitions
├── App.css                  # Global styles
├── index.css                # Base styles
└── main.jsx                 # App entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/JerryVincent/Breezeplan_Frontend.git
cd Breezeplan_Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` folder.

---

## 🧭 How It Works

1. **Landing page** — The user is introduced to Breezeplan and clicks *Explore Breezeplan* to get started.
2. **Fill in details** — The user enters how long they want to spend outdoors, along with age, gender, and fitness level for each participant. Multiple participants can be added.
3. **Submit** — On submission, the app:
   - Detects the user's current GPS coordinates via the browser Geolocation API
   - Fetches real-time weather data (temperature, wind speed) from Open-Meteo for those coordinates
   - Displays a weather summary card with live readings and current timestamp
4. **Activity cards** — A grid of suggested outdoor activities is displayed. Each card shows an image, description, group suitability, and estimated time required.
5. **Activity detail modal** — Clicking an activity card opens a modal with:
   - Location name and description
   - Lighting conditions
   - A Google Maps link for directions
   - Safety tips specific to the activity

---

## 🌍 Sample Activities Included

| Activity | Location | Duration |
|---|---|---|
| Jogging | Promenade (city park loop) | 60–90 min |
| Outdoor Yoga | Aasee Park | 30–60 min |
| Rock Climbing | DAV Boulderzentrum Münster | 2–3 hours |
| Picnic | Botanischer Garten Münster | 1–3 hours |
| Kayaking | Aasee Lake | 1–3 hours |
| Horseback Riding | Reitverein St. Georg Münster | 1–2 hours |

---

## 🔌 API Reference

### Open-Meteo Weather API

No API key required. The app calls:

```
GET https://api.open-meteo.com/v1/forecast
  ?latitude={lat}
  &longitude={lng}
  &current=temperature_2m,wind_speed_10m
  &hourly=temperature_2m,relative_humidity_2m,wind_speed_10m
```

Returns current temperature (°C) and wind speed (km/h) for the detected coordinates.

---

## ⚠️ Known Limitations

- Activity data is currently static (hardcoded). A backend integration with a database or external activity API would allow dynamic, truly weather-matched recommendations.
- Google Maps routing uses a static destination URL per activity; it does not dynamically calculate routes from the user's detected position.
- The app is optimised for Münster, Germany. Extending to other cities would require location-aware activity data.

---

## 🗺️ Future Improvements

- [ ] Connect to a live backend (e.g. Spring Boot or Node.js) for dynamic, weather-filtered activity suggestions
- [ ] Replace static activity data with a database-driven recommendation engine
- [ ] Add an embedded Mapbox or Leaflet map showing all activity locations
- [ ] User accounts and activity history
- [ ] Weather forecast view (not just current conditions) to help with planning ahead
- [ ] Extend support beyond Münster to other cities

---

## 👨‍💻 Author

**Jerry Vincent**
MSc Geoinformatics and Spatial Data Science — University of Münster
[GitHub](https://github.com/JerryVincent) · [LinkedIn](https://www.linkedin.com/in/jerry-vincent-2495a3211/)

---

## 📄 License

This project was developed for academic purposes as part of coursework at the University of Münster. Feel free to use it as a reference or starting point for similar projects.