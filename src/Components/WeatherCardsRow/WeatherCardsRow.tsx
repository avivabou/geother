import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import './WeatherCardsRow.css';
import { DayForecast } from '../../Types/weatherInfo';
import { getDayNameByDate } from '../../Services/utils';

type WeatherCardRowProps = {
  dailyForecasts: DayForecast[];
};

function WeatherCardRow({ dailyForecasts }: WeatherCardRowProps) {
  return (
    <div className="weather-card-row">
      {dailyForecasts.map((data, index) => (
        <WeatherCard
          key={index}
          title={getDayNameByDate(data.date)}
          weatherStatus={data.weatherStatus}
          iconCode={data.iconCode}
          temperature={data.temperature}
          // functions={data.functions}
        />
      ))}
    </div>
  );
}

export default WeatherCardRow;
