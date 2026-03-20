<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { colors } from '$lib/data/colors';

	const { TextWhite, BackgroundBlack, AccentGold } = colors;
	const pageStyle = `background-color: ${BackgroundBlack}; color: ${TextWhite};`;
	const headingStyle = `color: ${AccentGold};`;
</script>

<div class="min-h-screen" style={pageStyle}>
	<Header />
	
	<main class="flex flex-col items-center px-8 pb-12 pt-6">
		<h1 class="text-5xl font-normal mb-12" style={headingStyle}>About</h1>
		<p class="text-xl">About page content coming soon...</p>
	</main>
</div>
