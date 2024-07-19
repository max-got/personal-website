<script lang="ts">
	import { animate, scroll, timeline, type TimelineDefinition, type TimelineSegment } from 'motion';
	import EtSign from './et-zeichen.webp';
	import Overlay from './bg.png';
	import { cn } from '$lib/utils/cn';
	import { onMount } from 'svelte';

	let { class: className = '' } = $props();

	let hero = $state<HTMLDivElement>();
	let light_beam = $state<HTMLDivElement>();

	onMount(() => {
		const sequence: TimelineDefinition = [
			[
				hero!,
				{
					transform: [null, 'scale(0.9) translateY(-40px)']
				},
				{
					easing: [0.76, 0, 0.24, 1]
				}
			] as TimelineSegment,
			[
				light_beam!,
				{
					transform: [null, 'translateX(40%) translateY(-60%)']
				},
				{
					at: '<',
					easing: 'ease-out',
					duration: 1.5
				}
			] as TimelineSegment
		];

		const enter_animation = animate(
			hero!,
			{
				scale: 0.96
			},
			{
				easing: [0.68, -0.6, 0.32, 1.6],
				delay: 0.4
			}
		);

		const scroll_animation = () => scroll(timeline(sequence));
		enter_animation.finished.then(() => scroll_animation());
	});
</script>

<div
	class={cn(
		'hero',
		'relative grid grid-cols-1 grid-rows-1 place-items-center overflow-hidden rounded-xl bg-slate-50/20 outline outline-1 outline-offset-4 outline-[rgba(255,165,0,0.3)] will-change-transform [--h:33] [--hsvh:calc(var(--h)_*_1svh)] [--hvh:calc(var(--h)_*_1vh)]',
		className
	)}
	bind:this={hero}
>
	<div
		class="c relative z-20 m-3 flex min-h-[--vh] max-w-lg flex-col items-center justify-center gap-2 rounded-[16px] bg-white px-4 pb-6 pt-4 mix-blend-lighten outline outline-1 outline-offset-4 outline-white supports-[height:100svh]:min-h-[--hsvh]"
	>
		<div class="abstract_wrapper grid">
			<img
				class="abstract pointer-events-none z-10 size-16 select-none lg:size-24"
				src="/gottschalk.webp"
				alt=""
				loading="eager"
				fetchpriority="high"
			/>
		</div>

		<div
			class="relative flex flex-col gap-3 rounded-lg border border-black/15 px-4 py-4 shadow-inner shadow-black/15"
		>
			<h1 class="text-balance text-4xl lowercase tracking-tighter">
				Moin, ich bin <span class="upper font-bold">Max</span>!<br /> Fullstack-Developer,
				Svelte-Enthusiast
				<span class="mx-1 inline-block">
					<img
						src={EtSign}
						class="pointer-events-none -mb-1 h-9 w-5 select-none"
						alt="et drawn"
						loading="eager"
						fetchpriority="high"
					/>
					<span class="sr-only">&</span>
				</span>
				<span class="relative inline-block">
					Web-Passionist
					<span class="absolute top-0 inline-block text-sm">
						<p class="footnote pointer-events-none select-none">1</p>
					</span>.
				</span>
			</h1>
			<div class="flex flex-col gap-1 text-balance">
				<hr class="border-black" />
				<p>
					<span class="footnote">1</span>
					<span> Liebe zum Web, </span>
					Leidenschaft für Design und Code, der Wille zum Lernern sowie die Faszination für die Möglichkeiten
					des Internets sind mein Antrieb.
				</p>
			</div>
		</div>
	</div>
	<div class="bg relative h-full overflow-hidden rounded-[16px] opacity-90">
		<img class="-z-10 object-cover opacity-20" src={Overlay} alt="" />
		<div class="golden-hour-sky z-10">
			<div class="light-beam" bind:this={light_beam}></div>
		</div>
	</div>
</div>

<style>
	.golden-hour-sky {
		position: absolute;
		content: '';
		inset: 0;
		background: linear-gradient(
			to top right,
			white 0%,
			/* Indigo for darker sky */ #800080 20%,
			/* Purple */ #b22222 40%,
			/* Firebrick red */ #ff8c00 60%,
			/* Dark orange */ #800080 80%,
			/* Purple */ white 100% /* Indigo for darker sky */
		);

		overflow: hidden;
	}

	.light-beam {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			-45deg,
			transparent 0%,
			rgba(255, 255, 255, 0) 20%,
			rgba(255, 255, 255, 1) 22%,
			rgba(255, 223, 0, 0.8) 23%,
			rgba(255, 165, 0, 0.6) 32%,
			rgba(255, 69, 0, 0.4) 41%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(255, 69, 0, 0.4) 59%,
			rgba(255, 165, 0, 0.6) 68%,
			rgba(255, 223, 0, 0.8) 77%,
			rgba(255, 255, 255, 1) 78%,
			rgba(255, 255, 255, 0) 80%,
			transparent 100%
		);

		filter: blur(10px);
	}

	.c,
	.bg {
		grid-column: 1;
		grid-row: 1;
	}

	.footnote {
		font-variant: diagonal-fractions;
	}

	.abstract {
		grid-column: 1;
		grid-row: 1;
	}
</style>
