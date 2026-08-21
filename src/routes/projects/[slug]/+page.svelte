<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { colors } from '$lib/data/colors';

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
			return mediaRecord.videos.filter(v => typeof v === 'string' && v.trim() !== '').map(v => v.trim());
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
			return mediaRecord.videoCaptions.map(c => typeof c === 'string' ? c.trim() : '');
		}

		const value = mediaRecord.videoCaption ?? mediaRecord.caption ?? '';
		if (typeof value === 'string' && value.trim() !== '') {
			return [value.trim()];
		}

		return [];
	}

	type ProjectAction = {
		label: string;
		href: string | undefined;
	};

	function getProjectActions(input: unknown): ProjectAction[] {
		if (!Array.isArray(input)) {
			return [];
		}

		return input
			.map((entry) => {
				if (!entry || typeof entry !== 'object') {
					return null;
				}

				const actionRecord = entry as Record<string, unknown>;
				const label = typeof actionRecord.label === 'string' ? actionRecord.label.trim() : '';
				if (!label) {
					return null;
				}

				return {
					label,
					href: typeof actionRecord.href === 'string' ? actionRecord.href : undefined
				};
			})
			.filter((entry): entry is ProjectAction => entry !== null);
	}

	function getSummaryPoints(input: unknown): string[] {
		if (!Array.isArray(input)) {
			return [];
		}

		return input.filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);
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

	let { data } = $props();

	const project = $derived(data.project);
	const videos = $derived(getProjectVideos(project));
	const captions = $derived(getProjectVideoCaptions(project));
	
	let currentVideoIndex = $state(0);
	
	$effect(() => {
		// Reset index when project changes
		project.slug;
		currentVideoIndex = 0;
	});
	
	const clampedVideoIndex = $derived(Math.max(0, Math.min(currentVideoIndex, Math.max(0, videos.length - 1))));
	const videoUrl = $derived(videos[clampedVideoIndex] || '');
	const currentCaption = $derived(captions[clampedVideoIndex] || (videos.length <= 1 ? captions[0] : ''));
	const isDirectVideoFile = $derived(/\.(mp4|webm|ogg|mov)([?#].*)?$/i.test(videoUrl));
	const embedVideoUrl = $derived(toEmbedVideoUrl(videoUrl));
	const introTitle = $derived(project.content?.introductionTitle ?? 'Project Introduction');
	const introText = $derived(project.content?.introduction ?? 'Project details coming soon.');
	const summaryTitle = $derived(project.content?.summaryTitle ?? 'Summary of Work');
	const summaryPoints = $derived(getSummaryPoints(project.content?.summaryPoints));
	const detailLines = $derived(project.detailLines ?? []);
	const supportingIcons = $derived(
		project.supportingIcons ?? (project.gameEngine?.icon ? [project.gameEngine.icon] : project.platforms ?? [])
	);
	const platformIconSet = $derived(new Set(project.platforms ?? []));
	const darkModeInvertedIconSet = $derived(new Set(project.darkModeInvertedIcons ?? []));
	const actions = $derived(getProjectActions(project.actions));
	const pageTitle = $derived(`${project?.name ?? 'Project'} | Osmond Lee`);
	const actionCount = $derived(actions.length);
	const actionContainerClass = $derived(
		actionCount === 1
			? 'flex justify-center'
			: actionCount === 2
				? 'flex flex-wrap justify-center gap-4 sm:gap-8'
				: 'flex flex-wrap justify-center gap-4 sm:gap-6'
	);
	const actionItemClass = $derived(actionCount === 1 ? 'w-full max-w-64' : 'w-full max-w-64 sm:w-64');
	const { TextWhite, HoverWhite, BackgroundBlack, AccentGold } = colors;
	const pageStyle = `background-color: ${BackgroundBlack}; color: ${TextWhite};`;
	const headingStyle = `color: ${TextWhite};`;
	const accentBorderStyle = `border-color: ${AccentGold};`;
	const actionButtonStyle = `border-color: ${AccentGold}; background-color: var(--color-control-bg); color: var(--color-control-fg); --action-hover-bg: var(--color-control-hover-bg);`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="min-h-screen" style={pageStyle}>
	<Header />

	<main class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-8 md:px-12">
		<section class="flex flex-col gap-4">
			<h1 class="text-center text-4xl font-semibold leading-none sm:text-5xl md:text-6xl" style={headingStyle}>{project.name}</h1>

			<div class="border-y" style={accentBorderStyle}>
				<div class="grid gap-0 md:grid-cols-[1fr_2fr]">
					<div class="border-b p-4 md:border-b-0 md:border-r md:p-5" style={accentBorderStyle}>
						<div class="w-full border bg-neutral-200" style={accentBorderStyle}>
							{#if videoUrl}
								{#if isDirectVideoFile}
									<!-- svelte-ignore a11y_media_has_caption -->
									<video
										src={videoUrl}
										controls
										playsinline
										preload="metadata"
										class="block aspect-video w-full bg-black"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
									</button>
								{/if}

								<div class="w-full border border-black/15 bg-neutral-200 relative flex-1">
									{#if videoUrl}
										<div class="relative w-full aspect-video">
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
											
											{#if videos.length > 1}
												<!-- Mobile navigation controls (still absolute, but adapt to theme) -->
												<div class="absolute inset-0 pointer-events-none flex items-center justify-between p-2 sm:hidden">
													<button 
														class="pointer-events-auto p-2 rounded-full transition-opacity opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 shadow-sm"
														style="background-color: var(--color-bg); color: var(--color-text);"
														onclick={() => currentVideoIndex = (clampedVideoIndex - 1 + videos.length) % videos.length}
														aria-label="Previous video"
													>
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
													</button>
													<button 
														class="pointer-events-auto p-2 rounded-full transition-opacity opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 shadow-sm"
														style="background-color: var(--color-bg); color: var(--color-text);"
														onclick={() => currentVideoIndex = (clampedVideoIndex + 1) % videos.length}
														aria-label="Next video"
													>
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
													</button>
												</div>
											{/if}
										</div>
									{:else if project.image}
										<img src={project.image} alt={project.name} class="block h-auto w-full" />
									{:else}
										<div class="flex min-h-56 items-center justify-center px-4 text-center text-sm text-neutral-500">
											Project image coming soon (Awaiting Sponsor Approval)
										</div>
									{/if}
								</div>

								{#if videos.length > 1}
									<button 
										class="flex-shrink-0 bg-transparent p-1 transition-opacity opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 rounded-full hidden sm:block"
										style="color: var(--color-text);"
										onclick={() => currentVideoIndex = (clampedVideoIndex + 1) % videos.length}
										aria-label="Next video"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
									</button>
								{/if}
							{:else if project.image}
								<img src={project.image} alt={project.name} class="block h-auto w-full" />
							{:else}
								<div class="flex min-h-56 items-center justify-center px-4 text-center text-sm opacity-70">
									Project image coming soon (Awaiting Sponsor Approval)
								</div>
							{/if}
						</div>

						{#if supportingIcons.length}
							<div class="mt-4 flex flex-col items-center gap-3">
								<p class="text-sm font-semibold opacity-70 tracking-widest uppercase ">Tools and Tech</p>
								<div class="flex flex-wrap items-center justify-center gap-4">
									{#each supportingIcons as icon}
										{#if platformIconSet.has(icon)}
											<span
												class="theme-text-icon h-16 w-16"
												style={`--icon-url: url('${icon}');`}
												aria-hidden="true"
											></span>
										{:else}
											<img
												src={icon}
												alt="project icon"
												class={`h-10 w-auto max-w-28 object-contain`}
											/>
										{/if}
									{/each}
								</div>
							</div>
						{/if}

						{#if detailLines.length}
							<div class="mt-4 flex flex-col gap-3 text-xl leading-tight">
								{#each detailLines as line, i}
									{#if i > 0}
										<hr class="border-black/30" style={accentBorderStyle} />
									{/if}
									<div class="space-y-1">
										{#each line.split('\\n').flatMap(l => l.split('\n')) as subline, j}
											<p class={j > 0 ? "text-lg opacity-70" : ""}>{@html formatInlineMarkdown(subline)}</p>
										{/each}
									</div>
								{/each}
							</div>
						{/if}

						{#if actions.length}
							<div class="mt-5 border-t pt-4" style={accentBorderStyle}>
								<div class={actionContainerClass}>
									{#each actions as action}
										<div class={actionItemClass}>
											{#if action.href}
												<a
													href={action.href}
													target="_blank"
													rel="noreferrer"
													class="action-link flex h-12 w-full items-center justify-center border text-2xl leading-none"
													style={actionButtonStyle}
												>
													{action.label}
												</a>
											{:else}
												<div class="flex h-12 w-full items-center justify-center border text-2xl leading-none opacity-80" style={actionButtonStyle}>
													{action.label}
												</div>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>

					<div class="p-4 md:p-5">
						<div class="space-y-6">
							<div>
								<h2 class="text-3xl leading-none">{introTitle}</h2>
								<p class="mt-2 text-base leading-snug md:text-xl">{@html formatInlineMarkdown(introText)}</p>
							</div>

							<div>
								<h2 class="text-3xl leading-none">{summaryTitle}</h2>
								{#if summaryPoints.length}
									<ul class="mt-2 list-disc space-y-1 pl-6 text-base leading-snug md:text-xl">
										{#each summaryPoints as point}
											<li>{@html formatInlineMarkdown(point)}</li>
										{/each}
									</ul>
								{:else}
									<p class="mt-2 text-base leading-snug opacity-70 md:text-lg">Summary of work coming soon.</p>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>


		<div class="flex justify-center">
			<a href="/" class="back-link border px-4 py-1 text-sm">Back to my work</a>
		</div>
	</main>
</div>

<style>
	.back-link,
	.action-link {
		transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
	}

	.back-link:hover {
		background-color: var(--back-hover-bg);
		color: var(--back-hover-text);
	}

	.action-link:hover {
		background-color: var(--action-hover-bg);
	}
</style>
