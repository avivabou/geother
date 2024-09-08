import { MapItem } from '../Types/generics';

function fahrenheitToCelsius(fahrenheit: number): string {
  const celsius = Math.round(((fahrenheit - 32) * 5) / 9);
  return `${celsius}°C`;
}

function getDayNameByDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

function mapItemToString(mapItem: MapItem): string {
  return `${mapItem.key}#${mapItem.value}`;
}

function parseStringToMapItem(item: string): MapItem {
  const [key, value] = item.split('#');
  return { key, value };
}

export {
  fahrenheitToCelsius,
  getDayNameByDate,
  mapItemToString,
  parseStringToMapItem,
};
