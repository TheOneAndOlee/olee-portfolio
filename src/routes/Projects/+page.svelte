<!-- Sample Page -->
<!-- To be used whenever a new page is being made -->
<!-- For use, just make a copy of this page and build off of it! -->

<script lang="ts">
    // Imports
    import '../../app.css'
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
    import * as Card from '$lib/components/ui/card/index.js';
    import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
    import { Badge } from "$lib/components/ui/badge/index.js";
	import { Link } from '$lib/components/ui/breadcrumb';
    import { projects } from '$lib/assets/Projects.js';
    import { categories } from '$lib/assets/Categories';
    import { tagCategoryMap } from '$lib/assets/TagToCategory';

    const typedCategories: Record<string, string> = categories;
    const typedTagCategoryMap: Record<string, string> = tagCategoryMap;

    // Navbar Links - Update Accordingly!
    const navLinks = [
        {text: 'About', href: '../About'},
        {text: 'Projects', href: '../Projects'},
        {text: 'Contact', href: '../Contact'},
    ];

    // Breadcrumbs - Update Accordingly!
    const breadcrumbs = [
        { text: 'Home', href: '../'},
        { text: 'Projects', href: '../Projects', current: true }
    ];

</script>

<!-- Head -->
<svelte:head>
    <title>My Projects</title>
    <meta name="description" content="Projects Page" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<!-- Actual Page Content -->
<div class="relative w-full text-[#FCFFF9] h-screen flex flex-col">
    <div class="flex flex-col flex-1 min-h-0">
        <Navbar
            breadcrumbs = {breadcrumbs}
            navLinks = {navLinks}
        ></Navbar>

        <div class="flex-1 overflow-y-auto p-8 md:p-12">
            <h1 class="w-full text-center justify-items-center mb-8 text-4xl">My Projects!</h1>
            
           <div class="w-full flex justify-center mb-8">
                
                <div 
                    class="inline-flex flex-wrap justify-center gap-x-4 gap-y-2 p-3 bg-[#FCFFF9] text-[#041322] rounded-3xl shadow-md"
                >
                    {#each Object.entries(typedCategories) as [category, style]}
                        {#if category !== 'default'}
                            <div class="flex items-center gap-2">
                                <div class="h-3 w-3 rounded-full {style.split(' ')[0]}"></div>
                                <span class="text-sm font-medium">{category}</span>
                            </div>
                        {/if}
                    {/each}
                </div>

            </div>

            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {#each projects as project}
                    <Card.Root class="bg-[#FCFFF9]">
                        <Card.Header>
                            <Card.Title>{project.title}</Card.Title>
                            <Card.Description>{project.description}</Card.Description>
                        </Card.Header>
                        <Card.Content class="flex-1">
                            <div class="flex flex-wrap gap-2 mb-4">
                                {#each project.tags as tag}
                                    {@const category = typedTagCategoryMap[tag] || 'default'}

                                    {@const style = typedCategories[category]}
                                
                                    <Badge class={style}>{tag}</Badge>
                                {/each}
                            </div>
                        </Card.Content>
                        <Card.Footer>
                            {#if project.footer != ""}
                                <Button variant="link" size="sm" href={project.link} target="_blank">{project.footer}</Button>
                            {:else}
                                <Button variant="link" size="sm">Nothing for this project yet, sorry!</Button>
                            {/if}
                            <!-- <Button variant="link" size="sm">Learn More</Button> -->
                        </Card.Footer>
                    </Card.Root>
                {/each}
            </div>
        </div>
    </div>
</div>