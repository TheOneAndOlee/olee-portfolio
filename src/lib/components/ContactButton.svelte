<script lang="ts">
	let { name = "Platform", icon = "", link = "#" } = $props();
</script>

<a 
	href={link} 
	target="_blank" 
	rel="noopener noreferrer"
	class="flex flex-col items-center gap-4 bg-neutral-300 p-6 w-full hover:bg-neutral-400 transition-colors"
>
	<div class="w-24 h-24 flex items-center justify-center">
		{#if icon}
			<img 
				src={icon} 
				alt={name} 
				class="w-full h-full object-contain"
			/>
		{:else}
			<div class="w-full h-full bg-neutral-200 border-2 border-black"></div>
		{/if}
	</div>
	<span class="text-lg font-medium">{name}</span>
</a>
