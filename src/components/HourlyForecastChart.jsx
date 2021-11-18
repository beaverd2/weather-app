import React, { memo } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';
import Chart from 'chart.js';

defaults.global.tooltips.enabled = false;
defaults.global.legend.display = false;
defaults.global.defaultFontColor = 'white';
defaults.global.defaultFontFamily = 'Montserrat';

Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
  align: 'top',
  font: { size: 14 },
});

const rain = new Image(30, 30);
rain.src = '/img/rain.svg';

const snow = new Image(30, 30);
snow.src = '/img/snow.svg';

const StyledChart = styled.div`
  position: relative;
  width: 1500px;
`;

const ChartWrapper = styled.div`
  overflow-x: scroll;
`;

const HourlyForecastChart = ({ weatherHourly, timezoneprop }) => {
  const weatherData = weatherHourly.weather.map((weather) => {
    const now = new Date();
    if (
      new Date(weather.dt * 1000).getHours() === now.getHours() &&
      new Date(weather.dt * 1000).getDay() === now.getDay()
    ) {
      return {
        temp: Math.round(weather.temp),
        dt: 'Now',
        pop: weather.pop,
      };
    } else {
      return {
        temp: Math.round(weather.temp),
        dt:
          new Date(weather.dt * 1000)
            .toLocaleString('ru-RU', {
              timeZone: timezoneprop,
            })
            .split(',')[1]
            .substring(0, 3) + ':00',
        pop: weather.pop,
      };
    }
  });

  let rainIndexes = weatherData.map((weather, index) => {
    if (weather.pop > 0.5 && weather.temp > 0) {
      return index;
    }
    return null;
  });

  let snowIndexes = weatherData.map((weather, index) => {
    if (weather.pop > 0.5 && weather.temp < 0) {
      return index;
    }
    return null;
  });

  const datasetKeyProvider = () => {
    return btoa(Math.random()).substring(0, 12);
  };
  console.log(weatherHourly);
  return (
    <ChartWrapper>
      <StyledChart>
        <Line
          height={200}
          datasetKeyProvider={datasetKeyProvider}
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
                formatter: function (value, context) {
                  return value + '\u00B0';
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
                  return data.temp;
                }),
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: ['rgb(255, 255, 255, 0.5)'],
                borderWidth: 1,
                borderDash: [5, 5],
                pointBackgroundColor: (context) => {
                  if (
                    context.dataIndex === 0 &&
                    !rainIndexes.includes(context.dataIndex)
                  ) {
                    return 'rgb(255, 255, 255, 1)';
                  }
                  if (
                    context.dataIndex !== 0 &&
                    !rainIndexes.includes(context.dataIndex)
                  ) {
                    return 'rgb(255, 255, 255, 0.3)';
                  }
                },
                pointBorderColor: 'rgb(255, 255, 255, 0)',
                pointBorderWidth: 0,
                pointRadius: 3,
                pointHoverBorderWidth: 0,
                pointHoverRadius: 3,
              },
              {
                data: weatherData
                  .map((data) => {
                    return data.temp;
                  })
                  .map((v, i) => (rainIndexes.includes(i) ? v : null)),
                // datalabels: {
                //   labels: {
                //     title: null,
                //   },
                // },
                borderColor: 'none',
                fill: false,
                pointStyle: rain,
                // pointRadius: 22,
                // pointHoverRadius: 22,
              },
              {
                data: weatherData
                  .map((data) => {
                    return data.temp;
                  })
                  .map((v, i) => (snowIndexes.includes(i) ? v : null)),
                // datalabels: {
                //   labels: {
                //     title: null,
                //   },
                // },
                borderColor: 'none',
                fill: false,
                pointStyle: snow,
                // pointRadius: 22,
                // pointHoverRadius: 22,
              },
            ],
          }}
        />
      </StyledChart>
    </ChartWrapper>
  );
};

export default memo(HourlyForecastChart);
