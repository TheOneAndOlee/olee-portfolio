<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { getTileMedia } from '$lib/bento-media';
	import type {
		BentoAppearance,
		BentoLayout,
		BentoPosition,
		BentoSettings,
		BentoSize,
		InterestTile
	} from '$lib/data/interests';
	import InterestBento from './InterestBento.svelte';

	let {
		items,
		settings,
		label = 'Interests and hobbies',
		level = 3,
		nested = false
	}: {
		items: InterestTile[];
		settings: BentoSettings;
		label?: string;
		level?: number;
		nested?: boolean;
	} = $props();

	function whole(value: number, fallback = 1, minimum = 1): number {
		return Number.isFinite(value) ? Math.max(minimum, Math.floor(value)) : fallback;
	}

	function layoutStyle(layout: BentoLayout, name: string): string {
		const columns = whole(layout.size.width);
		const rows = whole(layout.size.height, 0, 0);
		const rowHeight =
			layout.rowHeight === 'square'
				? `calc((100cqw - ${columns - 1} * var(--bento-gap)) / ${columns})`
				: layout.rowHeight;
		const rowTrack = rowHeight === 'equal' ? 'minmax(auto, 1fr)' : `minmax(${rowHeight}, auto)`;
		const rowTemplate = rows > 0 ? `repeat(${rows}, ${rowTrack})` : 'none';
		return `--${name}-columns: ${columns}; --${name}-template-rows: ${rowTemplate}; --${name}-row-track: ${rowTrack};`;
	}

	function spanStyle(
		size: BentoSize,
		layout: BentoLayout,
		name: string,
		position?: BentoPosition
	): string {
		const columns = whole(layout.size.width);
		const width = Math.min(whole(size.width), columns);
		const column = position ? Math.min(whole(position.column), columns - width + 1) : 'auto';
		const row = position ? whole(position.row) : 'auto';
		return `--${name}-width: ${width}; --${name}-height: ${whole(size.height)}; --${name}-column: ${column}; --${name}-row: ${row};`;
	}

	function appearance(item: InterestTile): BentoAppearance {
		return {
			background: item.background ?? settings.background,
			textColor: item.textColor ?? settings.textColor,
			accentColor: item.accentColor ?? settings.accentColor,
			borderColor: item.borderColor ?? settings.borderColor,
			borderWidth: item.borderWidth ?? settings.borderWidth,
			radius: item.radius ?? settings.radius,
			padding: item.padding ?? settings.padding
		};
	}

	function childSettings(item: InterestTile): BentoSettings {
		return {
			...appearance(item),
			desktop: { size: { width: 2, height: 2 }, rowHeight: 'equal' },
			tablet: { size: { width: 2, height: 2 }, rowHeight: 'equal' },
			mobile: { size: { width: 1, height: 0 }, rowHeight: 'auto' },
			gap: settings.gap,
			...item.grid
		};
	}

	function tileStyle(item: InterestTile): string {
		const theme = appearance(item);
		const { image } = getTileMedia(item);
		const imageCaption = !!image && item.text?.placement !== 'outside';
		return [
			spanStyle(item.size, settings.desktop, 'desktop', item.position),
			spanStyle(
				item.tabletSize ?? { width: item.size.width, height: 1 },
				settings.tablet,
				'tablet',
				item.tabletPosition
			),
			spanStyle(
				item.mobileSize ?? { width: item.size.width, height: 1 },
				settings.mobile,
				'mobile',
				item.mobilePosition
			),
			`--tile-background: ${theme.background};`,
			`--tile-text: ${theme.textColor};`,
			`--tile-accent: ${theme.accentColor};`,
			`--tile-border: ${theme.borderColor};`,
			`--tile-border-width: ${theme.borderWidth};`,
			`--tile-radius: ${theme.radius};`,
			`--tile-padding: ${theme.padding};`,
			`--image-ratio: ${image?.aspectRatio ?? '1 / 1'};`,
			`--image-fit: ${image?.fit ?? 'cover'};`,
			`--image-position: ${image?.position ?? 'center'};`,
			`--image-overlay: ${image?.overlay ?? 'transparent'};`,
			`--caption-color: ${item.text?.color ?? theme.textColor};`,
			`--caption-background: ${item.text?.background ?? (imageCaption ? theme.background : 'transparent')};`,
			`--caption-padding: ${item.text?.padding ?? (imageCaption ? '0.75rem' : '0')};`,
			`--caption-gap: ${item.text?.gap ?? '0.5rem'};`,
			`--caption-max-width: ${item.text?.maxWidth ?? '100%'};`
		].join(' ');
	}

	const gridStyle = $derived(
		[
			`--bento-gap: ${settings.gap};`,
			layoutStyle(settings.desktop, 'desktop'),
			layoutStyle(settings.tablet, 'tablet'),
			layoutStyle(settings.mobile, 'mobile')
		].join(' ')
	);
</script>

{#snippet caption(item: InterestTile)}
	{@const media = getTileMedia(item)}
	<div
		class="tile-caption"
		class:anchored={!!(item.text || media.image)}
		class:compact={nested}
		data-corner={item.text?.corner ?? 'bottom-left'}
		data-align={item.align ?? 'top'}
	>
		<div class="tile-content">
			<svelte:element this={`h${Math.min(level, 6)}`} class="tile-title">
				{#if media.href}
					<!-- Dynamic config supports external URLs, fragments, and resolved local paths. -->
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<a
						class="tile-link"
						class:full-tile-link={!item.children?.length}
						href={media.href.startsWith('/') ? resolve(media.href as Pathname) : media.href}
						target={media.newTab ? '_blank' : undefined}
						rel={media.newTab ? 'noopener noreferrer' : undefined}
						aria-label={item.linkLabel ||
							(media.newTab ? `${item.title} (opens in a new tab)` : undefined)}>{item.title}</a
					>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				{:else}
					{item.title}
				{/if}
			</svelte:element>
			{#if item.description}<p>{item.description}</p>{/if}
			{#if item.tags?.length}
				<ul class="tile-tags" aria-label={`${item.title} favorites`}>
					{#each item.tags as tag, index (index)}<li>{tag}</li>{/each}
				</ul>
			{/if}
		</div>
	</div>
{/snippet}

<div class="bento-container" class:nested style={gridStyle}>
	<ul class="bento-grid" aria-label={label}>
		{#each items as item (item.id)}
			{@const media = getTileMedia(item)}
			<li
				class="bento-tile"
				class:tile-group={!!item.children?.length}
				data-corner={item.text?.corner ?? 'bottom-left'}
				data-placement={item.text?.placement ?? 'inside'}
				style={tileStyle(item)}
			>
				{#if item.text?.placement === 'outside'}
					{@render caption(item)}
				{/if}
				<div class="tile-surface" class:has-image={!!media.image}>
					{#if media.image}
						<div class="tile-media">
							<img src={media.image.src} alt={media.image.alt} loading="lazy" decoding="async" />
							<div class="image-overlay" aria-hidden="true"></div>
						</div>
					{/if}
					{#if media.showPlayIcon}
						<span class="youtube-play" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7Z" /></svg>
						</span>
					{/if}
					{#if item.text?.placement !== 'outside'}
						{@render caption(item)}
					{/if}
					{#if item.children?.length}
						<InterestBento
							items={item.children}
							settings={childSettings(item)}
							label={`${item.title} details`}
							level={level + 1}
							nested
						/>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.bento-container {
		container: interests / inline-size;
		min-width: 0;
	}

	.bento-container.nested {
		flex: 1;
	}

	.nested > .bento-grid {
		height: 100%;
	}

	.bento-grid {
		--columns: var(--desktop-columns);
		--template-rows: var(--desktop-template-rows);
		--row-track: var(--desktop-row-track);
		display: grid;
		grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
		grid-template-rows: var(--template-rows);
		grid-auto-rows: var(--row-track);
		gap: var(--bento-gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.bento-tile {
		position: relative;
		grid-column: var(--desktop-column) / span var(--desktop-width);
		grid-row: var(--desktop-row) / span var(--desktop-height);
		display: flex;
		min-width: 0;
		flex-direction: column;
		gap: var(--caption-gap);
		color: var(--tile-text);
		overflow-wrap: anywhere;
	}

	.tile-surface {
		position: relative;
		isolation: isolate;
		display: flex;
		min-width: 0;
		flex: 1;
		flex-direction: column;
		gap: 1.5rem;
		padding: var(--tile-padding);
		border-style: solid;
		border-width: var(--tile-border-width);
		border-color: var(--tile-border);
		border-radius: var(--tile-radius);
		background: var(--tile-background);
	}

	.tile-surface.has-image,
	.bento-tile[data-placement='outside'] > .tile-surface {
		aspect-ratio: var(--image-ratio);
	}

	.tile-media,
	.tile-media img,
	.image-overlay {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.tile-media {
		z-index: -1;
		overflow: hidden;
		border-radius: inherit;
	}

	.tile-media img {
		display: block;
		object-fit: var(--image-fit);
		object-position: var(--image-position);
	}

	.image-overlay {
		background: var(--image-overlay);
		pointer-events: none;
	}

	.tile-caption {
		z-index: 1;
		display: flex;
		min-width: 0;
		flex: 1;
		flex-direction: column;
		gap: 1.5rem;
		color: var(--caption-color);
	}

	.tile-group > .tile-surface > .tile-caption {
		flex: 0 0 auto;
	}

	.tile-caption.anchored {
		width: fit-content;
		max-width: min(100%, var(--caption-max-width));
		flex: 0 0 auto;
		align-self: flex-start;
		gap: 0.65rem;
		padding: var(--caption-padding);
		background: var(--caption-background);
	}

	.tile-caption.anchored[data-corner$='right'] {
		align-self: flex-end;
		text-align: right;
	}

	.tile-caption.anchored > .tile-content {
		margin: 0;
	}

	.tile-caption.anchored[data-corner$='right'] .tile-tags {
		justify-content: flex-end;
	}

	.bento-tile[data-corner^='bottom'] > .tile-surface > .tile-caption.anchored {
		order: 1;
		margin-top: auto;
	}

	.bento-tile[data-corner^='bottom'] > .tile-caption {
		order: 1;
	}

	.tile-content {
		margin-top: auto;
	}

	.tile-caption:not(.anchored)[data-align='top'] > .tile-content {
		margin-top: 0;
		margin-bottom: auto;
	}

	.tile-caption:not(.anchored)[data-align='center'] > .tile-content {
		margin-block: auto;
	}

	.tile-group > .tile-surface > .tile-caption > .tile-content {
		margin: 0;
	}

	.tile-title {
		margin: 0;
		font-size: clamp(1.25rem, 3.6cqw, 2rem);
		font-weight: 400;
		line-height: 1.15;
		text-wrap: balance;
	}

	.tile-caption:not(.anchored) > .tile-content > .tile-title {
		color: var(--tile-accent);
	}

	.tile-link {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.16em;
	}

	.tile-link:hover {
		text-decoration-thickness: 2px;
	}

	.full-tile-link::after {
		position: absolute;
		z-index: 2;
		inset: 0;
		content: '';
		border-radius: var(--tile-radius);
	}

	.full-tile-link:focus-visible {
		outline: none;
	}

	.full-tile-link:focus-visible::after {
		outline: 3px solid var(--color-accent);
		outline-offset: 4px;
	}

	.youtube-play {
		position: absolute;
		top: 50%;
		left: 50%;
		display: grid;
		width: 3rem;
		height: 2.25rem;
		place-items: center;
		background: #1c1e1ee6;
		color: #fff;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.youtube-play svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	.tile-caption.compact > .tile-content > .tile-title {
		font-size: clamp(1rem, 4cqw, 1.25rem);
	}

	p {
		margin: 0.75rem 0 0;
		font-size: 1rem;
		line-height: 1.55;
	}

	.tile-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1.25rem 0 0;
		padding: 0;
		list-style: none;
	}

	.tile-tags li {
		max-width: 100%;
		padding: 0.3rem 0.65rem;
		border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
		border-radius: var(--tile-radius);
		font-size: 0.875rem;
		line-height: 1.4;
	}

	@container interests (max-width: 44rem) {
		.bento-grid {
			--columns: var(--tablet-columns);
			--template-rows: var(--tablet-template-rows);
			--row-track: var(--tablet-row-track);
		}

		.bento-tile {
			grid-column: var(--tablet-column) / span var(--tablet-width);
			grid-row: var(--tablet-row) / span var(--tablet-height);
		}
	}

	@container interests (max-width: 28rem) {
		.bento-grid {
			--columns: var(--mobile-columns);
			--template-rows: var(--mobile-template-rows);
			--row-track: var(--mobile-row-track);
		}

		.bento-tile {
			grid-column: var(--mobile-column) / span var(--mobile-width);
			grid-row: var(--mobile-row) / span var(--mobile-height);
		}
	}
</style>
