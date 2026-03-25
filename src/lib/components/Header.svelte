<script lang="ts">
	import { onMount } from 'svelte';
	import { colors } from '$lib/data/colors';

	type Theme = 'dark' | 'light';

	const storageKey = 'portfolio-theme';
	const { TextWhite, AccentGold } = colors;
	const nameStyle = `color: ${TextWhite};`;
	const navLinksStyle = `color: ${TextWhite};`;
	const themeToggleStyle = `border-color: ${AccentGold};`;
	let theme = $state<Theme>('light');

	const themeToggleLabel = $derived(theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
	const themeToggleText = $derived(theme === 'dark' ? 'Light' : 'Dark');

	function applyTheme(nextTheme: Theme): void {
		document.documentElement.setAttribute('data-theme', nextTheme);
		theme = nextTheme;
	}

	function toggleTheme(): void {
		const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

		applyTheme(nextTheme);

		try {
			localStorage.setItem(storageKey, nextTheme);
		} catch {
			// Ignore storage failures in private mode or restricted browsers.
		}
	}

	onMount(() => {
		const rootTheme = document.documentElement.getAttribute('data-theme');
		if (rootTheme === 'dark' || rootTheme === 'light') {
			theme = rootTheme;
			return;
		}

		const nextTheme: Theme = 'light';

		applyTheme(nextTheme);
	});
</script>

<nav class="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
	<a href="/" class="text-2xl font-normal sm:text-3xl lg:text-4xl" style={nameStyle}>Osmond Lee</a>
	<div class="flex items-center gap-3 text-base sm:gap-6 sm:text-xl lg:gap-8 lg:text-2xl" style={navLinksStyle}>
		<a href="/resume" class="hover:opacity-70">Resume</a>
		<a href="/about" class="hover:opacity-70">About</a>
		<a href="/socials" class="hover:opacity-70">Socials</a>
		<!-- <button
			type="button"
			onclick={toggleTheme}
			aria-label={themeToggleLabel}
			class="theme-toggle rounded-sm border px-2 py-1 text-[0.65rem] sm:text-sm lg:text-base"
			style={themeToggleStyle}
		>
			{themeToggleText}
		</button> -->
	</div>
</nav>
