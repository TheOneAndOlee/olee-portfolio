<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import colors from '$lib/data/colors.json';

	let { children } = $props();
</script>

<svelte:head>
	<title>Osmond Lee</title>
	<link rel="icon" href={favicon} />
	{@html `
		<style>
			:root, :root[data-theme='light'] {
				--color-text: ${colors.TextWhite};
				--color-hover: ${colors.HoverWhite};
				--color-bg: ${colors.BackgroundBlack};
				--color-accent: ${colors.AccentGold};
				--color-control-bg: ${colors.TextWhite};
				--color-control-fg: ${colors.BackgroundBlack};
				--color-control-hover-bg: ${colors.HoverWhite};
			}
		</style>
	`}
</svelte:head>
{@render children()}
