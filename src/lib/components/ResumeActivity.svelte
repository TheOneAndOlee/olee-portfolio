<script lang="ts">
	import { colors } from '$lib/data/colors';

	type ResumeActivity = {
		id: string;
		organization: string;
		role: string;
		date?: string;
		location?: string;
		points: string[];
		logo?: {
			variant?: string;
			imageSrc?: string;
			imageAlt?: string;
			text?: string[];
			textColorClass?: string;
		};
	};

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
				class={`h-full w-full object-contain ${activity.id === 'studio-illinois' ? 'brightness-8' : ''}`}
			/>
		{:else if activity.logo?.variant === 'wordmark'}
			<div class="flex h-full w-full flex-col items-start justify-center text-left font-semibold leading-none {activity.logo?.textColorClass ?? 'text-slate-800'}">
				{#each activity.logo?.text ?? [activity.organization.slice(0, 2).toUpperCase()] as logoLine}
					<span class="text-3xl sm:text-4xl">{logoLine}</span>
				{/each}
			</div>
		{:else}
			<div class="flex h-full w-full flex-col items-center justify-center rounded-full border-2 px-2 text-center font-semibold leading-none" style={placeholderLogoStyle}>
				{#each activity.logo?.text ?? [activity.organization.slice(0, 2).toUpperCase()] as logoLine}
					<span class="text-xl sm:text-2xl">{logoLine}</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="flex flex-col">
		<div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
			<h3 class="text-xl font-semibold leading-tight sm:text-2xl">{activity.organization}</h3>
			{#if activity.location}
				<span class="text-sm font-normal opacity-75 sm:text-base shrink-0">{activity.location}</span>
			{/if}
		</div>

		<div class="mt-0.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
			<p class="text-sm italic opacity-85 sm:text-base" style={roleStyle}>{activity.role}</p>
			{#if activity.date}
				<span class="text-sm italic opacity-75 sm:text-base shrink-0">{activity.date}</span>
			{/if}
		</div>

		<ul class="mt-2.5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed sm:text-base">
			{#each activity.points as point}
				<li>{@html formatPoint(point)}</li>
			{/each}
		</ul>
	</div>
</article>
