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

    <main class="flex flex-col items-center pb-16 pt-8">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-normal mb-12 md:mb-16" style={headingStyle}>My Work</h1>

        <div class="w-full px-4 sm:px-8 md:px-12 lg:px-[15%] xl:px-[20%]">
            <div class="overflow-hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 -mb-0.5 md:-mr-0.5">
                    {#each projects as project (project.id)}
                        <div class="border-black border-b-2 border-r-0 md:border-r-2 border-solid p-6 md:p-8 lg:p-10" style={cardBorderStyle}>
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
