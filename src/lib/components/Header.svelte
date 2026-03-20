<script lang="ts">
	import { colors } from '$lib/data/colors';

	const { TextWhite, AccentGold } = colors;
	const nameStyle = `color: ${AccentGold};`;
	const navLinksStyle = `color: ${TextWhite};`;
</script>

<nav class="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
	<a href="/" class="text-2xl font-normal sm:text-3xl lg:text-4xl" style={nameStyle}>Osmond Lee</a>
	<div class="flex gap-6 text-base sm:gap-10 sm:text-xl lg:gap-16 lg:text-2xl" style={navLinksStyle}>
		<a href="/resume" class="hover:opacity-70">Resume</a>
		<a href="/about" class="hover:opacity-70">About</a>
		<a href="/socials" class="hover:opacity-70">Socials</a>
	</div>
</nav>
