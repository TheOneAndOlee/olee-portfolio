<script lang="ts">
	import { colors } from '$lib/data/colors';

	interface Props {
		name?: string;
		icon?: string;
		link?: string;
	}

	let { name = 'Platform', icon = '', link = '#' }: Props = $props();
	const { AccentGold } = colors;
	const buttonStyle = `background-color: var(--color-control-bg); color: var(--color-control-fg); border: 1px solid ${AccentGold}; --contact-hover-bg: var(--color-control-hover-bg);`;
	const placeholderStyle = `background-color: var(--color-control-hover-bg); border: 2px solid ${AccentGold};`;
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a
	href={link}
	target="_blank"
	rel="external noopener noreferrer"
	class="contact-button flex w-full flex-col items-center gap-4 p-6 transition-colors"
	style={buttonStyle}
>
	<div class="contact-icon flex h-24 w-24 items-center justify-center">
		{#if icon}
			<img src={icon} alt={name} class="h-full w-full object-contain" />
		{:else}
			<div class="h-full w-full" style={placeholderStyle}></div>
		{/if}
	</div>
	<span class="text-lg font-medium">{name}</span>
</a>

<style>
	.contact-button:hover {
		background-color: var(--contact-hover-bg);
		box-shadow: 0.45rem 0.45rem 0 color-mix(in srgb, var(--color-accent) 72%, transparent);
		transform: translate(-0.2rem, -0.2rem);
	}

	.contact-button {
		transition:
			background-color 150ms ease-in-out,
			box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.contact-icon {
		transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.contact-button:hover .contact-icon,
	.contact-button:focus-visible .contact-icon {
		transform: translateY(-0.2rem) rotate(-2deg);
	}
</style>
