<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { colors } from '$lib/data/colors';
	import { projects } from '$lib/data/projects.js';

	const { TextWhite, BackgroundBlack, AccentGold } = colors;
	const pageStyle = `background-color: ${BackgroundBlack}; color: ${TextWhite};`;
	const headingStyle = `color: ${TextWhite};`;
	const cardBorderStyle = `border-color: ${AccentGold};`;
</script>

<svelte:head>
	<title>My Work | Osmond Lee</title>
</svelte:head>

<div class="min-h-screen" style={pageStyle}>
	<Header />

	<main class="flex flex-col items-center pt-8 pb-16">
		<h1 class="mb-12 text-4xl font-normal md:mb-16 md:text-5xl lg:text-6xl" style={headingStyle}>
			My Work
		</h1>

		<div class="w-full px-4 sm:px-8 md:px-12 lg:px-[15%] xl:px-[20%]">
			<div class="overflow-hidden">
				<div class="-mb-0.5 grid grid-cols-1 md:-mr-0.5 md:grid-cols-2 lg:grid-cols-2">
					{#each projects as project (project.id)}
						<div
							class="border-r-0 border-b-2 border-solid p-6 md:border-r-2 md:p-8 lg:p-10"
							style={cardBorderStyle}
						>
							<ProjectCard
								name={project.name}
								platforms={project.platforms}
								image={project.image}
								imageVerticalAlign={project.imageVerticalAlign}
								gameEngine={project.gameEngine}
								link={project.link}
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</main>
</div>
