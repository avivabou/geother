import './HomePage.css';
import { useState } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import WeatherCardRow from '../../Components/WeatherCardsRow/WeatherCardsRow';
import {
  get5DaysWeatherInLocation,
  searchCitiesByTerm,
} from '../../Services/apiRequests';
import { Action } from '../../Types/generics';

function HomePage() {
  const [forecasts, setForecasts] = useState<any>([]);

  const onLocationSelect = async (location: string) => {
    console.log({ location });
    get5DaysWeatherInLocation(location).then(setForecasts);
  };

  const sta = [];

  const act: Action = {
    getTitle: () => (sta.length === 0 ? 'Add To Favorite' : 'remove'),
    onAction: (data) => {
      sta.push(data);
      console.log(data);
      console.log({ sta });
    },
  };

  return (
    <div className="HomePage">
      <SearchBar
        onSelect={onLocationSelect}
        getSearchOptions={searchCitiesByTerm}
      />
      <WeatherCardRow dailyForecasts={forecasts} actions={[act]} />
    </div>
  );
}

export default HomePage;
