<script lang="ts">
    import '../app.css'
    import CoolButton from '$lib/components/ui/CoolButton/CoolButton.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
    // import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
    // import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
    // import { Button } from '$lib/components/ui/button/index.js';

    let showNext = false;
    let showIntro = false;
    let showButtons = false;
    let showStart = false;

    const navLinks = [
        {text: 'About', href: '../About'},
        {text: 'Projects', href: '../Projects'},
        {text: 'Contact', href: '../Contact'},
        // {text: 'Blog', href: '../Blog'}
    ];

    const breadcrumbs = [
        { text: 'Home', href: '../'}
    ];

    onMount(() => {
        showStart = true;
    });

</script>

<!-- For Credits:
    Sparkles: https://aceternity.sveltekit.io/components/sparkles
    TypewriterEffect: https://www.npmjs.com/package/svelte-typewriter
    CardHoverEffect: https://aceternity.sveltekit.io/components/card-hover-effect
    3D Pin: https://aceternity.sveltekit.io/components/3d-pin

    Geo Font: https://fonts.google.com/specimen/Geo
    Atkinson Hyperlegible Next:  https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next
-->

<!-- <Navbar /> -->

<svelte:head>
    <title>Welcome!</title>
    <meta name="description" content="Introductory Page" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="relative w-full text-[#FCFFF9]">
    <Navbar
        breadcrumbs = {breadcrumbs}
        navLinks = {navLinks}
    ></Navbar>
    <div class="h-screen flex flex-col">
        <div class="py-8"
            style="font-family: 'geo-regular', sans-serif;"
            on:introend={() => showNext = true}
        >
            {#if showStart}
            <div 
                transition:fly={{delay:100, duration:300, x:225, y:0}}
                on:introend={() => showIntro = true}
            >
           
                 <p class="text-8xl justify-center text-center flex items-center w-full text-[#FCFFF9]">Hey! I'm Osmond Lee</p>
            </div>
            {/if}
        </div>

        {#if showIntro}
            <div class="flex flex-row flex-grow min-h-0">
                <div class="h-full px-8" transition:fly={{delay:250, duration:300, x:-100, y:0}}>
                    <enhanced:img 
                        class="relative z-50 h-full w-auto" 
                        src="/src/lib/assets/betterHeadshot.webp" 
                        sizes="(min-width: 640px) 768px, (min-width: 1920px) 1280px, (min-width-1080) 640px" 
                        alt="An alright pic of me!" 
                    />
                </div>
                <div class="flex flex-col flex-1 text-[#FCFFF9] px-12 m-2" id="Intro" 
                    transition:fly={{delay:100, duration:300, x:0, y:225}} 
    
                    on:introend={() => showButtons = true}
                    style="font-family: 'atkinson-hyperlegible-next', sans-serif;"
                >
                    <div>
                        <p class="text-4xl w-full text-[#FCFFF9]">
                            I'm a student programmer who loves games, making them, and all things cool! I'm still pretty new to applied programming, but I'm learning more every day!
                        </p>
                    </div>

                    <div class="flex-grow"></div>

                    {#if showButtons}
                        <div class="flex justify-center items-center gap-8"
                            transition:fly={{delay:200, duration:300, x:0, y:225}}
                        >
                            <Button variant="destructive" size="lg" href="../About">
                                About Me!
                            </Button>
                            <CoolButton 
                                text = "About Me!"
                                href = "../About"
                            />
                            <CoolButton 
                                text = "Projects!"
                                href = "../Projects"
                            />
                            <CoolButton 
                                text = "Contact Me!"
                                href = "../Contact"
                            />
                        </div>
                    {/if} 
       
                    <div class="flex-grow"></div>  
                </div>
            </div>
        {/if}

    </div>
</div>