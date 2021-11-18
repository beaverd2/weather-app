import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const StyledRainChart = styled.div`
  padding-top: 1rem;
  margin-bottom: 1rem;
  max-width: 480px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const StyledChart = styled.div`
  position: relative;
  width: 1500px;
  margin-top: -3rem;
`;

const ChartWrapper = styled.div`
  overflow-x: scroll;
`;

const StyledRainChartTitle = styled.p`
  padding-left: 1rem;
  padding-right: 1rem;
  text-transform: uppercase;
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
const RainChart = ({ weatherHourly, timezone }) => {
  const weatherData = weatherHourly.weather.map((weather) => {
    const now = new Date();
    if (
      new Date(weather.dt * 1000).getHours() === now.getHours() &&
      new Date(weather.dt * 1000).getDay() === now.getDay()
    ) {
      return {
        pop: Math.floor(weather.pop * 100),
        dt: 'Now',
      };
    } else {
      return {
        pop: Math.floor(weather.pop * 100),
        dt:
          new Date(weather.dt * 1000)
            .toLocaleString('ru-RU', {
              timeZone: timezone,
            })
            .split(',')[1]
            .substring(0, 3) + ':00',
      };
    }
  });
  return (
    <StyledRainChart>
      <StyledRainChartTitle>precipitation</StyledRainChartTitle>
      <ChartWrapper>
        <StyledChart>
          <Line
            height={200}
            options={{
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    display: false,
                  },
                ],
              },
              layout: {
                padding: {
                  top: 100,
                  left: 30,
                  right: 30,
                },
              },
              plugins: {
                datalabels: {
                  formatter: function (value, index, values) {
                    if (value > 0) {
                      value = value.toString();
                      value = value.split(/(?=(?:...)*$)/);
                      value = value.join(',');
                      return value + '%';
                    } else {
                      value = '';
                      return value;
                    }
                  },
                },
              },
            }}
            data={{
              labels: weatherData.map((data) => {
                return data.dt;
              }),
              datasets: [
                {
                  data: weatherData.map((data) => {
                    return data.pop;
                  }),
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: ['rgb(255, 255, 255, 0.5)'],
                  borderWidth: 1,
                  borderDash: [5, 5],
                  pointBackgroundColor: (context) =>
                    context.dataIndex === 0
                      ? 'rgb(255, 255, 255, 1)'
                      : 'rgb(255, 255, 255, 0.3)',
                  pointBorderColor: 'rgb(255, 255, 255, 0)',
                  pointBorderWidth: 0,
                  pointRadius: 3,
                  pointHoverBorderWidth: 0,
                  pointHoverRadius: 3,
                },
              ],
            }}
          />
        </StyledChart>
      </ChartWrapper>
    </StyledRainChart>
  );
};

export default memo(RainChart);
