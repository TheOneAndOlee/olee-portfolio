<script lang="ts">
	import { colors } from '$lib/data/colors';

	type ImageVerticalAlign = 'top' | 'middle' | 'bottom';

	let {
		name = "Name",
		link = "#",
		image = "",
		platforms = [],
		gameEngine = null,
		imageVerticalAlign = 'middle'
	} = $props();

	const CONTAINER_ASPECT_RATIO = 16 / 9;
	const MIN_IMAGE_FILL_RATIO = 2 / 3;
	let imageScale = $state(1);

	const objectPositionClassByAlign: Record<ImageVerticalAlign, string> = {
		top: 'object-top',
		middle: 'object-center',
		bottom: 'object-bottom'
	};

	const transformOriginClassByAlign: Record<ImageVerticalAlign, string> = {
		top: 'origin-top',
		middle: 'origin-center',
		bottom: 'origin-bottom'
	};

	function normalizeImageVerticalAlign(value: unknown): ImageVerticalAlign {
		return value === 'top' || value === 'bottom' || value === 'middle' ? value : 'middle';
	}

	const normalizedImageVerticalAlign = $derived(normalizeImageVerticalAlign(imageVerticalAlign));
	const { TextWhite, HoverWhite, BackgroundBlack, AccentGold } = colors;
	const mediaFrameStyle = `border-color: ${AccentGold}; background-color: ${TextWhite};`;
	const engineBadgeStyle = `background-color: ${HoverWhite}; color: ${BackgroundBlack};`;
	const moreButtonStyle = `border-color: ${AccentGold}; background-color: ${TextWhite}; color: ${BackgroundBlack}; --more-hover-bg: ${HoverWhite};`;

	function getContainFillRatio(imageWidth: number, imageHeight: number): number {
		if (imageWidth <= 0 || imageHeight <= 0) {
			return 1;
		}

		const imageAspectRatio = imageWidth / imageHeight;

		return imageAspectRatio >= CONTAINER_ASPECT_RATIO
			? CONTAINER_ASPECT_RATIO / imageAspectRatio
			: imageAspectRatio / CONTAINER_ASPECT_RATIO;
	}

	function handleImageLoad(event: Event): void {
		const target = event.currentTarget;

		if (!(target instanceof HTMLImageElement)) {
			return;
		}

		const containFillRatio = getContainFillRatio(target.naturalWidth, target.naturalHeight);

		imageScale =
			containFillRatio >= MIN_IMAGE_FILL_RATIO ? 1 : Math.sqrt(MIN_IMAGE_FILL_RATIO / containFillRatio);
	}
</script>

<div class="flex flex-col items-start gap-3 w-full">
	<div class="flex items-center justify-between w-full">
		<span class="text-xl">{name}</span>
		{#if platforms && platforms.length > 0}
			<div class="flex items-center gap-2">
				{#each platforms as platform}
					<img src={platform} alt="platform" class="h-7 w-7 object-contain" />
				{/each}
			</div>
		{/if}
	</div>
	<a
		href={link}
		aria-label={`View ${name} project`}
		class="relative block aspect-video w-full overflow-hidden border-[3px]"
		style={mediaFrameStyle}
	>
		{#if image}
			<img 
				src={image} 
				alt={name} 
				onload={handleImageLoad}
				class={`block h-full w-full object-contain transition-transform duration-200 ease-out ${objectPositionClassByAlign[normalizedImageVerticalAlign]} ${transformOriginClassByAlign[normalizedImageVerticalAlign]}`}
				style={`transform: scale(${imageScale});`}
			/>
		{:else}
			<div class="h-full w-full" aria-hidden="true"></div>
		{/if}

		{#if gameEngine?.icon}
			<div class="absolute bottom-2 right-2 px-2 py-1">
				<img src={gameEngine.icon} alt={gameEngine.name} title={gameEngine.name} class="h-12 w-auto object-contain" />
			</div>
		{:else if gameEngine?.name}
			<div class="absolute bottom-2 right-2 px-2 py-1 text-xs leading-none" style={engineBadgeStyle}>
				{gameEngine.name}
			</div>
		{/if}
	</a>
	<a href={link} class="more-link self-center border px-8 py-1 text-sm" style={moreButtonStyle}>
		More
	</a>
</div>

<style>
	.more-link {
		transition: background-color 150ms ease-in-out;
	}

	.more-link:hover {
		background-color: var(--more-hover-bg);
	}
</style>
