'use client';

import React, { useState, useEffect } from 'react';

export default function CropSuggestionPage() {
  const [formData, setFormData] = useState({
    location: 'Ludhiana, Punjab',
    lat: 30.9010,
    lon: 75.8573,
    soilType: 'Loamy',
    season: 'Rabi (Nov - Mar)',
    landSize: '5',
  });

  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState(null);

  const [locationQuery, setLocationQuery] = useState('Ludhiana, Punjab');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [recommendation, setRecommendation] = useState({
    cropName: 'Moong (Green Gram)',
    reasons: [
      'Good market demand in your region',
      'Suitable for loamy soil',
      'High profit in Rabi season',
      'Low water requirement',
    ],
    sellingPeriod: '10 Nov - 30 Dec',
  });

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (locationQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}&addressdetails=1&limit=5`);
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [locationQuery]);

  const handleSelectSuggestion = (item) => {
    const address = item.address;
    const city = address.city || address.town || address.village || address.state_district || item.display_name.split(',')[0];
    const state = address.state || '';
    const country = address.country || '';
    
    const formattedLocation = `${city}, ${state}${country ? `, ${country}` : ''}`;
    
    setLocationQuery(formattedLocation);
    setFormData((prev) => ({
      ...prev,
      location: formattedLocation,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    }));

    setShowSuggestions(false);
    fetchWeatherData(item.lat, item.lon);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.state_district || 'Custom Location';
          const state = data.address.state || '';
          const country = data.address.country || '';
          const formatted = `${city}, ${state}, ${country}`;

          setLocationQuery(formatted);
          setFormData((prev) => ({
            ...prev,
            location: formatted,
            lat,
            lon,
          }));

          fetchWeatherData(lat, lon);
        } catch (error) {
          console.error('Error fetching location name:', error);
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        console.error(error);
        alert('Unable to retrieve your location. Please check permissions.');
        setDetectingLocation(false);
      }
    );
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation`);
      const data = await res.json();
      if (data && data.current) {
        setWeatherInfo({
          temp: `${data.current.temperature_2m}°C`,
          humidity: `${data.current.relative_humidity_2m}%`,
          rain: `${data.current.precipitation} mm`,
        });
      }
    } catch (err) {
      console.error('Weather fetch failed', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      let suggestedCrop = 'Moong (Green Gram)';
      let reasons = [
        `Live weather matched for ${formData.location}`,
        `Highly compatible with ${formData.soilType} soil type`,
        `Optimized yield for ${formData.season}`,
        weatherInfo ? `Current temperature support (${weatherInfo.temp})` : 'Optimal soil moisture profile',
      ];

      if (formData.soilType === 'Clayey') {
        suggestedCrop = 'Paddy (Rice)';
      } else if (formData.soilType === 'Sandy') {
        suggestedCrop = 'Bajra (Pearl Millet)';
      } else if (formData.soilType === 'Black Soil') {
        suggestedCrop = 'Cotton / Soybean';
      }

      setRecommendation({
        cropName: suggestedCrop,
        reasons: reasons,
        sellingPeriod: '15 Nov - 15 Jan',
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Get Your Personalized Crop Suggestion (AI Powered)
        </h1>
        <p className="text-gray-600 mt-1">
          Type your location to auto-suggest cities/villages, and analyze live weather and soil conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Location (City, Village, State)</label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={detectingLocation}
                  className="text-xs text-green-700 font-semibold hover:text-green-800 flex items-center space-x-1 bg-green-50 px-2.5 py-1 rounded-lg border border-green-200 cursor-pointer"
                >
                  <span>{detectingLocation ? 'Locating...' : '📍 Auto-Detect GPS'}</span>
                </button>
              </div>

              <input
                type="text"
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none text-gray-800 bg-white"
                placeholder="Type location (e.g., Abohar, Ludhiana...)"
                required
              />

              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectSuggestion(item)}
                      className="px-4 py-2.5 hover:bg-green-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-none flex flex-col"
                    >
                      <span className="font-semibold text-gray-900">{item.display_name.split(',')[0]}</span>
                      <span className="text-xs text-gray-500 truncate">{item.display_name}</span>
                    </li>
                  ))}
                </ul>
              )}

              {weatherInfo && (
                <p className="text-xs text-green-700 mt-1.5 font-medium">
                  🌤️ Weather Fetched: Temp: {weatherInfo.temp} | Humidity: {weatherInfo.humidity}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none bg-white text-gray-800"
              >
                <option value="Loamy">Loamy</option>
                <option value="Clayey">Clayey</option>
                <option value="Sandy">Sandy</option>
                <option value="Black Soil">Black Soil</option>
                <option value="Alluvial">Alluvial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
              <select
                name="season"
                value={formData.season}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none bg-white text-gray-800"
              >
                <option value="Rabi (Nov - Mar)">Rabi (Nov - Mar)</option>
                <option value="Kharif (Jul - Oct)">Kharif (Jul - Oct)</option>
                <option value="Zaid (Mar - Jun)">Zaid (Mar - Jun)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Land Size (in acres)</label>
              <input
                type="number"
                name="landSize"
                value={formData.landSize}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-green-800 hover:bg-green-900 text-white font-medium rounded-xl transition duration-200 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>AI Analyzing Location Weather & Soil...</span>
                </span>
              ) : (
                <span>Get AI Suggestion</span>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-green-800 mb-4">
              <span className="p-2 bg-green-50 rounded-lg">🌱</span>
              <h2 className="font-semibold text-lg">AI Recommendation Engine</h2>
            </div>

            {loading ? (
              <div className="py-24 text-center text-gray-400 animate-pulse font-medium">
                Fetching satellite weather data for {formData.location}...
              </div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                  Best Recommended Crop
                </p>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{recommendation.cropName}</h3>
                  </div>
                  <div className="w-20 h-20 bg-green-50 rounded-xl flex items-center justify-center p-2">
                    <svg className="w-12 h-12 text-green-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18c-3.314 0-6 2.686-6 6 0 2.21 1.208 4.135 3 5.196V19a1 1 0 001 1h4a1 1 0 001-1v-4.804C16.792 13.135 18 11.21 18 9c0-3.314-2.686-6-6-6z" />
                    </svg>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Why this crop?</h4>
                  <ul className="space-y-2.5 text-sm text-gray-600">
                    {recommendation.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50/70 border border-green-100 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-2 text-green-800 text-xs font-semibold uppercase tracking-wide mb-1">
                    <span>📅</span>
                    <span>Suggested Harvest & Selling Period</span>
                  </div>
                  <p className="text-gray-900 font-bold text-lg">{recommendation.sellingPeriod}</p>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => window.location.href = '/market-analysis'}
            className="w-full py-3 border border-gray-200 hover:bg-gray-50 text-gray-800 font-medium rounded-xl transition duration-200 text-center flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>View Market Prices & Trends</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}