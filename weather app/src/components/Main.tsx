import { useState, useEffect } from 'react';

interface AtmosphericData {
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
  const [weatherInfo, setWeatherInfo] = useState<AtmosphericData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&apikey=${import.meta.env.VITE_API_KEY}&units=metric`;

  useEffect(() => {
    const retrieveWeather = async () => {
      try {
        setIsLoading(true);
        setApiError('');

        const apiResponse = await fetch(API_ENDPOINT);

        if (!apiResponse.ok) {
          throw new Error(
            searchMode === 'Location' 
            ? 'Location not available' 
            : 'Atmospheric data unavailable'
          );
        }

        const responseData = await apiResponse.json();
        setWeatherInfo(responseData);

      } catch (err) {
        setApiError(err instanceof Error ? err.message : 'Data retrieval failed');
        setWeatherInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      retrieveWeather();
    }
  }, [searchQuery, searchMode]);

  if (isLoading) return <div className="text-center p-4">Fetching data...</div>;
  if (apiError) return <div className="text-center p-4 text-red-500">{apiError}</div>;
  if (!weatherInfo) return null;
  
  const fahrenheitTemp = (weatherInfo.main.temp * 9/5 + 32).toFixed(1);
  const windKPH = weatherInfo.wind.speed * 3.6;
  const chillFactor = 
    weatherInfo.main.temp <= 10 && windKPH >= 4.8
      ? (
        13.12 +
        0.6215 * weatherInfo.main.temp -
        11.37 * Math.pow(windKPH, 0.16) +
        0.3965 * weatherInfo.main.temp * Math.pow(windKPH, 0.16)
      ).toFixed(1)
      : null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden px-0 py-3 w-md">
      <div className="p-8">
        <section className="flex items-center justify-between py-7 px-1">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {weatherInfo.name}
            </h2>
            <p className="text-gray-500 capitalize py-5">
              {weatherInfo.weather[0].description}
            </p>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
            alt="Current conditions"
            className="w-20 h-20"
          />
        </section>

        <article className="mt-6">
          <div className="text-4xl font-bold text-gray-800 py-3">
            {Math.round(weatherInfo.main.temp)}°C
            <div className="text-base font-medium text-gray-500">
              ({fahrenheitTemp}°F)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-20">
            <div className="flex items-center">
              <span className="text-gray-600">Feels like:</span>
              <span className="ml-2 font-semibold">
                {Math.round(weatherInfo.main.feels_like)}°C
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Moisture level:</span>
              <span className="ml-2 font-semibold">
                {weatherInfo.main.humidity}%
              </span>
            </div>
            {chillFactor && (
              <div className="flex items-center">
                <span className="text-gray-600">Wind chill effect:</span>
                <span className="ml-2 font-semibold">
                  {chillFactor}°C
                </span>
              </div>
            )}

            <div className="flex items-center">
              <span className="text-gray-600">Wind speed:</span>
              <span className="ml-2 font-semibold">
                {windKPH.toFixed(1)} km/h
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Main;