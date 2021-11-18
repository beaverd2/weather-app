import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'weather-icons/css/weather-icons.css';
import 'weather-icons/css/weather-icons-wind.css';
import { Weather } from './components/Weather';
import WeatherDetails from './components/WeatherDetails';
import RainChart from './components/RainChart';
import WeeklyForecast from './components/WeeklyForecast';
import Burger from './components/Burger';
import { getWeather, setBackground } from './utils/helpers';
import Loader from './components/Loader';

// TO DO LIST
// error handling with modal

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

  const handleInputLocation = (e) => {
    e.preventDefault();
    setInputLocation(e.target.value);
  };

  useEffect(() => {
    fetchData('Moscow').then(([newWeather, city]) => {
      setWeather(newWeather);
      setLocation(city);
      setCurrentDate(new Date());
      setIsLoaded(true);
    });
  }, []);

  async function fetchData(newLocation, isReverse) {
    const response = await getWeather(newLocation, isReverse);
    return response;
  }
  const getForecast = (e) => {
    e.preventDefault();
    setLoading(true);
    document.body.style.overflow = 'hidden';
    fetchData(inputLocation).then(([newWeather, city]) => {
      setWeather(newWeather);
      setLocation(city);
      setInputLocation(city);
      setLoading(false);
      document.body.style.overflow = 'unset';
    });
  };
  const findMeHandler = () => {
    setLoading(true);
    document.body.style.overflow = 'hidden';
    fetchData(null, true).then(([newWeather, city]) => {
      setWeather(newWeather);
      setLocation(city);
      setLoading(false);
      document.body.style.overflow = 'unset';
    });
  };

  return (
    <>
      {loading ? <Loader /> : null}
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
