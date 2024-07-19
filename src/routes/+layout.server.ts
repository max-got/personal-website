import type { LayoutServerLoad } from './$types';
import { getCityWeatherData } from '$lib/server/data/api/weather';

export const load = (async ({ fetch }) => {
	return {
		weather_data: {
			Potsdam: await getCityWeatherData('potsdam', { fetchfunction: fetch }),
			Hiddensee: await getCityWeatherData('hiddensee', { fetchfunction: fetch })
		}
	};
}) satisfies LayoutServerLoad;
