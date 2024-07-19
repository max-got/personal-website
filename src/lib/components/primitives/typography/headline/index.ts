import Headline from './Headline.svelte';
import type { Snippet } from 'svelte';

export type HeadlineProps = {
	class?: string;
	children: Snippet;
};

export default Headline;
