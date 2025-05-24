import { useState, useEffect } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

const Main = ({ searchQuery, searchMode }: {
  searchQuery: string;
  searchMode: string;
}) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&apikey=${import.meta.env.VITE_API_KEY}&units=metric`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            searchMode === 'Location'
              ? 'City not found'
              : 'Weather pattern not found'
          );
        }

        const data = await response.json();
        setData(data);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchWeather();
    }
  }, [searchQuery, searchMode]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!data) return null;
  
  const tempF = (data.main.temp * 9 / 5 + 32).toFixed(1);
  const windSpeedKmh = data.wind.speed * 3.6;
  const windChill =
    data.main.temp <= 10 && windSpeedKmh >= 4.8
      ? (
        13.12 +
        0.6215 * data.main.temp -
        11.37 * Math.pow(windSpeedKmh, 0.16) +
        0.3965 * data.main.temp * Math.pow(windSpeedKmh, 0.16)
      ).toFixed(1)
      : null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden px-0 py-3 w-md">
      <div className="p-8">
        <div className="flex items-center justify-between py-7 px-1">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {data.name}
            </h2>
            <p className="text-gray-500 capitalize py-5">
              {data.weather[0].description}
            </p>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className="w-20 h-20"
          />
        </div>

        <div className="mt-6">
          <div className="text-4xl font-bold text-gray-800 py-3">
            {Math.round(data.main.temp)}°C
            <div className="text-base font-medium text-gray-500">
              ({tempF}°F)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-20">
            <div className="flex items-center ">
              <span className="text-gray-600">Feels like:</span>
              <span className="ml-2 font-semibold">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Humidity:</span>
              <span className="ml-2 font-semibold">
                {data.main.humidity}%
              </span>
            </div>
            {windChill && (
              <div className="flex items-center">
                <span className="text-gray-600">Wind Chill:</span>
                <span className="ml-2 font-semibold">
                  {windChill}°C
                </span>
              </div>
            )}

            <div className="flex items-center">
              <span className="text-gray-600">Wind Speed:</span>
              <span className="ml-2 font-semibold">
                {windSpeedKmh.toFixed(1)} km/h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;