import React from 'react';
import styled from 'styled-components';

const StyledWeatherDetailsItem = styled.div`
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
  filter: brightness(115%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 30%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
`;
const DetailsIcon = styled.i`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;
const DetailsDescription = styled.p`
  text-align: center;
  margin-bottom: 0.5rem;
  color: rgb(255, 255, 255, 0.5);
`;
const DetailsValue = styled.p``;

const WeatherDetailsItem = ({ data, bgcolor }) => {
  let detailsIcon = '';
  let detailsDescription = '';
  let detailsValue;
  if (Object.keys(data).includes('dew_point')) {
    detailsIcon = 'wi wi-thermometer-internal';
    detailsDescription = 'Dew point';
    detailsValue = Math.round(data.dew_point) + '\u00B0';
  } else if (Object.keys(data).includes('feels_like')) {
    detailsIcon = 'wi wi-thermometer';
    detailsDescription = 'Feels like';
    detailsValue = data.feels_like + '\u00B0';
  } else if (Object.keys(data).includes('humidity')) {
    detailsIcon = 'wi wi-raindrops';
    detailsDescription = 'Humidity';
    detailsValue = data.humidity + ' %';
  } else if (Object.keys(data).includes('pressure')) {
    detailsIcon = 'wi wi-barometer';
    detailsDescription = 'Pressure';
    detailsValue = data.pressure + ' mmhg';
  } else if (Object.keys(data).includes('uvi')) {
    detailsIcon = 'wi wi-day-sunny';
    detailsDescription = 'UV';
    detailsValue = data.uvi;
  } else if (Object.keys(data).includes('wind_speed')) {
    detailsIcon = 'wi wi-strong-wind';
    detailsDescription = 'Wind speed';
    detailsValue = data.wind_speed + ' m/s';
  }
  return (
    <StyledWeatherDetailsItem bgcolor={bgcolor}>
      <DetailsIcon className={detailsIcon}></DetailsIcon>
      <DetailsDescription>{detailsDescription}</DetailsDescription>
      <DetailsValue>{detailsValue}</DetailsValue>
    </StyledWeatherDetailsItem>
  );
};

export default WeatherDetailsItem;
