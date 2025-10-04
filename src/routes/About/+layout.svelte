<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ConstellationBackground from '$lib/components/ui/ConstellationEffect/ConstellationEffect.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ConstellationBackground />

{@render children?.()}
