<script lang="ts">
	import { colors } from '$lib/data/colors';

	type ResumeActivity = {
		id: string;
		organization: string;
		role: string;
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
	const roleStyle = `color: ${colors.HoverWhite};`;
</script>

<article class="grid grid-cols-1 gap-4 py-4 sm:grid-cols-[6.25rem_1fr] sm:gap-6">
	<div class="flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
		{#if activity.logo?.imageSrc}
			<img
				src={activity.logo.imageSrc}
				alt={activity.logo.imageAlt ?? `${activity.organization} logo`}
				class={`h-full w-full object-contain ${activity.id === 'studio-illinois' ? 'brightness-8' : ''}`}
			/>
		{:else if activity.logo?.variant === 'wordmark'}
			<div class="flex h-full w-full flex-col items-start justify-center text-left font-semibold leading-none {activity.logo?.textColorClass ?? 'text-slate-800'}">
				{#each activity.logo?.text ?? [activity.organization.slice(0, 2).toUpperCase()] as logoLine}
					<span class="text-4xl sm:text-5xl">{logoLine}</span>
				{/each}
			</div>
		{:else}
			<div class="flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-slate-400 bg-white px-2 text-center font-semibold leading-none {activity.logo?.textColorClass ?? 'text-slate-700'}">
				{#each activity.logo?.text ?? [activity.organization.slice(0, 2).toUpperCase()] as logoLine}
					<span class="text-2xl sm:text-3xl">{logoLine}</span>
				{/each}
			</div>
		{/if}
	</div>

	<div>
		<h3 class="text-2xl leading-tight sm:text-3xl">{activity.organization}</h3>
		<p class="text-sm italic sm:text-base" style={roleStyle}>{activity.role}</p>
		<ul class="mt-1 list-disc pl-6 text-sm sm:text-base">
			{#each activity.points as point}
				<li>{@html formatPoint(point)}</li>
			{/each}
		</ul>
	</div>
</article>
