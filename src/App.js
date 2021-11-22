import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'weather-icons/css/weather-icons.css';
import 'weather-icons/css/weather-icons-wind.css';
import { Weather } from './components/Weather';
import WeatherDetails from './components/WeatherDetails';
import RainChart from './components/RainChart';
import WeeklyForecast from './components/WeeklyForecast';
import { getWeather, setBackground } from './utils/helpers';
import Loader from './components/Loader';
import Error from './components/Error';

const AppWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  flex-direction: column;
  color: white;
  background-color: ${(props) => {
    if (props.bgcolor === 'night') {
      return '#51435f';
    }
    if (props.bgcolor === 'day') {
      return '#d39559';
    }
    if (props.bgcolor === 'evening') {
      return '#31253b';
    }
  }};
`;

const App = () => {
  const [weather, setWeather] = useState({});
  const [inputLocation, setInputLocation] = useState('');
  const [location, setLocation] = useState('');
  const [currentDate, setCurrentDate] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentWindowInnerHeight, setCurrentWindowInnerHeight] = useState(
    window.innerHeight
  );

  const handleInputLocation = (e) => {
    e.preventDefault();
    setInputLocation(e.target.value);
  };

  const handleResize = () => {
    setCurrentWindowInnerHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchData('Moscow').then(([newWeather, city]) => {
      setWeather(newWeather);
      setLocation(city);
      setCurrentDate(new Date());
      setIsLoaded(true);
    });
  }, []);

  const fetchData = async (newLocation, isReverse) => {
    const response = await getWeather(newLocation, isReverse);
    if (response) {
      return response;
    } else return false;
  };
  const getForecast = async (e) => {
    e.preventDefault();
    setLoading(true);
    document.body.style.overflow = 'hidden';
    const response = await fetchData(inputLocation);
    if (!('error' in response)) {
      const newWeather = response[0];
      const city = response[1];
      setWeather(newWeather);
      setLocation(city);
      setInputLocation(city);
      setLoading(false);
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
      setLoading(false);
      setError(response.error);
    }
  };
  const findMeHandler = async () => {
    setLoading(true);
    document.body.style.overflow = 'hidden';
    const response = await fetchData(null, true);
    if (!('error' in response)) {
      const newWeather = response[0];
      const city = response[1];
      setWeather(newWeather);
      setLocation(city);
      setLoading(false);
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
      setLoading(false);
      setError(response.error);
    }
  };

  const closeError = () => {
    setError(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {loading && (
        <Loader currentWindowInnerHeight={currentWindowInnerHeight} />
      )}
      {error && (
        <Error
          error={error}
          bgcolor={setBackground(weather.currentWeather.timezone)}
          closeError={closeError}
          currentWindowInnerHeight={currentWindowInnerHeight}
        />
      )}
      {isLoaded && (
        <AppWrapper bgcolor={setBackground(weather.currentWeather.timezone)}>
          <Weather
            weather={weather.currentWeather}
            currentDate={currentDate}
            weatherHourly={weather.weatherHourly}
            location={location}
            bgcolor={setBackground(weather.currentWeather.timezone)}
            timezoneprop={weather.currentWeather.timezone}
            handleInput={handleInputLocation}
            handleSubmit={getForecast}
            inputLocation={inputLocation}
            findMeHandler={findMeHandler}
            currentWindowInnerHeight={currentWindowInnerHeight}
          />

          <WeatherDetails
            weather={weather.weatherDetails}
            currentDate={currentDate}
            bgcolor={setBackground(weather.currentWeather.timezone)}
          />

          <RainChart
            weatherHourly={weather.weatherHourly}
            timezone={weather.currentWeather.timezone}
          />

          <WeeklyForecast weatherWeekly={weather.weatherWeekly} />
        </AppWrapper>
      )}
    </>
  );
};

export default App;
