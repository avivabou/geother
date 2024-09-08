import './HomePage.css';
import { useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import WeatherCardRow from '../../Components/WeatherCardsRow/WeatherCardsRow';
import {
  get5DaysWeatherInLocation,
  searchCitiesByTerm,
} from '../../Services/apiRequests';
import { Action, MapItem } from '../../Types/generics';
import PageSection from '../../Components/PageSection/PageSection';
import WeatherCard from '../../Components/WeatherCard/WeatherCard';
import { DayForecast } from '../../Types/weatherInfo';
import { mapItemToString } from '../../Services/utils';

const SECTION_BACKGROUND_URL =
  // eslint-disable-next-line max-len
  'https://static.vecteezy.com/system/resources/previews/002/054/629/non_2x/dark-cloudy-sky-banner-free-photo.jpg';

type SelectedLocationForecasts = {
  selectedLocation: MapItem;
  forecasts: DayForecast[];
};

function HomePage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedForecasts, setForecasts] = useState<SelectedLocationForecasts>(
    {} as SelectedLocationForecasts
  );

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const updateFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const onLocationSelect = async (location: MapItem) => {
    get5DaysWeatherInLocation(location.key).then((forecasts) =>
      setForecasts({ selectedLocation: location, forecasts })
    );
  };

  const getSectionContent = () => {
    const { selectedLocation, forecasts } = selectedForecasts;
    const today = forecasts?.[0];

    const addToFavoritesAction: Action = {
      getTitle: () =>
        favorites.includes(mapItemToString(selectedLocation))
          ? 'Remove From Favorites'
          : 'Add To Favorites',
      onAction: () => {
        const locationString = mapItemToString(selectedLocation);
        if (favorites.includes(locationString)) {
          updateFavorites(favorites.filter((key) => key !== locationString));
        } else {
          updateFavorites(favorites.concat([locationString]));
        }
      },
    };

    return selectedLocation ? (
      <WeatherCard
        key="section-content"
        title={selectedLocation.value}
        iconCode={today?.iconCode}
        weatherStatus={today?.weatherStatus}
        actions={[addToFavoritesAction]}
      />
    ) : null;
  };

  return (
    <div className="HomePage">
      <SearchBar
        onSelect={onLocationSelect}
        getSearchOptions={searchCitiesByTerm}
      />
      <PageSection backgroundUrl={SECTION_BACKGROUND_URL}>
        {getSectionContent()}
      </PageSection>
      <WeatherCardRow dailyForecasts={selectedForecasts?.forecasts ?? []} />
    </div>
  );
}

export default HomePage;
