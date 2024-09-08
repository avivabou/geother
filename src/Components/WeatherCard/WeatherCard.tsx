import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { GetDayIconUrl } from '../../Services/apiRequests';
import { Action } from '../../Types/generics';

type WeatherCardProps = {
  title: string;
  weatherStatus: string;
  iconCode: number;
  temperature?: string;
  actions?: Action[];
};

function WeatherCard({
  title,
  weatherStatus,
  iconCode,
  temperature,
  actions,
}: WeatherCardProps) {
  const getActionTitles = () =>
    actions?.map(({ getTitle }) => getTitle()) ?? [];

  const [actionTitles, setActionTitles] = useState<string[]>(getActionTitles());

  const onAction = (action: Action) => {
    action.onAction();
    setActionTitles(getActionTitles());
  };

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
        {actions?.map((action, index) => (
          <button
            key={index}
            className="weather-action-button"
            onClick={() => onAction(action)}
            type="button"
          >
            {actionTitles[index]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;
