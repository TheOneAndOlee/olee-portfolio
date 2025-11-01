<!-- Sample Page -->
<!-- To be used whenever a new page is being made -->
<!-- For use, just make a copy of this page and build off of it! -->

<script lang="ts">
    // Imports
    import '../../app.css'
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
    import * as Card from '$lib/components/ui/card/index.js';
    import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
    
    // Navbar Links - Update Accordingly!
    const navLinks = [
        // {text: 'About', href: '../About'},
        {text: 'Projects', href: '../Projects'},
        {text: 'Contact', href: '../Contact'},
    ];

    // Breadcrumbs - Update Accordingly!
    const breadcrumbs = [
        { text: 'Home', href: '../'},
        { text: 'Sample Page', href: '../SamplePage', current: true }
    ];
</script>

<!-- Head -->
<svelte:head>
    <title>Contact Me!</title>
    <meta name="description" content="Get in touch with me!" />
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
    </div>

    <div class="flex flex-col flex-1 min-h-0">
        <Card.Root class="bg-[#FCFFF9]">
            <Card.Header>
                <Card.Title>Github</Card.Title>
                <Card.Description>Check out my Github!</Card.Description>
            </Card.Header>
            <Card.Content class="flex-1">
                <div class="flex flex-wrap gap-2 mb-4">
                    <enhanced:img 
                        class="relative z-50 w-full h-auto object-cover rounded-xl" 
                        src="/src/lib/assets/github-fixed.png" 
                        sizes="(min-width: 640px) 768px, (min-width: 1920px) 1280px, (min-width-1080) 640px" 
                        alt="Github Logo!" 
                    />
                </div>
            </Card.Content>
            <Card.Footer>
                
            </Card.Footer>
        </Card.Root>

        <Card.Root class="bg-[#FCFFF9]">
            <Card.Header>
                <Card.Title>LinkedIn</Card.Title>
                <Card.Description>Connect with me on LinkedIn!</Card.Description>
            </Card.Header>
            <Card.Content class="flex-1">
                <div class="flex flex-wrap gap-2 mb-4">
                    <enhanced:img 
                        class="relative z-50 w-full h-auto object-cover rounded-xl" 
                        src="/src/lib/assets/linkedin.webp" 
                        sizes="(min-width: 640px) 768px, (min-width: 1920px) 1280px, (min-width-1080) 640px" 
                        alt="LinkedIn Logo!" 
                    />
                </div>
            </Card.Content>
            <Card.Footer>
                
            </Card.Footer>
        </Card.Root>

    </div>
</div>