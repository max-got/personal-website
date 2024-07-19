<script lang="ts">
	import type { HeadlineProps } from '.';

	let { class: className = '', children, ...rest }: HeadlineProps = $props();
</script>

<h2 class={className} {...rest}>
	{@render children()}
</h2>
