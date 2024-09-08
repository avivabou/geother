import {
  ACCWEATHER_API_KEY,
  ACCWEATHER_GET_5DAYS_WEATHER_API,
  ACCWEATHER_GET_DAY_ICON_API,
  ACCWEATHER_GET_LOCATIONS_API,
} from '../constants';
import { MapItem } from '../Types/generics';

const buildGetLocationsUrl = (searchTerm: string) =>
  `${ACCWEATHER_GET_LOCATIONS_API}
?apikey=${ACCWEATHER_API_KEY}&q=${searchTerm}`;

const buildGet5DaysWeatherUrl = (location: string) =>
  `${ACCWEATHER_GET_5DAYS_WEATHER_API}/${location}
?apikey=${ACCWEATHER_API_KEY}`;

const GetDayIconUrl = (dayIcon: number) =>
  `${ACCWEATHER_GET_DAY_ICON_API}/${String(dayIcon).padStart(2, '0')}-s.png`;

async function searchCitiesByTerm(searchTerm: string) {
  const requestUrl = buildGetLocationsUrl(searchTerm);
  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      console.error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return Array.from(
      new Set(
        data.map(
          ({ Key, LocalizedName }: { Key: string; LocalizedName: string }) => ({
            key: Key,
            value: LocalizedName,
          })
        )
      )
    ) as MapItem[];
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return [];
  }
}

async function get5DaysWeatherInLocation(location: string) {
  const requestUrl = buildGet5DaysWeatherUrl(location);
  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      console.error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return [];
  }
}

export { searchCitiesByTerm, get5DaysWeatherInLocation, GetDayIconUrl };
