import React from 'react';
import styled from 'styled-components';

const StyledWeeklyForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WeekDay = styled.p`
  margin-bottom: 0.5rem;
`;
const WeatherIcon = styled.i`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;
const MaxTemp = styled.p`
  border-bottom: 1px solid white;
  margin-bottom: 0.25rem;
  padding-bottom: 0.25rem;
`;
const MinTemp = styled.p`
  color: rgb(255, 255, 255, 0.4);
`;

const WeeklyForecastItem = ({ weather }) => {
  let weatherIcon = '';
  if (weather.weather[0].main === 'Thunderstorm') {
    weatherIcon = 'wi wi-thunderstorm';
  } else if (weather.weather[0].main === 'Drizzle') {
    weatherIcon = 'wi wi-sprinkle';
  } else if (weather.weather[0].main === 'Rain') {
    weatherIcon = 'wi wi-rain';
  } else if (weather.weather[0].main === 'Snow') {
    weatherIcon = 'wi wi-snow';
  } else if (weather.weather[0].main === 'Clouds') {
    weatherIcon = 'wi wi-cloud';
  } else if (weather.weather[0].main === 'Clear') {
    weatherIcon = 'wi wi-day-sunny';
  } else {
    weatherIcon = 'wi wi-fog';
  }
  let day = new Date(weather.dt * 1000);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <StyledWeeklyForecastItem>
      <WeekDay>{days[day.getDay()].slice(0, 3)}</WeekDay>
      <WeatherIcon className={weatherIcon}></WeatherIcon>
      <MaxTemp>{Math.round(weather.temp.max) + '\u00B0'}</MaxTemp>
      <MinTemp>{Math.round(weather.temp.min) + '\u00B0'}</MinTemp>
    </StyledWeeklyForecastItem>
  );
};

export default WeeklyForecastItem;
