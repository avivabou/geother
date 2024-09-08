import React from 'react';
import './WeatherCard.css';
import { GetDayIconUrl } from '../../Services/apiRequests';

type WeatherCardProps = {
  title: string;
  weatherStatus: string;
  iconCode: number;
  temperature?: string;
  functions?: {
    actionName: string;
    onAction: (key: string) => void;
  }[];
};

function WeatherCard({
  title,
  weatherStatus,
  iconCode,
  temperature,
  functions,
}: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h2 className="weather-title">{title}</h2>
      <p className="weather-status">{weatherStatus}</p>
      <img
        className="weather-image"
        src={GetDayIconUrl(iconCode)}
        alt="Weather Icon"
      />
      <div className="weather-actions">
        {temperature && <p className="weather-temperature">{temperature}</p>}
        {functions?.map((func, index) => (
          <button
            key={index}
            className="weather-action-button"
            onClick={() => func.onAction(func.actionName)}
            type="button"
          >
            {func.actionName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;
