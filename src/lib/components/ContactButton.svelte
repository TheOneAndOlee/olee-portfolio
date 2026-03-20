<script lang="ts">
	import { colors } from '$lib/data/colors';

	let { name = "Platform", icon = "", link = "#" } = $props();
	const { AccentGold } = colors;
	const buttonStyle = `background-color: var(--color-control-bg); color: var(--color-control-fg); border: 1px solid ${AccentGold}; --contact-hover-bg: var(--color-control-hover-bg);`;
	const placeholderStyle = `background-color: var(--color-control-hover-bg); border: 2px solid ${AccentGold};`;
</script>

<a 
	href={link} 
	target="_blank" 
	rel="noopener noreferrer"
	class="contact-button flex w-full flex-col items-center gap-4 p-6 transition-colors"
	style={buttonStyle}
>
	<div class="w-24 h-24 flex items-center justify-center">
		{#if icon}
			<img 
				src={icon} 
				alt={name} 
				class="w-full h-full object-contain"
			/>
		{:else}
			<div class="h-full w-full" style={placeholderStyle}></div>
		{/if}
	</div>
	<span class="text-lg font-medium">{name}</span>
</a>

<style>
	.contact-button:hover {
		background-color: var(--contact-hover-bg);
	}
</style>
