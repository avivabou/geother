function fahrenheitToCelsius(fahrenheit: number): string {
  const celsius = Math.round(((fahrenheit - 32) * 5) / 9);
  return `${celsius}°C`;
}

function getDayNameByDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// eslint-disable-next-line import/prefer-default-export
export { fahrenheitToCelsius, getDayNameByDate };
