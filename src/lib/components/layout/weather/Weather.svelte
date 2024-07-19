<script lang="ts">
	import Headline from '$lib/components/primitives/typography/headline/Headline.svelte';
	import type { CityWeatherResponse } from '$lib/server/data/api/weather';
	let { city, weather }: { city: string; weather: CityWeatherResponse } = $props();
</script>

<div class="flex flex-col p-4">
	<div class="flex items-center justify-between gap-6">
		<div class="flex flex-col">
			<div class="flex items-center gap-1">
				<Headline lvl="h3" class="mb-0">
					{city}
				</Headline>
				<span class="text-lg font-extrabold uppercase">
					-
					{weather.temperature}°C
				</span>
			</div>
			<p class="text-xs">
				{new Intl.DateTimeFormat('de', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				}).format(new Date(weather.timestamp))}
			</p>
		</div>

		<div
			class="compass"
			style:--wind-direction={weather.avg_wind_direction}
			style:--wind-speed={weather.avg_wind_speed}
		>
			<span class="north dir">N</span>
			<span class="west dir">W</span>
			<span class="east dir">E</span>
			<span class="south dir">S</span>
			{#if weather.avg_wind_direction}
				<div
					class="circle_wrapper relative flex aspect-square items-center overflow-hidden rounded-full border-2 border-black p-1"
				>
					<svg
						class="absolute inset-0 -z-10 size-6 opacity-15"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 28.92 24.07"
					>
						<g>
							<path
								fill="none"
								stroke="#000"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								stroke-dasharray="80 130"
								stroke-miterlimit="10"
								d="M2.73 12.03H24.4c1.94 0 3.52-1.57 3.52-3.52s-1.57-3.52-3.52-3.52-3.52 1.57-3.52 3.52"
							>
								<animate
									attributeName="stroke-dashoffset"
									dur="3.9s"
									repeatCount="indefinite"
									values="-27; 90"
								/>
							</path>
							<path
								fill="none"
								stroke="#000"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								stroke-dasharray="80 130"
								stroke-miterlimit="10"
								d="M1 8.03h11.71c1.94 0 3.52-1.57 3.52-3.52S14.66.99 12.71.99 9.19 2.56 9.19 4.51"
								><animate
									attributeName="stroke-dashoffset"
									dur="3.9s"
									repeatCount="indefinite"
									values="-27; 90"
								/>
							</path>
							<path
								fill="none"
								stroke="#000"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								stroke-dasharray="80 130"
								stroke-miterlimit="10"
								d="M3.84 16.03h14.62c1.94 0 3.52 1.57 3.52 3.52s-1.57 3.52-3.52 3.52-3.52-1.57-3.52-3.52"
								><animate
									attributeName="stroke-dashoffset"
									dur="3.9s"
									repeatCount="indefinite"
									values="-27; 90"
								/>
							</path>
						</g>
					</svg>
					<div class="circle flex flex-col gap-6">
						<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars-->
						{#each { length: 2 } as _, i}
							<svg
								data-i={i}
								class=" size-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 256 256"
								><path
									fill="currentColor"
									d="M208.49 120.49a12 12 0 0 1-17 0L140 69v147a12 12 0 0 1-24 0V69l-51.51 51.49a12 12 0 0 1-17-17l72-72a12 12 0 0 1 17 0l72 72a12 12 0 0 1 0 17"
								/></svg
							>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
	><path
		fill="none"
		stroke="#e5e7eb"
		stroke-dasharray="35 22"
		stroke-linecap="round"
		stroke-miterlimit="10"
		stroke-width="3"
		d="M43.64 20a5 5 0 113.61 8.46h-35.5"
		><animate
			attributeName="stroke-dashoffset"
			dur="2s"
			repeatCount="indefinite"
			values="-57; 57"
		/></path
	><path
		fill="none"
		stroke="#e5e7eb"
		stroke-dasharray="24 15"
		stroke-linecap="round"
		stroke-miterlimit="10"
		stroke-width="3"
		d="M29.14 44a5 5 0 103.61-8.46h-21"
		><animate
			attributeName="stroke-dashoffset"
			begin="-1.5s"
			dur="2s"
			repeatCount="indefinite"
			values="-39; 39"
		/></path
	></svg
> -->

<style>
	.compass {
		display: grid;
		place-items: center;
		row-gap: 0.1rem;
		column-gap: 0.2rem;
		grid-template-areas:
			'. N .'
			'W C E'
			'. S .';

		.dir {
			pointer-events: none;
			font-size: 0.7rem;
			font-weight: bold;
		}

		.north {
			grid-area: N;
		}

		.west {
			grid-area: W;
		}

		.east {
			grid-area: E;
		}

		.south {
			grid-area: S;
		}

		.circle_wrapper {
			grid-area: C;
		}

		.circle {
			animation: wind calc(30s / var(--wind-speed)) linear infinite;
		}
	}

	@keyframes wind {
		0% {
			transform: rotate(calc(var(--wind-direction) * -1deg)) translateY(0%);
		}
		100% {
			transform: rotate(calc(var(--wind-direction) * -1deg)) translateY(calc(100% * -1));
		}
	}
</style>
