import './FavoritesPage.css';
import { useEffect, useState } from 'react';
import { Action } from '../../Types/generics';
import PageSection from '../../Components/PageSection/PageSection';
import WeatherCardRow from '../../Components/WeatherCardsRow/WeatherCardsRow';
import { get5DaysWeatherInLocation } from '../../Services/apiRequests';
import { DayForecast } from '../../Types/weatherInfo';
import { parseStringToMapItem } from '../../Services/utils';

const SECTION_BACKGROUND_URL =
  // eslint-disable-next-line max-len
  'https://static.vecteezy.com/system/resources/previews/002/054/629/non_2x/dark-cloudy-sky-banner-free-photo.jpg';

function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesInfo, setFavoritesInfo] = useState<DayForecast[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favoritesList = JSON.parse(storedFavorites);

      favoritesList.forEach((favorite: string) => {
        const location = parseStringToMapItem(favorite);

        get5DaysWeatherInLocation(location.key).then((forecast) =>
          setFavoritesInfo((prev) => {
            if (prev.find(({ title }) => title === location.value)) {
              return prev;
            }
            return prev.concat({
              ...forecast[0],
              title: location.value,
            });
          })
        );
      });
      setFavorites(favoritesList);
    }
  }, []);

  const removeFromFavorites: Action = {
    getTitle: () => 'remove',
    onAction: (locationCode) => {
      const newFavorites = favorites.filter(
        (location) => locationCode !== parseStringToMapItem(location).key
      );
      setFavorites(newFavorites);
      setFavoritesInfo(favoritesInfo.filter(({ key }) => key !== locationCode));
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    },
  };

  return (
    <div className="FavoritesPage">
      <PageSection backgroundUrl={SECTION_BACKGROUND_URL}>
        Your Favorites
      </PageSection>
      <WeatherCardRow
        dailyForecasts={favoritesInfo}
        actions={[removeFromFavorites]}
      />
    </div>
  );
}

export default FavoritesPage;
