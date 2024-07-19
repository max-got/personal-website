<script lang="ts">
	import { cn } from '$lib/utils/cn';

	import type { HeadlineProps } from '.';

	let { class: className = '', children, ...rest }: HeadlineProps = $props();
</script>

<h3 class={cn(className)} {...rest}>
	{@render children()}
</h3>
