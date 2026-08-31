<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import './layout.css';
	import colors from '$lib/data/colors.json';

	let { children } = $props();
	const isProjectDetail = $derived(page.route.id === '/projects/[slug]');

	type DocumentWithViewTransitions = Document & {
		startViewTransition: (callback: () => Promise<void>) => void;
	};

	onNavigate((navigation) => {
		if (!('startViewTransition' in document)) {
			return;
		}

		return new Promise<void>((resolve) => {
			(document as DocumentWithViewTransitions).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Osmond Lee</title>
	{#if !isProjectDetail}
		<meta
			name="description"
			content="Student gameplay programmer and designer working with Unreal Engine, Unity, and Godot."
		/>
		<meta property="og:type" content="website" />
		<meta property="og:title" content="Osmond Lee | Gameplay Programmer & Designer" />
		<meta
			property="og:description"
			content="Selected games, interactive projects, and programming work by Osmond Lee."
		/>
		<meta property="og:image" content="https://toao.dev/og.png" />
		<meta property="og:image:alt" content="Osmond Lee — Gameplay Programmer & Designer" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Osmond Lee | Gameplay Programmer & Designer" />
		<meta
			name="twitter:description"
			content="Selected games, interactive projects, and programming work by Osmond Lee."
		/>
		<meta name="twitter:image" content="https://toao.dev/og.png" />
	{/if}
	<link rel="icon" href="/favicon.svg" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `
		<style>
			:root, :root[data-theme='light'] {
				--color-text: ${colors.BackgroundBlack};
				--color-hover: ${colors.BackgroundBlack};
				--color-bg: ${colors.HoverWhite};
				--color-accent: ${colors.AccentGold};
				--color-control-bg: ${colors.TextWhite};
				--color-control-fg: ${colors.BackgroundBlack};
				--color-control-hover-bg: ${colors.HoverWhite};
			}
		</style>
	`}
</svelte:head>
{@render children()}
