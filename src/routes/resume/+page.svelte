<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ResumeActivity from '$lib/components/ResumeActivity.svelte';
	import { activitySections, skills } from '$lib/data/resume.js';
</script>

<div class="min-h-screen bg-neutral-100 text-black">
	<Header />

	<main class="mx-auto w-full max-w-5xl px-6 pb-14 pt-8 sm:px-10 sm:pt-10">
		<section class="max-w-4xl">
			<h1 class="text-4xl sm:text-5xl md:text-6xl">Skills</h1>
			<div class="mt-2 space-y-1 text-lg leading-relaxed sm:text-lg md:text-xl">
				{#each skills as skill}
					<p>
						<span class="font-medium">{skill.label}:</span>
						{skill.items.join(' • ')}
					</p>
				{/each}
			</div>
		</section>

		<div class="mt-6 space-y-6 sm:space-y-8">
			{#each activitySections as section}
				<section class="border-t border-slate-500 pt-2 sm:pt-3">
					<h2 class="text-4xl leading-tight sm:text-5xl md:text-6xl">{section.title}</h2>
					<div class="mt-2 space-y-2">
						{#each section.activities as activity (activity.id)}
							<ResumeActivity {activity} />
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</main>
</div>
