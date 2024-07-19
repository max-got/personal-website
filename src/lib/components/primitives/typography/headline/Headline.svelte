<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HeadlineProps } from '.';

	import H1 from './h1.svelte';
	import H2 from './h2.svelte';
	import H3 from './h3.svelte';

	let {
		lvl,
		class: className = '',
		children,
		...rest
	}: HeadlineProps & { lvl: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' } = $props();

	const base_class = /*tw*/ 'text-balance lowercase font-sans font-semibold';
</script>

{#if lvl === 'h1'}
	<H1 class={cn('mb-2 text-2xl tracking-tighter', base_class, className)} {...rest}>
		{@render children()}
	</H1>
{:else if lvl === 'h2'}
	<H2 class={cn('mb-2 text-xl tracking-tight', base_class, className)} {...rest}>
		{@render children()}
	</H2>
{:else if lvl === 'h3'}
	<H3 class={cn('mb-1 text-lg tracking-tight', base_class, className)} {...rest}>
		{@render children()}
	</H3>
{/if}
