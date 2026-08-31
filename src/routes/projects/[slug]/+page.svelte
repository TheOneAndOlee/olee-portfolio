<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import { timeline } from '$lib/actions/timeline';
	import Header from '$lib/components/Header.svelte';
	import { colors } from '$lib/data/colors';
	import type { ProjectAction } from '$lib/types';

	function toEmbedVideoUrl(url: string): string {
		if (!/^https?:\/\//i.test(url)) {
			return url;
		}

		try {
			const parsed = new URL(url);

			if (parsed.hostname === 'youtu.be') {
				const id = parsed.pathname.split('/').filter(Boolean)[0];
				if (id) {
					return `https://www.youtube.com/embed/${id}`;
				}
			}

			if (parsed.hostname.includes('youtube.com')) {
				if (parsed.pathname === '/watch') {
					const id = parsed.searchParams.get('v');
					if (id) {
						return `https://www.youtube.com/embed/${id}`;
					}
				}

				if (parsed.pathname.startsWith('/shorts/')) {
					const id = parsed.pathname.split('/').filter(Boolean)[1];
					if (id) {
						return `https://www.youtube.com/embed/${id}`;
					}
				}
			}

			if (parsed.hostname.includes('vimeo.com') && !parsed.pathname.startsWith('/video/')) {
				const id = parsed.pathname.split('/').filter(Boolean)[0];
				if (id) {
					return `https://player.vimeo.com/video/${id}`;
				}
			}
		} catch {
			return url;
		}

		return url;
	}

	function getProjectVideos(input: unknown): string[] {
		if (!input || typeof input !== 'object') {
			return [];
		}

		const mediaRecord = input as Record<string, unknown>;

		if (Array.isArray(mediaRecord.videos)) {
			return mediaRecord.videos
				.filter((v): v is string => typeof v === 'string' && v.trim() !== '')
				.map((v) => v.trim());
		}

		const value = mediaRecord.video ?? mediaRecord.videoUrl ?? mediaRecord.videoLink ?? '';
		if (typeof value === 'string' && value.trim() !== '') {
			return [value.trim()];
		}

		return [];
	}

	function getProjectVideoCaptions(input: unknown): string[] {
		if (!input || typeof input !== 'object') {
			return [];
		}

		const mediaRecord = input as Record<string, unknown>;

		if (Array.isArray(mediaRecord.videoCaptions)) {
			return mediaRecord.videoCaptions.map((c) => (typeof c === 'string' ? c.trim() : ''));
		}

		const value = mediaRecord.videoCaption ?? mediaRecord.caption ?? '';
		if (typeof value === 'string' && value.trim() !== '') {
			return [value.trim()];
		}

		return [];
	}

	function getProjectActions(input: unknown): ProjectAction[] {
		if (!Array.isArray(input)) {
			return [];
		}

		const result: ProjectAction[] = [];
		for (const entry of input) {
			if (entry && typeof entry === 'object') {
				const actionRecord = entry as Record<string, unknown>;
				const label = typeof actionRecord.label === 'string' ? actionRecord.label.trim() : '';
				if (label) {
					result.push({
						label,
						href: typeof actionRecord.href === 'string' ? actionRecord.href : undefined
					});
				}
			}
		}
		return result;
	}

	function getSummaryPoints(input: unknown): string[] {
		if (!Array.isArray(input)) {
			return [];
		}

		return input.filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);
	}

	type ProjectDetail = {
		label: string;
		value: string;
		supporting: string[];
	};

	function getProjectDetails(input: unknown): ProjectDetail[] {
		if (!Array.isArray(input)) {
			return [];
		}

		return input
			.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0)
			.map((entry) => {
				const [firstLine = '', ...supporting] = entry
					.split('\\n')
					.flatMap((line) => line.split('\n'))
					.map((line) => line.replace(/\*\*/g, '').trim())
					.filter(Boolean);
				const separatorIndex = firstLine.indexOf(':');

				if (separatorIndex === -1) {
					return { label: 'Detail', value: firstLine, supporting };
				}

				return {
					label: firstLine.slice(0, separatorIndex).trim(),
					value: firstLine.slice(separatorIndex + 1).trim(),
					supporting
				};
			});
	}

	const escapeHtml = (value: string) =>
		value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');

	function formatInlineMarkdown(value: unknown): string {
		if (typeof value !== 'string') {
			return '';
		}

		return escapeHtml(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	}

	let { data }: { data: PageData } = $props();

	const project = $derived(data.project);
	const videos = $derived(getProjectVideos(project));
	const captions = $derived(getProjectVideoCaptions(project));

	let currentVideoIndex = $state(0);

	$effect(() => {
		// Reset video index when project changes
		if (project.slug) {
			currentVideoIndex = 0;
		}
	});

	const clampedVideoIndex = $derived(
		Math.max(0, Math.min(currentVideoIndex, Math.max(0, videos.length - 1)))
	);
	const videoUrl = $derived(videos[clampedVideoIndex] || '');
	const currentCaption = $derived(
		captions[clampedVideoIndex] || (videos.length <= 1 ? captions[0] : '')
	);
	const isDirectVideoFile = $derived(/\.(mp4|webm|ogg|mov)([?#].*)?$/i.test(videoUrl));
	const embedVideoUrl = $derived(toEmbedVideoUrl(videoUrl));
	const introTitle = $derived(project.content?.introductionTitle ?? 'Project Introduction');
	const introText = $derived(project.content?.introduction ?? 'Project details coming soon.');
	const summaryTitle = $derived(project.content?.summaryTitle ?? 'Summary of Work');
	const summaryPoints = $derived(getSummaryPoints(project.content?.summaryPoints));
	const projectDetails = $derived(getProjectDetails(project.detailLines));
	const supportingIcons = $derived(
		project.supportingIcons ??
			(project.gameEngine?.icon ? [project.gameEngine.icon] : (project.platforms ?? []))
	);
	const actions = $derived(getProjectActions(project.actions));
	const pageTitle = $derived(`${project?.name ?? 'Project'} | Osmond Lee`);
	const pageDescription = $derived(
		project.content?.introduction ?? `Project details for ${project.name} by Osmond Lee.`
	);
	const canonicalUrl = $derived(`https://toao.dev/projects/${project.slug}`);
	const socialImageUrl = $derived(project.image ? `https://toao.dev${project.image}` : '');
	const { TextWhite, BackgroundBlack, AccentGold } = colors;
	const pageStyle = `background-color: ${BackgroundBlack}; color: ${TextWhite};`;
	const headingStyle = `color: ${TextWhite};`;
	const accentBorderStyle = `border-color: ${AccentGold};`;
	const actionButtonStyle = `border-color: ${AccentGold}; background-color: var(--color-control-bg); color: var(--color-control-fg);`;
	const backButtonStyle = `border-color: ${AccentGold}; background-color: var(--color-control-bg); color: var(--color-control-fg);`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<link rel="canonical" href={canonicalUrl} />
	{#if socialImageUrl}
		<meta property="og:image" content={socialImageUrl} />
		<meta property="og:image:alt" content={`${project.name} project preview`} />
		<meta name="twitter:image" content={socialImageUrl} />
	{/if}
</svelte:head>

<div class="min-h-screen" style={pageStyle}>
	<Header />

	<main class="mx-auto flex w-full max-w-6xl flex-col px-4 pt-8 pb-16 sm:px-8 md:px-12">
		<section class="flex flex-col items-center">
			<h1
				class="page-title text-center text-4xl leading-none sm:text-5xl md:text-6xl"
				style={headingStyle}
			>
				{project.name}
			</h1>

			<div class="mt-10 max-w-3xl text-center sm:mt-12" data-reveal use:reveal={{ delay: 80 }}>
				<p class="section-kicker">{introTitle}</p>
				<p class="mt-3 text-lg leading-relaxed sm:text-xl">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html formatInlineMarkdown(introText)}
				</p>
			</div>
		</section>

		<div
			class="mt-12 grid w-full gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.75fr)] lg:items-start lg:gap-14"
			data-reveal
			use:reveal={{ delay: 120 }}
		>
			<div class="flex min-w-0 flex-col gap-3">
				<div
					class="relative w-full overflow-hidden border-2 bg-neutral-200"
					style={accentBorderStyle}
				>
					{#key videoUrl}
						<div class="media-content">
							{#if videoUrl}
								<div class="relative aspect-video w-full bg-black">
									{#if isDirectVideoFile}
										<!-- svelte-ignore a11y_media_has_caption -->
										<video
											src={videoUrl}
											controls
											playsinline
											preload="metadata"
											class="block h-full w-full bg-black object-contain"
										>
											<p>Your browser does not support the video tag.</p>
										</video>
									{:else}
										<iframe
											src={embedVideoUrl}
											title={`${project.name} video`}
											class="block h-full w-full border-0 bg-black"
											loading="lazy"
											allow="autoplay; encrypted-media; picture-in-picture; web-share"
											allowfullscreen
										></iframe>
									{/if}
								</div>
							{:else if project.image}
								<img src={project.image} alt={project.name} class="block h-auto w-full" />
							{:else}
								<div
									class="flex min-h-56 items-center justify-center px-4 text-center text-sm opacity-70"
								>
									Project image coming soon (Awaiting Sponsor Approval)
								</div>
							{/if}
						</div>
					{/key}
				</div>

				{#if videos.length > 1}
					<div class="flex items-center justify-between gap-3">
						<button
							type="button"
							class="carousel-nav-button flex items-center gap-1 py-1 text-sm font-medium"
							onclick={() =>
								(currentVideoIndex = (clampedVideoIndex - 1 + videos.length) % videos.length)}
							aria-label="Previous video"
						>
							<!-- <span aria-hidden="true">←</span> -->
							<span>Previous</span>
						</button>
						<span class="text-xs tracking-widest uppercase opacity-65">
							{clampedVideoIndex + 1} / {videos.length}
						</span>
						<button
							type="button"
							class="carousel-nav-button flex items-center gap-1 py-1 text-sm font-medium"
							onclick={() => (currentVideoIndex = (clampedVideoIndex + 1) % videos.length)}
							aria-label="Next video"
						>
							<span>Next</span>
							<!-- <span aria-hidden="true">→</span> -->
						</button>
					</div>
				{/if}

				{#if currentCaption}
					<p class="mx-auto max-w-2xl text-center text-sm leading-relaxed italic opacity-70">
						{currentCaption}
					</p>
				{/if}
			</div>

			<aside class="flex flex-col gap-10">
				{#if projectDetails.length}
					<dl class="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-1">
						{#each projectDetails as detail (detail.label)}
							<div>
								<dt class="section-kicker">{detail.label}</dt>
								<dd class="mt-1 text-xl leading-tight sm:text-2xl">{detail.value}</dd>
								{#each detail.supporting as supportingLine (supportingLine)}
									<dd class="mt-1 text-sm leading-relaxed opacity-65 sm:text-base">
										{supportingLine}
									</dd>
								{/each}
							</div>
						{/each}
					</dl>
				{/if}

				{#if supportingIcons.length}
					<div>
						<p class="section-kicker">Tools and Tech</p>
						<div class="mt-4 flex flex-wrap items-center gap-5">
							{#each supportingIcons as icon (icon)}
								<img
									src={icon}
									alt="Tool or platform icon"
									class="invertible-image h-10 w-auto max-w-28 object-contain"
								/>
							{/each}
						</div>
					</div>
				{/if}

				{#if actions.length}
					<div class="flex w-full flex-wrap justify-center gap-3">
						{#each actions as action (action.label)}
							{#if action.href}
								<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
								<a
									href={action.href}
									target="_blank"
									rel="external noreferrer"
									class="action-link inline-flex min-h-11 items-center justify-center border px-5 py-2 text-base"
									style={actionButtonStyle}
								>
									{action.label}
								</a>
							{:else}
								<span
									class="inline-flex min-h-11 items-center justify-center border px-5 py-2 text-base opacity-70"
									style={actionButtonStyle}
								>
									{action.label}
								</span>
							{/if}
						{/each}
					</div>
				{/if}
			</aside>
		</div>

		<section class="mt-16 max-w-4xl sm:mt-20" data-reveal use:reveal>
			<h2 class="project-section-title text-3xl leading-none sm:text-4xl">{summaryTitle}</h2>
			{#if summaryPoints.length}
				<ul class="timeline-list mt-8 space-y-5 text-base leading-relaxed sm:text-xl" use:timeline>
					{#each summaryPoints as point (point)}
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<li class="timeline-item" data-timeline-item>{@html formatInlineMarkdown(point)}</li>
					{/each}
				</ul>
			{:else}
				<p class="mt-6 text-base leading-relaxed opacity-70 sm:text-lg">
					Summary of work coming soon.
				</p>
			{/if}
		</section>

		<div class="mt-16 flex justify-center sm:mt-20">
			<a
				href={resolve('/')}
				class="back-link border px-6 py-2 text-sm font-medium"
				style={backButtonStyle}
			>
				Back to my work
			</a>
		</div>
	</main>
</div>

<style>
	.back-link,
	.action-link,
	.carousel-nav-button {
		transition:
			background-color 150ms ease-in-out,
			color 150ms ease-in-out,
			transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.back-link:hover,
	.action-link:hover,
	.carousel-nav-button:hover {
		transform: translateY(-0.12rem);
	}

	.action-link:hover {
		background-color: var(--color-control-hover-bg) !important;
	}

	.back-link:hover {
		background-color: var(--color-control-bg) !important;
	}

	.carousel-nav-button:hover {
		color: var(--color-accent);
	}

	.section-kicker {
		color: color-mix(in srgb, var(--color-text) 68%, transparent);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.project-section-title {
		position: relative;
		padding-left: 1rem;
	}

	.project-section-title::before {
		position: absolute;
		top: 0.05em;
		bottom: 0.05em;
		left: 0;
		width: 3px;
		content: '';
		background: var(--color-accent);
	}

	.media-content {
		animation: media-in 280ms ease-out both;
	}

	@keyframes media-in {
		from {
			opacity: 0;
		}
	}
</style>
