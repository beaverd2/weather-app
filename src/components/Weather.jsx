import React from 'react';
import styled from 'styled-components';
import HourlyForecastChart from './HourlyForecastChart';
import night from '../assets/Moon.png';
import day from '../assets/Sun.png';
import evening from '../assets/Blood.png';
import Burger from './Burger';

const StyledWeatherWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: ${(props) => props.currentWindowInnerHeight};
  width: 100%;
  background: url(${(props) => {
    if (props.bgcolor === 'night') {
      return night;
    }
    if (props.bgcolor === 'day') {
      return day;
    }
    if (props.bgcolor === 'evening') {
      return evening;
    }
  }});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  justify-content: space-between;
  max-width: 480px;
`;

const StyledWeather = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
  max-width: calc(100% - 3rem);
`;
const Temperature = styled.p`
  font-size: 8rem;
  font-weight: 300;
  letter-spacing: -0.5rem;
  padding-left: ${(props) => (props.negative ? '0' : '2.5rem')};
  padding-top: 1rem;
  line-height: 100%;
  @media (max-height: 670px) {
    font-size: 5.5rem;
    padding-left: ${(props) => (props.negative ? '0' : '1.8rem')};
  }
`;
const Description = styled.p`
  font-size: 2rem;
  font-weight: 400;
`;

const City = styled.p`
  font-size: 3rem;
  font-weight: 400;
  padding-top: 1rem;
  overflow-wrap: anywhere;
`;
const CurrentDate = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
`;
const getLocalTime = (timezone) => {
  let d = new Date().toLocaleString('ru-RU', { timeZone: timezone });
  return d;
};

export const Weather = ({
  weather,
  currentDate,
  weatherHourly,
  location,
  bgcolor,
  timezoneprop,
  handleInput,
  handleSubmit,
  inputLocation,
  findMeHandler,
  currentWindowInnerHeight,
}) => {
  return (
    <StyledWeatherWrapper
      currentWindowInnerHeight={currentWindowInnerHeight}
      bgcolor={bgcolor}
    >
      <Burger
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        bgcolor={bgcolor}
        inputLocation={inputLocation}
        findMeHandler={findMeHandler}
      />
      <StyledWeather>
        <City>{location}</City>
        <CurrentDate>
          {getLocalTime(weather.timezone).split(',')[1].substring(0, 6)}
        </CurrentDate>
        <Temperature negative={Math.round(weather.temp) < 0}>
          {Math.round(weather.temp)}&deg;
        </Temperature>
        <Description> {weather.main}</Description>
      </StyledWeather>
      <HourlyForecastChart
        weatherHourly={weatherHourly}
        timezoneprop={timezoneprop}
      />
    </StyledWeatherWrapper>
  );
};
