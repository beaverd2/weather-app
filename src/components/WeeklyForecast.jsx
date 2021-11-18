import React from 'react';
import styled from 'styled-components';
import WeeklyForecastItem from './WeeklyForecastItem';

const StyledWeeklyForecast = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;
const StyledWeeklyForecastTitle = styled.p`
  text-transform: uppercase;
  margin-bottom: 1rem;
  overflow: hidden;
  &:after {
    margin-left: 1rem;
    content: '';
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    width: 100%;
    height: 1px;
    background: rgb(255, 255, 255, 0.2);
    border-width: 0 1px;
    margin-right: -100%;
  }
`;
const StyledWeeklyForecastContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const WeeklyForecast = ({ weatherWeekly }) => {
  return (
    <StyledWeeklyForecast>
      <StyledWeeklyForecastTitle>next 7 days</StyledWeeklyForecastTitle>
      <StyledWeeklyForecastContainer>
        {weatherWeekly.weather.map((weather) => {
          return <WeeklyForecastItem weather={weather} key={weather.dt} />;
        })}
      </StyledWeeklyForecastContainer>
    </StyledWeeklyForecast>
  );
};

export default WeeklyForecast;
