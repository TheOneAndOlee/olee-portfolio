<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { colors } from '$lib/data/colors';

	const { TextWhite } = colors;
	const nameStyle = `color: ${TextWhite};`;
	const navLinksStyle = `color: ${TextWhite};`;

	const navItems = [
		{ label: 'Resume', href: '/resume' },
		{ label: 'About', href: '/about' },
		{ label: 'Socials', href: '/socials' }
	] as const;

	function isActive(href: string): boolean {
		return page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
	}
</script>

<nav
	class="site-header sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-7"
>
	<a
		href={resolve('/')}
		class="brand-link text-2xl font-normal sm:text-3xl lg:text-4xl"
		style={nameStyle}
	>
		Osmond Lee
	</a>
	<div
		class="flex items-center gap-3 text-base sm:gap-6 sm:text-xl lg:gap-8 lg:text-2xl"
		style={navLinksStyle}
	>
		{#each navItems as item (item.href)}
			<a
				href={resolve(item.href)}
				class:active={isActive(item.href)}
				class="nav-link"
				aria-current={isActive(item.href) ? 'page' : undefined}
			>
				{item.label}
			</a>
		{/each}
	</div>
</nav>

<style>
	.site-header {
		background: color-mix(in srgb, var(--color-bg) 88%, transparent);
		backdrop-filter: blur(14px);
	}

	.brand-link,
	.nav-link {
		position: relative;
	}

	.brand-link::after {
		position: absolute;
		right: -0.35em;
		bottom: 0.12em;
		width: 0.2em;
		aspect-ratio: 1;
		content: '';
		background: var(--color-accent);
		border-radius: 999px;
		transform: scale(0);
		transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.brand-link:hover::after,
	.brand-link:focus-visible::after {
		transform: scale(1);
	}

	.nav-link::after {
		position: absolute;
		right: 0;
		bottom: -0.2em;
		left: 0;
		height: 2px;
		content: '';
		background: var(--color-accent);
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.nav-link:hover::after,
	.nav-link:focus-visible::after,
	.nav-link.active::after {
		transform: scaleX(1);
		transform-origin: left;
	}
</style>
