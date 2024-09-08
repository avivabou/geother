import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import './WeatherCardsRow.css';
import { DayForecast } from '../../Types/weatherInfo';
import { Action } from '../../Types/generics';

type WeatherCardRowProps = {
  dailyForecasts: DayForecast[];
  actions?: Action[];
};

function WeatherCardRow({ dailyForecasts, actions }: WeatherCardRowProps) {
  const getActionsWithBoundData = (data: DayForecast) =>
    actions?.map((action) => ({
      getTitle: action.getTitle,
      onAction: () => action.onAction(data),
    }));

  return (
    <div className="weather-card-row">
      {dailyForecasts.map((data, index) => (
        <WeatherCard
          key={index}
          title={data.title}
          weatherStatus={data.weatherStatus}
          iconCode={data.iconCode}
          temperature={data.temperature}
          actions={getActionsWithBoundData(data)}
        />
      ))}
    </div>
  );
}

export default WeatherCardRow;
