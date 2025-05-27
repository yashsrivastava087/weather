
import { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import Footer from './Footer';

interface Dataa {
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

const Cities = [
  'Mumbai', 'Delhi', 'Chennai', 'New York', 
  'Dubai', 'Abu Dhabi', 'London', 'Paris', 
  'Tokyo', 'Sydney'
];

const WeatherCard = ({ data }: { data: Dataa }) => {
  const fahrenheitTemp = (data.main.temp * 9/5 + 32).toFixed(1);
  return (
    <div className="min-w-[500px] py-20 bg-white rounded-xl shadow-md p-4 mx-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-80 py-2">{data.name}</h3>
          <p className="text-gray-500 text-sm capitalize">{data.weather[0].description}</p>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt="Weather icon"
          className="w-20 h-20"
        />
      </div>
      <div className="mt-2">
        <div className="text-xl font-bold text-gray-800 py-4">
          {Math.round(data.main.temp)}°C
          <span className="text-sm text-gray-500 ml-1">({fahrenheitTemp}°F)</span>
        </div>
      </div>
    </div>
  );
};

const Main = ({ searchQuery, searchMode, clearSearch }: {
  searchQuery: string;
  searchMode: string;
  clearSearch: () => void;
}) => {
  const [weatherInfo, setWeatherInfo] = useState<Dataa | null>(null);
  const [predefinedWeather, setPredefinedWeather] = useState<Dataa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const retrieveWeather = async () => {
      try {
        setIsLoading(true);
        setApiError('');
        

        if (searchQuery) {
          const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&apikey=${import.meta.env.VITE_API_KEY}&units=metric`;
          const apiResponse = await fetch(API_ENDPOINT);
           if (!apiResponse.ok) {
            throw new Error('City not found');
          }
          const responsedata = await apiResponse.json();
          setWeatherInfo(responsedata);
          setPredefinedWeather([]);
        } else {
          const responses = await Promise.allSettled(
            Cities.map(city => 
              fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&apikey=${import.meta.env.VITE_API_KEY}&units=metric`)
                .then(res => {
                  if (!res.ok) throw new Error('City not found');
                  return res.json();
                })
            )
          );

          const successfulResponses = responses
            .filter(result => result.status === 'fulfilled')
            .map(result => (result as PromiseFulfilledResult<Dataa>).value);
          
          setPredefinedWeather(successfulResponses);
          setWeatherInfo(null);
        }
      } catch (err) {
        setApiError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        setWeatherInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    retrieveWeather();
  }, [searchQuery, searchMode]);

  const fahrenheitTemp = weatherInfo ? (weatherInfo.main.temp * 9/5 + 32).toFixed(1) : 0;
  const windKPH = weatherInfo ? weatherInfo.wind.speed * 3.6 : 0;
  const chillFactor = weatherInfo && weatherInfo.main.temp <= 10 && windKPH >= 4.8
    ? (
        13.12 +
        0.6215 * weatherInfo.main.temp -
        11.37 * Math.pow(windKPH, 0.16) +
        0.3965 * weatherInfo.main.temp * Math.pow(windKPH, 0.16)
      ).toFixed(1)
    : null;

  if (isLoading) return <div className="text-center p-4">Fetching data...</div>;
  if (apiError) return <div className="text-center p-4 text-red-500">{apiError}</div>;

  return (
    <>
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden px-0 py-2 w-full mt-10">
      {searchQuery ? (
        weatherInfo && (
          <div className="p-8 relative">
            <button 
              onClick={clearSearch}
              className="absolute top-4 right-4 text-gray-500 hover:text-black hover:underline cursor-pointer"
            >
              ← Back to all cities
            </button>

            <section className="flex items-center justify-between py-4 px-1 mt-4">
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
              <div className="text-center text-4xl font-bold text-gray-800 py-9">
                {Math.round(weatherInfo.main.temp)}°C
                <div className="text-base font-medium text-gray-500">
                  ({fahrenheitTemp}°F)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-20 px-6">
                <div className="flex items-center">
                  <span className="text-gray-600">Feels like:</span>
                  <span className="ml-2 font-semibold">
                    {Math.round(weatherInfo.main.feels_like)}°C
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600">Humidity:</span>
                  <span className="ml-2 font-semibold">
                    {weatherInfo.main.humidity}%
                  </span>
                </div>
                {chillFactor && (
                  <div className="flex items-center">
                    <span className="text-gray-600">Wind chill:</span>
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
        )
      ) : (
        <div className="p-4">
          <Marquee speed={40} gradient={false} pauseOnHover>
            {predefinedWeather.map((cityData, index) => (
              <WeatherCard key={index} data={cityData} />
            ))}
          </Marquee>
        </div>
      )}
      
    </div>
    <Footer />
    </>
  );
};

export default Main;