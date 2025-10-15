<!-- Sample Page -->
<!-- To be used whenever a new page is being made -->
<!-- For use, just make a copy of this page and build off of it! -->

<script lang="ts">
    import '../../app.css'
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
    
    const navLinks = [
        {text: 'About', href: '../About'},
        {text: 'Projects', href: '../Projects'},
        {text: 'Contact', href: '../Contact'},
    ];

    const breadcrumbs = [
        { text: 'Home', href: '../'}
    ];
</script>

<svelte:head>
    <title>Sample Title!</title>
    <meta name="description" content="Sample Description" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="relative w-full text-[#FCFFF9]">
    <div class="h-screen flex flex-col">
        <Navbar
            breadcrumbs = {breadcrumbs}
            navLinks = {navLinks}
        ></Navbar>
    </div>
</div>