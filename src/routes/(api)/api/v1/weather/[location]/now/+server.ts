import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Zod_WeatherNow } from '$lib/server/data/api/weather.schema';

import { AVAILABLE_SLUGS, type WeatherLocation } from '$lib/server/data/api/weather.routes';
import { building } from '$app/environment';

const WEATHER_API_URL = 'https://api.brightsky.dev' as const;

const COORDINATES_MAP = {
	potsdam: { lat: 52.39886, lon: 13.06566 },
	hiddensee: { lat: 54.38333, lon: 13.08333 }
} as const satisfies Record<WeatherLocation, { lat: number; lon: number }>;

export const GET: RequestHandler = async ({ params, isSubRequest }) => {
	// Only for internal requests
	if (!isSubRequest && !building) {
		return json(
			{
				error: 'Invalid request'
			},

			{ status: 400 }
		);
	}
	const { location } = params;

	if (!AVAILABLE_SLUGS.includes(location as WeatherLocation)) {
		return json(
			{
				error: 'Invalid location',
				available_locations: AVAILABLE_SLUGS
			},

			{ status: 400 }
		);
	}

	const { lat, lon } = COORDINATES_MAP[location as WeatherLocation];

	const response = await fetch(
		`${WEATHER_API_URL}/current_weather?lat=${lat}&lon=${lon}&units=dwd`
	);

	if (!response.ok) {
		throw new Error('Weather API request failed');
	}

	const data = await response.json();

	const parsed_data = Zod_WeatherNow.parse(data);

	return json(parsed_data);
};
