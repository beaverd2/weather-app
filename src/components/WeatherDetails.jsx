import React from 'react';
import styled from 'styled-components';
import WeatherDetailsItem from './WeatherDetailsItem';

const StyledWeatherDetails = styled.div`
  max-width: 480px;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

const StyledWeatherDetailsTitle = styled.p`
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

const StyledWeatherDetailsTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const WeatherDetails = ({ weather, bgcolor }) => {
  return (
    <StyledWeatherDetails>
      <StyledWeatherDetailsTitle>Details</StyledWeatherDetailsTitle>
      <StyledWeatherDetailsTitleContainer>
        {weather.map((data) => {
          return (
            <WeatherDetailsItem
              data={data}
              key={Object.keys(data)[0]}
              bgcolor={bgcolor}
            />
          );
        })}
      </StyledWeatherDetailsTitleContainer>
    </StyledWeatherDetails>
  );
};

export default WeatherDetails;
