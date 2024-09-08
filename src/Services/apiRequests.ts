import { ACCWEATHER_API_KEY, ACCWEATHER_API_URL } from '../constants';

const buildRequestUrl = (searchTerm: string) =>
  `${ACCWEATHER_API_URL}?apikey=${ACCWEATHER_API_KEY}&q=${searchTerm}`;

async function searchCitiesByTerm(searchTerm: string) {
  const requestUrl = buildRequestUrl(searchTerm);
  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return Array.from(
      new Set(
        data.map(
          ({ LocalizedName }: { LocalizedName: string }) => LocalizedName
        )
      )
    ) as string[];
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return [];
  }
}

// eslint-disable-next-line import/prefer-default-export
export { searchCitiesByTerm };
