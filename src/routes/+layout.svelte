<script lang="ts">
	import '../styles/app.css';
	import Weather from '$lib/components/layout/weather/Weather.svelte';

	let { data, children } = $props();
</script>

<div class="relative">
	<div
		class="wrapper relative z-0 mx-auto flex h-[300vh] min-h-screen max-w-screen-lg flex-col items-center"
	>
		{@render children()}
	</div>

	<div class="flex flex-wrap items-center gap-2">
		{#each Object.entries(data.weather_data) as [city, weather]}
			<Weather {city} {weather} />
		{/each}
	</div>
</div>

<style>
</style>
