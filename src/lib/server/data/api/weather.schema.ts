import { z } from 'zod';

const Zod_WeatherNow = z.object({
	weather: z.object({
		timestamp: z.string().datetime({ offset: true }),
		source_id: z.number().int(),
		cloud_cover: z.number().nullable(),
		condition: z.enum(['dry', 'fog', 'rain', 'sleet', 'snow', 'hail', 'thunderstorm']).nullable(),
		dew_point: z.number().nullable(),
		icon: z
			.enum([
				'clear-day',
				'clear-night',
				'partly-cloudy-day',
				'partly-cloudy-night',
				'cloudy',
				'fog',
				'wind',
				'rain',
				'sleet',
				'snow',
				'hail',
				'thunderstorm'
			])
			.nullable(),
		precipitation_10: z.number().nullable(),
		precipitation_30: z.number().nullable(),
		precipitation_60: z.number().nullable(),
		pressure_msl: z.number().nullable(),
		relative_humidity: z.number().int().nullable(),
		solar_10: z.number().nullable(),
		solar_30: z.number().nullable(),
		solar_60: z.number().nullable(),
		sunshine_30: z.number().nullable(),
		sunshine_60: z.number().nullable(),
		temperature: z.number().nullable(),
		visibility: z.number().int().nullable(),
		wind_direction_10: z.number().int().nullable(),
		wind_direction_30: z.number().int().nullable(),
		wind_direction_60: z.number().int().nullable(),
		wind_speed_10: z.number().nullable(),
		wind_speed_30: z.number().nullable(),
		wind_speed_60: z.number().nullable(),
		wind_gust_direction_10: z.number().int().nullable(),
		wind_gust_direction_30: z.number().int().nullable(),
		wind_gust_direction_60: z.number().int().nullable(),
		wind_gust_speed_10: z.number().nullable(),
		wind_gust_speed_30: z.number().nullable(),
		wind_gust_speed_60: z.number().nullable(),
		fallback_source_ids: z.record(z.string(), z.number().int())
	}),
	sources: z.array(
		z.object({
			id: z.number().int(),
			dwd_station_id: z.string().nullable(),
			wmo_station_id: z.string().nullable(),
			station_name: z.string().nullable(),
			observation_type: z.enum(['forecast', 'synop', 'current', 'historical']),
			first_record: z.string().datetime({ offset: true }),
			last_record: z.string().datetime({ offset: true }),
			lat: z.number(),
			lon: z.number(),
			height: z.number(),
			distance: z.number()
		})
	)
});

export type WeatherNow = z.infer<typeof Zod_WeatherNow>;

export { Zod_WeatherNow };
