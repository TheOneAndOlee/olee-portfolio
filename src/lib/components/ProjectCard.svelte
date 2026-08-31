<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { colors } from '$lib/data/colors';
	import type { GameEngine, ImageVerticalAlign } from '$lib/types';

	interface Props {
		name?: string;
		link?: string;
		image?: string;
		platforms?: string[];
		gameEngine?: GameEngine | null;
		imageVerticalAlign?: ImageVerticalAlign | string;
	}

	let {
		name = 'Name',
		link = '/',
		image = '',
		platforms = [],
		gameEngine = null,
		imageVerticalAlign = 'middle'
	}: Props = $props();

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
	const { AccentGold } = colors;
	const mediaFrameStyle = `border-color: ${AccentGold}; background-color: var(--color-control-bg);`;
	const engineBadgeStyle = `background-color: var(--color-control-hover-bg); color: var(--color-control-fg);`;
	const moreButtonStyle = `border-color: ${AccentGold}; background-color: var(--color-control-bg); color: var(--color-control-fg); --more-hover-bg: var(--color-control-hover-bg); --more-hover-text: var(--color-control-fg);`;

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
			containFillRatio >= MIN_IMAGE_FILL_RATIO
				? 1
				: Math.sqrt(MIN_IMAGE_FILL_RATIO / containFillRatio);
	}
</script>

<div class="project-card flex w-full flex-col items-start gap-3">
	<div class="flex w-full items-center justify-between">
		<a href={resolve(link as Pathname)} class="project-title text-xl">
			<span>{name}</span>
		</a>
		{#if platforms && platforms.length > 0}
			<div class="flex items-center gap-2">
				{#each platforms as platform (platform)}
					<img src={platform} alt="platform" class="invertible-image h-7 w-7 object-contain" />
				{/each}
			</div>
		{/if}
	</div>
	<a
		href={resolve(link as Pathname)}
		aria-label={`View ${name} project`}
		class="project-media relative block aspect-video w-full overflow-hidden border-[3px]"
		style={mediaFrameStyle}
	>
		{#if image}
			<div class="project-image-wrap h-full w-full">
				<img
					src={image}
					alt={name}
					onload={handleImageLoad}
					class={`block h-full w-full object-contain transition-transform duration-200 ease-out ${objectPositionClassByAlign[normalizedImageVerticalAlign]} ${transformOriginClassByAlign[normalizedImageVerticalAlign]}`}
					style={`transform: scale(${imageScale});`}
				/>
			</div>
		{:else}
			<div class="h-full w-full" aria-hidden="true"></div>
		{/if}

		{#if gameEngine?.icon}
			<div class="absolute right-2 bottom-2 px-2 py-1">
				<img
					src={gameEngine.icon}
					alt={gameEngine.name}
					title={gameEngine.name}
					class="h-12 w-auto object-contain"
				/>
			</div>
		{:else if gameEngine?.name}
			<div
				class="absolute right-2 bottom-2 px-2 py-1 text-xs leading-none"
				style={engineBadgeStyle}
			>
				{gameEngine.name}
			</div>
		{/if}
	</a>
	<a
		href={resolve(link as Pathname)}
		class="more-link self-center border px-8 py-1 text-sm"
		style={moreButtonStyle}
	>
		View project
	</a>
</div>

<style>
	.project-title {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.project-media {
		transition:
			box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.project-image-wrap {
		transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.project-media:hover,
	.project-media:focus-visible {
		box-shadow: 0.45rem 0.45rem 0 color-mix(in srgb, var(--color-accent) 72%, transparent);
		transform: translate(-0.22rem, -0.22rem);
	}

	.project-media:hover .project-image-wrap,
	.project-media:focus-visible .project-image-wrap {
		transform: scale(1.025);
	}

	.more-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		transition:
			background-color 150ms ease-in-out,
			transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.more-link:hover {
		background-color: var(--more-hover-bg);
		color: var(--more-hover-text);
		transform: translateY(-0.15rem);
	}
</style>
