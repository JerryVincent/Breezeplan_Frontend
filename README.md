# 🌤️ Breezeplan

**Breezeplan** is a full-stack geospatial web application that recommends personalised outdoor activities in Münster, Germany, based on real-time weather and group details. Users input their group size, fitness levels, and available time; Breezeplan fetches live weather, runs a reinforcement-learning suggestion engine, and returns ranked activity cards complete with location info, safety tips, and Google Maps links.

Built as part of the **Geoinformation in Society** course at the **University of Münster (WWU)**, MSc Geoinformatics and Spatial Data Science.

---

## 📸 Features

- 🌡️ **Real-time weather** — Fetches live temperature, wind speed, humidity, and precipitation for the user's current location via the [WeatherAPI.com](https://www.weatherapi.com/) service
- 📍 **Geolocation detection** — Automatically detects the user's GPS coordinates via the browser Geolocation API
- 🤖 **Reinforcement-learning suggestions** — A Q-learning engine ranks activities by how well they fit the current weather, group profile, and past user choices; suggestions improve over time
- 🏃 **35+ curated activities** — Jogging, kayaking, ice skating, geocaching, beach volleyball, stargazing, and more — each tailored to temperature, time, and group size
- 🗺️ **Google Maps routing** — Every activity card includes a direct Google Maps link to the nearest suitable Münster venue (Aasee, Promenade, Sentruper Höhe, Harbour, etc.)
- 🧭 **Safety tips** — Location-specific safety advice for every recommended activity
- 👥 **Multi-user support** — Add multiple participants, each with their own age, gender, and fitness level
- 🔔 **Toast notifications** — Real-time validation and error feedback (including backend failures) via React Toastify

---

## 🛠️ Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| UI Components | React Bootstrap, Material UI (MUI) |
| Icons | FontAwesome |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Styling | Bootstrap 5, custom CSS |

### Backend

| Layer | Technology |
|---|---|
| Framework | FastAPI (Python) |
| Suggestion Engine | Custom Q-learning reinforcement learning agent |
| Weather API | [WeatherAPI.com](https://www.weatherapi.com/) |
| Database | MongoDB (activity persistence with TTL index) |
| Activity Data | 64 curated JSON datasets (group × temperature × time) |
| Maps | Google Maps Directions API (via redirect URL) |

---

## 📁 Project Structure

```
Breezeplan/                         # React frontend
├── src/
│   ├── components/
│   │   └── Navbarheader.jsx        # Top navigation bar
│   ├── pages/
│   │   ├── Landing.jsx             # Landing / home page
│   │   └── Getsuggestion.jsx       # Main suggestion page (form + results)
│   ├── App.jsx                     # Root component + route definitions
│   ├── App.css                     # Global styles
│   └── main.jsx                    # App entry point

Breezeplan-api/                     # FastAPI backend
├── main.py                         # App entry point + CORS setup
├── app/
│   ├── routers/
│   │   ├── weather.py              # POST /weather/weatherData
│   │   ├── activitySuggestions.py  # POST /suggestionEngine/activitySuggestions
│   │   └── dataHandler.py          # CRUD /dataHandler/*
│   ├── services/
│   │   ├── categorizer.py          # Converts raw values → category bins
│   │   ├── dataSaveService.py      # JSON file management + MD5 hashing
│   │   └── reinforcementLearningAgent.py  # Q-value update logic
│   └── externalServiceHandler/
│       └── dbConnection.py         # MongoDB singleton
├── outdoor_activity_data/          # 64 activity JSON files (auto-populated)
├── data/                           # Per-session Q-tables (auto-generated)
└── generate_activity_data.py       # Script to regenerate all activity files
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) 3.10+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A [WeatherAPI.com](https://www.weatherapi.com/) API key (free tier is sufficient)

---

### 1. Frontend

```bash
cd Breezeplan
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

### 2. Backend

```bash
cd Breezeplan-api

# Install Python dependencies
pip install fastapi uvicorn pymongo requests python-dotenv

# Add your WeatherAPI key
# Open app/routers/weather.py and set the API_KEY variable

# (Optional) Regenerate all 64 activity data files
python generate_activity_data.py

# Start the API server
uvicorn main:app --host 127.0.0.1 --port 5000 --reload
```

The API will be available at `http://localhost:5000`
Interactive docs at `http://localhost:5000/docs`

> **Live deployment:** `https://breezeplan-api.onrender.com` — interactive docs at `https://breezeplan-api.onrender.com/docs`

---

### Build Frontend for Production

```bash
cd Breezeplan
npm run build
```

Output goes to `dist/`.

---

## 🧭 How It Works

1. **Landing page** — The user clicks *Explore Breezeplan* to begin.
2. **Fill in details** — Enter available time (minutes) plus age, gender, and fitness level for each participant. Multiple people can be added.
3. **Submit** — The app:
   - Verifies GPS coordinates are available via the browser Geolocation API
   - Calls the backend `/weather/weatherData` endpoint to fetch live temperature, humidity, wind speed, and precipitation from WeatherAPI.com
   - Sends all data (weather + group profile) to `/suggestionEngine/activitySuggestions`
4. **Suggestion engine** (backend):
   - Categorises inputs into bins (e.g. temperature → Cold / Mild / Warm / Hot)
   - Generates an MD5 hash of the categorised state
   - Looks up the matching Q-table; initialises one from the appropriate activity file if new
   - Sorts activities by Q-value and returns the top 6
   - Applies a small Q-value penalty to shown suggestions (exploration incentive)
5. **Activity cards** — A responsive grid shows each suggestion with image, description, group suitability, and time estimate.
6. **Activity detail modal** — Clicking a card opens a modal with location name, lighting conditions, a Google Maps link, and safety tips.

---

## 🌍 Sample Activities

| Activity | Location | Best For |
|---|---|---|
| Jogging | Aasee Lake Trail | Single / Couple, Mild/Warm, Short |
| Cycling | Münster Promenade Ring | All groups, Mild/Warm, Moderate–Long |
| Kayaking | Aasee Lake Rental Point | Couple / Small Group, Warm |
| Beach Volleyball | Aasee Beach Courts | Small / Large Group, Warm/Hot |
| Ice Skating | Eishalle Münster | All groups, Cold |
| Geocaching | Münster City & Surroundings | All groups, Cold–Warm |
| Stargazing | Rüschhaus Estate Fields | Single / Couple, Cold/Mild, Evening |
| Group Cycling Tour | Münster–Telgte Cycle Route | Small / Large Group, Mild/Warm |
| Outdoor BBQ | Westpark BBQ Area | Groups, Warm/Hot, Extended |
| Zoo Visit | Allwetterzoo Münster | All groups, Any weather |

---

## 🔌 API Reference

### `POST /weather/weatherData`

Fetches live weather for the user's coordinates.

**Query params:** `latitude`, `longitude`

**Response:**
```json
{
  "locationName": "Muenster",
  "temperature": "12.4 °C",
  "humidity": "72 %",
  "windSpeed": "3.1 m/s",
  "precipitation": "0.0 mm"
}
```

---

### `POST /suggestionEngine/activitySuggestions`

Returns ranked activity suggestions based on weather and group profile.

**Request body:**
```json
{
  "latitude": 51.96,
  "longitude": 7.62,
  "temperature": 12.4,
  "humidity": 72.0,
  "windSpeed": 3.1,
  "precipitation": 0.0,
  "members": [
    { "gender": "Male", "age": 25, "fitnessLevel": "Intermediate" }
  ],
  "timeRange": 60
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "activity": "Cycling",
      "description": "...",
      "groupSuitability": "...",
      "timeRequired": "45–90 min",
      "image": "https://...",
      "locationInfo": {
        "pathNameOrLocationName": "Münster Promenade Ring",
        "lighting": "Well-lit tree-lined boulevard",
        "description": "...",
        "redirectUrl": "https://maps.google.com/?q=...",
        "safetyTips": ["...", "..."]
      },
      "tableHash": "abc123...",
      "file_name": "couple_mild_moderate"
    }
  ]
}
```

---

### `POST /suggestionEngine/choosenActivityData`

Records the user's chosen activity to improve future suggestions (reward signal).

**Request body:**
```json
{
  "id": 2,
  "activity": "Cycling",
  "tableHash": "abc123...",
  "category": "couple_mild_moderate"
}
```

---

## ⚠️ Known Limitations

- Google Maps routing uses a static destination URL per activity; it does not dynamically calculate a route from the user's detected position.
- The Q-learning agent is session-local (JSON files); a shared database backend would allow learning from all users collectively.
- The app is optimised for Münster, Germany. Extending to other cities requires location-aware activity datasets.
- WeatherAPI.com free tier has a monthly request limit.

---

## 🗺️ Future Improvements

- [ ] User accounts and personal activity history
- [ ] Weather forecast view (not just current conditions) to help with planning ahead
- [ ] Embedded Leaflet or Mapbox map showing activity locations
- [ ] Dynamic route calculation from the user's GPS position to each venue
- [ ] Extend activity datasets beyond Münster to other cities
- [x] FastAPI backend with real-time weather integration
- [x] Reinforcement-learning suggestion engine
- [x] 35+ curated activity entries with location info and safety tips
- [x] Backend error surfacing via toast notifications

---

## 👨‍💻 Author

**Jerry Vincent**
MSc Geoinformatics and Spatial Data Science — University of Münster
[GitHub](https://github.com/JerryVincent) · [LinkedIn](https://www.linkedin.com/in/jerry-vincent-2495a3211/)

---

## 📄 License

This project was developed for academic purposes as part of coursework at the University of Münster. Feel free to use it as a reference or starting point for similar projects.
