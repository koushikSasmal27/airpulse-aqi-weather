export const getAqiInfo = (aqi) => {
    if (aqi === null || aqi === undefined) return { category: 'Unknown', color: '#94a3b8' };
    if (aqi <= 50) return { category: 'Good', color: '#10b981' };
    if (aqi <= 100) return { category: 'Moderate', color: '#f59e0b' };
    if (aqi <= 150) return { category: 'Unhealthy for Sensitive Groups', color: '#f97316' };
    if (aqi <= 200) return { category: 'Unhealthy', color: '#ef4444' };
    if (aqi <= 300) return { category: 'Very Unhealthy', color: '#8b5cf6' };
    return { category: 'Hazardous', color: '#881337' };
};

export const getWeatherCode = (code) => {
    const codes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        95: 'Thunderstorm',
    };
    return codes[code] || 'Unknown';
};

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};
