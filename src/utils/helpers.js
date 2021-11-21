const {
  REACT_APP_OPEN_WEATHER_API_KEY: OPEN_WEATHER_API_KEY,
  REACT_APP_MAP_BOX_API_KEY: MAP_BOX_API_KEY,
} = process.env;

const getGeocode = async (location) => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?types=place&access_token=${MAP_BOX_API_KEY}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const geocodeList = data.features;
    if (geocodeList.length > 0) {
      const coordinates = geocodeList[0].center;
      // The ternary operator prevents return of city in non-Latin letters (places with Japanese letters for example)
      const city = geocodeList[0].matching_text
        ? geocodeList[0].matching_text
        : geocodeList[0].text;
      return { coordinates, city };
    } else return { error: 'No location found' };
  } catch (error) {
    console.log(error);
  }
};

const getPosition = (options) => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  ).catch((error) => ({ error }));
};

const getReverseGeocode = async () => {
  const location = await getPosition((position) => {
    return {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    };
  });
  if (location?.error?.message) {
    return { error: location.error.message };
  }
  const longitude = location.coords.longitude;
  const latitude = location.coords.latitude;
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=place&access_token=${MAP_BOX_API_KEY}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const geocodeList = data.features;

    const coordinates = [longitude, latitude];
    // The ternary operator prevents return of city in non-Latin letters (places with Japanese letters for example)
    const city = geocodeList[0].text
      ? geocodeList[0].text
      : geocodeList[0].place_name[0];

    return { coordinates, city };
  } catch (error) {
    console.log(error);
  }
};

export const getWeather = async (location, isReverse) => {
  const geocodeResult = isReverse
    ? await getReverseGeocode()
    : await getGeocode(location);
  if ('error' in geocodeResult) {
    return geocodeResult;
  }
  const [lon, lat] = geocodeResult.coordinates;
  // .split(/\b\s[Ss]hi\b/) cut off japanese city sufix ('Iwata Shi' == after split() ==> 'Iwata')
  const city = geocodeResult.city.split(/\b\s[Ss]hi\b/)[0];

  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  try {
    const response = await fetch(URL);
    const weatherResult = await response.json();
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
  } catch (error) {
    console.log(error);
  }
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
