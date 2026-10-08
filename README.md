# AirPulse

A real-time AQI and weather monitoring web application that provides location-based air quality insights, historical AQI trends, weather information, pollutant levels, and health recommendations.

## Live Demo

**[Visit AirPulse](https://airpulse-aqi-weather.vercel.app/)**

## Features

* Real-time Air Quality Index (AQI)
* Current weather information
* PM2.5, PM10, NO₂, SO₂, and O₃ monitoring
* Historical 7-day AQI trends
* City search with location suggestions
* Current location detection
* Reverse geocoding for location names
* Interactive location map
* Health and lifestyle recommendations based on AQI and weather conditions
* Responsive design for desktop, tablet, and mobile devices

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Chart.js
* React Leaflet
* Lucide React

### Backend

* Node.js
* Express.js
* Axios
* CORS
* dotenv

### APIs

* Open-Meteo Air Quality API
* Open-Meteo Weather API
* Open-Meteo Geocoding API
* OpenStreetMap Nominatim API

## Project Structure

```text
airpulse-aqi-weather/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── vercel.json
└── README.md
```

## Application Pages

### Dashboard

The dashboard provides an overview of the selected location, including:

* Current AQI
* Current weather
* Health recommendations
* Primary pollutants
* Interactive location map

### AQI Details

The AQI page provides:

* Current AQI
* Primary pollutant information
* Historical 7-day AQI trends
* AQI prediction section reserved for future machine-learning integration

### Weather Details

The Weather page provides detailed weather information for the selected location, including current conditions and the upcoming forecast.

## AQI Monitoring

AirPulse displays the US AQI along with major pollutants:

| Pollutant | Description               |
| --------- | ------------------------- |
| PM2.5     | Fine particulate matter   |
| PM10      | Coarse particulate matter |
| NO₂       | Nitrogen dioxide          |
| SO₂       | Sulfur dioxide            |
| O₃        | Ozone                     |

The application also categorizes AQI levels to make air-quality conditions easier to understand.

## Health Recommendations

AirPulse converts air-quality and weather information into practical recommendations.

Examples include:

* Outdoor activity recommendations during good air-quality conditions
* Precautions during poor air-quality conditions
* Recommendations for sensitive groups
* Guidance based on pollutant levels and weather conditions

## Historical AQI

The application retrieves historical AQI data and visualizes daily average AQI values using Chart.js.

The historical section currently displays a 7-day AQI trend for the selected location.

## Location Features

AirPulse supports:

* Searching for cities
* Selecting a location from search suggestions
* Detecting the user's current location
* Displaying the detected location name
* Updating AQI and weather data based on the selected location

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone https://github.com/koushikSasmal27/airpulse-aqi-weather.git
cd airpulse-aqi-weather
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

## Environment Variables

For local development, create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

The backend uses port `5000` by default.

If required, a server `.env` file can contain:

```env
PORT=5000
```

Do not commit `.env` files or sensitive credentials to the repository.

## Running the Application

### Start the Backend

From the `server` directory:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Start the Frontend

From the `client` directory:

```bash
npm run dev
```

The frontend will be available at the local Vite URL shown in the terminal.

## Deployment

AirPulse is deployed using Vercel.

**Live Application:**

https://airpulse-aqi-weather.vercel.app/

The project uses separate frontend and backend services within the same Vercel project.

```text
User
  ↓
Vercel
  ├── /       → React/Vite Client
  └── /api/*  → Express Server
                    ↓
                Open-Meteo APIs
```

The deployment configuration is defined in `vercel.json`.

## Future Improvements

* Machine-learning-based AQI prediction using LightGBM
* Next 24-hour AQI forecasting
* Advanced AQI trend analysis
* AQI alerts and notifications
* Saved and pinned locations
* More detailed historical analysis
* Improved air-quality visualizations

## Author

**Koushik Sasmal**

GitHub: [koushikSasmal27](https://github.com/koushikSasmal27)

## License

This project was developed for educational and portfolio purposes.
