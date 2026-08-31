<script lang="ts">
	import { timeline } from '$lib/actions/timeline';
	import { colors } from '$lib/data/colors';
	import type { ResumeActivity } from '$lib/types';

	let { activity } = $props<{ activity: ResumeActivity }>();

	const escapeHtml = (value: string) =>
		value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');

	const formatPoint = (point: string) =>
		escapeHtml(point).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	const { TextWhite, AccentGold } = colors;
	const roleStyle = `color: ${TextWhite};`;
	const placeholderLogoStyle = `border-color: ${AccentGold}; color: ${TextWhite};`;
</script>

<article class="grid grid-cols-1 items-start gap-4 sm:grid-cols-[6rem_1fr] sm:gap-6">
	<div class="flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
		{#if activity.logo?.imageSrc}
			<img
				src={activity.logo.imageSrc}
				alt={activity.logo.imageAlt ?? `${activity.organization} logo`}
				class={`h-full w-full object-contain ${activity.id === 'studio-illinois' ? 'invert-on-light' : ''}`}
			/>
		{:else if activity.logo?.variant === 'wordmark'}
			<div
				class="flex h-full w-full flex-col items-start justify-center text-left leading-none font-semibold {activity
					.logo?.textColorClass ?? 'text-slate-800'}"
			>
				{#each activity.logo?.text ?? [activity.organization
						.slice(0, 2)
						.toUpperCase()] as logoLine, index (index)}
					<span class="text-3xl sm:text-4xl">{logoLine}</span>
				{/each}
			</div>
		{:else}
			<div
				class="flex h-full w-full flex-col items-center justify-center rounded-full border-2 px-2 text-center leading-none font-semibold"
				style={placeholderLogoStyle}
			>
				{#each activity.logo?.text ?? [activity.organization
						.slice(0, 2)
						.toUpperCase()] as logoLine, index (index)}
					<span class="text-xl sm:text-2xl">{logoLine}</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="flex flex-col">
		<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
			<h3 class="text-xl leading-tight font-semibold sm:text-2xl">{activity.organization}</h3>
			{#if activity.location}
				<span class="shrink-0 text-sm font-normal opacity-75 sm:text-base">{activity.location}</span
				>
			{/if}
		</div>

		<div
			class="mt-0.5 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
		>
			<p class="text-sm italic opacity-85 sm:text-base" style={roleStyle}>{activity.role}</p>
			{#if activity.date}
				<span class="shrink-0 text-sm italic opacity-75 sm:text-base">{activity.date}</span>
			{/if}
		</div>

		<ul class="timeline-list mt-3 space-y-2 text-sm leading-relaxed sm:text-base" use:timeline>
			{#each activity.points as point, index (index)}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<li class="timeline-item" data-timeline-item>{@html formatPoint(point)}</li>
			{/each}
		</ul>
	</div>
</article>
