<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import { projects } from '$lib/data/projects.js';
</script>

<div class="min-h-screen bg-white">
    <Header />

    <main class="flex flex-col items-center py-16">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-normal mb-12 md:mb-16">My Work</h1>

        <div class="w-full px-4 sm:px-8 md:px-12 lg:px-[15%] xl:px-[20%]">
            <div class="overflow-hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mb-0.5 md:-mr-0.5">
                    {#each projects as project (project.id)}
                        <div class="border-black border-b-2 border-r-0 md:border-r-2 border-solid p-6 md:p-8 lg:p-10">
                            <ProjectCard
                                name={project.name}
                                platforms={project.platforms}
                                image={project.image}
                                link={project.link}
                            />
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </main>
</div>
