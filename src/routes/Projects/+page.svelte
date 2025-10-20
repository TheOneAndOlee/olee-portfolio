<!-- Sample Page -->
<!-- To be used whenever a new page is being made -->
<!-- For use, just make a copy of this page and build off of it! -->

<script lang="ts">
    // Imports
    import '../../app.css'
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
    
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
    <title>Projects</title>
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
    </div>
</div>