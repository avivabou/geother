import { useState } from 'react';
import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import SearchBar from './Components/SearchBar/SearchBar';
import WeatherCardRow from './Components/WeatherCardsRow/WeatherCardsRow';
import {
  get5DaysWeatherInLocation,
  searchCitiesByTerm,
} from './Services/apiRequests';

const menuItems = [
  { title: 'Home', onClick: () => console.log('Go to Home') },
  { title: 'Favorites', onClick: () => console.log('Go to About') },
];

const menuLogoItem = {
  logoUrl:
    // eslint-disable-next-line max-len
    'https://img.freepik.com/free-vector/snowflake-sunny-weather-icon_1308-128681.jpg?t=st=1725725589~exp=1725729189~hmac=69740bdfb8af3ba9449522a46d3a949061be19e97c91c696562b8a9acabd6e5a&w=1060',
  onClick: () => console.log('Go to LOGO'),
};

function App() {
  const [forecasts, setForecasts] = useState<any>([]);

  const onLocationSelect = async (location: string) => {
    console.log({ location });
    get5DaysWeatherInLocation(location).then(setForecasts);
  };

  return (
    <div className="App">
      <MenuBar menuItems={menuItems} menuLogoItem={menuLogoItem} />
      <SearchBar
        onSelect={onLocationSelect}
        getSearchOptions={searchCitiesByTerm}
      />
      <WeatherCardRow dailyForecasts={forecasts} />
    </div>
  );
}

export default App;
