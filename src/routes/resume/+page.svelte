<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Header from '$lib/components/Header.svelte';
	import ResumeActivity from '$lib/components/ResumeActivity.svelte';
	import { colors } from '$lib/data/colors';
	import { activitySections, skills } from '$lib/data/resume.js';

	const { TextWhite, BackgroundBlack } = colors;
	const pageStyle = `background-color: ${BackgroundBlack}; color: ${TextWhite};`;
	const headingStyle = `color: ${TextWhite};`;
</script>

<svelte:head>
	<title>Resume | Osmond Lee</title>
</svelte:head>

<div class="min-h-screen" style={pageStyle}>
	<Header />

	<main class="flex flex-col items-center pt-8 pb-16">
		<h1
			class="page-title mb-12 text-4xl font-normal sm:text-5xl md:mb-16 md:text-6xl"
			style={headingStyle}
		>
			Resume
		</h1>

		<div class="w-full px-4 sm:px-8 md:px-12 lg:px-[15%] xl:px-[20%]">
			<div class="space-y-14 sm:space-y-16 md:space-y-20">
				{#each activitySections as section, index (section.title)}
					<section data-reveal use:reveal={{ delay: Math.min(index * 60, 180) }}>
						<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl" style={headingStyle}>
							{section.title}
						</h2>
						<div class="mt-6 space-y-8 sm:mt-8 sm:space-y-10">
							{#each section.activities as activity (activity.id)}
								<ResumeActivity {activity} />
							{/each}
						</div>
					</section>
				{/each}

				<section data-reveal use:reveal>
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl" style={headingStyle}>
						Skills
					</h2>
					<div class="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
						{#each skills as skill (skill.label)}
							<div
								class="grid grid-cols-1 gap-1 sm:grid-cols-[16rem_1fr] sm:items-baseline sm:gap-6"
							>
								<h3 class="text-base font-semibold opacity-90 sm:text-lg">{skill.label}</h3>
								<p class="text-sm leading-relaxed sm:text-base">{skill.items.join(', ')}</p>
							</div>
						{/each}
					</div>
				</section>
			</div>
		</div>
	</main>
</div>
