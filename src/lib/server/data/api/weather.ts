import type { WeatherLocation } from './weather.routes';
import type { WeatherNow } from './weather.schema';

const weather_now_api = '/api/v1/weather/[location]/now' as const;

const average = (values: (number | null)[]): number => {
	const filteredValues = values.filter((v) => v !== null) as number[];
	const sum = filteredValues.reduce((a, b) => a + b, 0);
	return Math.round(sum / filteredValues.length);
};

export const getCityWeatherData = async <T extends WeatherLocation>(
	city: T,
	{ fetchfunction }: { fetchfunction: typeof fetch }
) => {
	const response = await fetchfunction(weather_now_api.replace('[location]', city));
	if (!response.ok) {
		throw new Error('Weather API request failed');
	}
	const { weather } = (await response.json()) as WeatherNow;

	const modifiedData = {
		...weather,
		avg_wind_direction: average([
			weather.wind_direction_10,
			weather.wind_direction_30,
			weather.wind_direction_60
		]),
		avg_wind_speed: average([weather.wind_speed_10, weather.wind_speed_30, weather.wind_speed_60])
	};

	return modifiedData;
};

export type CityWeatherResponse = Awaited<ReturnType<typeof getCityWeatherData>>;
