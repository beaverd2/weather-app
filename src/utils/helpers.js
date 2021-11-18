const OPEN_WEATHER_API_KEY = 'c64b931276a265d2e66653532b034aeb';
const MAP_BOX_API_KEY =
  'pk.eyJ1IjoiYmVhdmVyZDIiLCJhIjoiY2twN2ZtZWtwMTAzbTJ3cXRkMGYzY2hpZCJ9.807sP9msVnf209wbv6xlkw';

const getGeocode = async (location) => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?types=place&access_token=${MAP_BOX_API_KEY}`;

  const geocodeList = await fetch(URL)
    .then((data) => data.json())
    .then((result) => result.features);

  const coordinates = geocodeList[0].center;
  // The ternary operator prevents return of city in non-Latin letters (places with Japanese letters for example)
  const city = geocodeList[0].matching_text
    ? geocodeList[0].matching_text
    : geocodeList[0].text;

  return { coordinates, city };
};

function getPosition(options) {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

const getReverseGeocode = async () => {
  const location = await getPosition((position) => {
    return {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    };
  });
  const longitude = location.coords.longitude;
  const latitude = location.coords.latitude;
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=place&access_token=${MAP_BOX_API_KEY}`;

  const geocodeList = await fetch(URL)
    .then((data) => data.json())
    .then((result) => result.features);

  // const coordinates = [longitude, latitude];
  const coordinates = [longitude, latitude];
  // The ternary operator prevents return of city in non-Latin letters (places with Japanese letters for example)
  const city = geocodeList[0].text
    ? geocodeList[0].text
    : geocodeList[0].place_name[0];

  return { coordinates, city };
};

export const getWeather = async (location, isReverse) => {
  const geocodeResult = isReverse
    ? await getReverseGeocode()
    : await getGeocode(location);
  const [lon, lat] = geocodeResult.coordinates;
  // .split(/\b\s[Ss]hi\b/) cut off japanese city sufix ('Iwata Shi' == after split() ==> 'Iwata')
  const city = geocodeResult.city.split(/\b\s[Ss]hi\b/)[0];

  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&units=metric&appid=${OPEN_WEATHER_API_KEY}`;

  const weatherResult = await fetch(URL)
    .then((data) => data.json())
    .then((result) => result);
  console.log(weatherResult);
  const currentWeather = {
    temp: weatherResult.hourly[0].temp,
    main: weatherResult.hourly[0].weather[0].main,
    timezone: weatherResult.timezone,
  };
  const weatherHourly = { weather: weatherResult.hourly.slice(0, 24) };

  const weatherDetails = [
    { feels_like: Math.round(weatherResult.hourly[0].feels_like) },
    { wind_speed: Math.round(weatherResult.hourly[0].wind_speed) },
    { humidity: weatherResult.hourly[0].humidity },
    { pressure: Math.round(weatherResult.hourly[0].pressure / 1.333) },
    { uvi: weatherResult.hourly[0].uvi },
    { dew_point: weatherResult.hourly[0].dew_point },
  ];

  const weatherWeekly = { weather: weatherResult.daily.slice(1, 8) };

  return [
    { currentWeather, weatherHourly, weatherDetails, weatherWeekly },
    city,
  ];
};

const getLocalTime = (timezone) => {
  let d = new Date().toLocaleString('ru-RU', { timeZone: timezone });
  return d;
};

export const setBackground = (timezone) => {
  const hour = getLocalTime(timezone).split(',')[1].substring(0, 3);
  if (hour < 5 || hour > 20) {
    return 'night';
  }
  if (hour >= 5 && hour <= 15) {
    return 'day';
  }
  return 'evening';
};
