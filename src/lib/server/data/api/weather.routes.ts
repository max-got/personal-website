export const AVAILABLE_SLUGS = ['potsdam', 'hiddensee'] as const;
export type WeatherLocation = (typeof AVAILABLE_SLUGS)[number];
