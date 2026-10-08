import React from 'react';
import WeatherCurrent from '../components/WeatherCurrent';
import SevenDayWeather from '../components/SevenDayWeather';
import Map from '../components/Map';

export default function WeatherPage({ context }) {
    const { location, data, loading, error } = context;

    if (loading) return <div className="state-container"><div className="spinner"></div></div>;
    if (error) return <div className="state-container"><p style={{color: '#ef4444'}}>{error}</p></div>;
    if (!data) return null;

    return (
        <div>
            <h1 className="location-title" style={{ marginBottom: '30px' }}>Weather Details: {location.name}</h1>
            
            <div className="dashboard-grid">
                <div className="col-span-6">
                    <WeatherCurrent current={data.weather?.current} />
                </div>
                <div className="col-span-6">
                    <Map lat={location.lat} lon={location.lon} city={location.name} />
                </div>
                <div className="col-span-12">
                    <SevenDayWeather daily={data.weather?.daily} />
                </div>
            </div>
        </div>
    );
}