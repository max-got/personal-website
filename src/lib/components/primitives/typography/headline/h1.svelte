<script lang="ts">
	import type { HeadlineProps } from '.';

	let { class: className = '', children, ...rest }: HeadlineProps = $props();
</script>

<h1 class={className} {...rest}>
	{@render children()}
</h1>
