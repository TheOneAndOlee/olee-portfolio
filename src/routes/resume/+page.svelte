<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ResumeActivity from '$lib/components/ResumeActivity.svelte';
	import { colors } from '$lib/data/colors';
	import { activitySections, skills } from '$lib/data/resume.js';

	const { TextWhite, BackgroundBlack, AccentGold } = colors;
	const pageStyle = `background-color: ${BackgroundBlack}; color: ${TextWhite};`;
	const headingStyle = `color: ${AccentGold};`;
	const sectionBorderStyle = `border-color: ${AccentGold};`;
</script>

<svelte:head>
	<title>Resume | Osmond Lee</title>
</svelte:head>

<div class="min-h-screen" style={pageStyle}>
	<Header />

	<main class="mx-auto w-full max-w-5xl px-6 pb-14 pt-4 sm:px-10 sm:pt-6">

		<div class="mt-6 space-y-6 sm:space-y-8">
			{#each activitySections as section}
				<section class="border-t border-slate-500 pt-2 sm:pt-3" style={sectionBorderStyle}>
					<h2 class="text-4xl leading-tight sm:text-5xl md:text-6xl" style={headingStyle}>{section.title}</h2>
					<div class="mt-2 space-y-2">
						{#each section.activities as activity (activity.id)}
							<ResumeActivity {activity} />
						{/each}
					</div>
				</section>
			{/each}

			<section class="border-t border-slate-500 pt-2 sm:pt-3" style={sectionBorderStyle}>
				<h2 class="text-4xl leading-tight sm:text-5xl md:text-6xl" style={headingStyle}>Skills</h2>
				<div class="mt-3 space-y-3 sm:space-y-4">
					{#each skills as skill (skill.label)}
						<div class="grid grid-cols-1 gap-1 sm:grid-cols-[13rem_1fr] sm:gap-4">
							<h3 class="text-base font-semibold sm:text-lg">{skill.label}</h3>
							<p class="text-sm sm:text-base">{skill.items.join(', ')}</p>
						</div>
					{/each}
				</div>
			</section>
		</div>
	</main>
</div>
