<script>
    // import Navbar from '$lib/Navbar.svelte';
    import '../app.css'
    import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
    import Typewriter from 'svelte-typewriter';
	import SideToc from '$lib/components/ui/SideTOC/SideTOC.svelte';

    // import { TypewriterEffect, TypewriterEffectSmooth } from '$lib/components/ui/TypewriterEffect';

    let showNext = false;
    let showIntro = false;
    let showAbout = false;
    let showProjects = false;
    let showContact = false;
</script>

<!-- For Credits:
    Sparkles: https://aceternity.sveltekit.io/components/sparkles
    TypewriterEffect: https://www.npmjs.com/package/svelte-typewriter
-->

<!-- <Navbar /> -->

<div class="relative min-h-screen w-full bg-[#070809] text-[#FCFFF9]"
    style="font-family: 'geo-regular', sans-serif;">
    <Sparkles
        minSize={0.8}
        maxSize={2}
        speed={3}
        particleDensity={200}
        className="absolute inset-0 w-full h-full pointer-events-none"
    />

    <div class="py-8">
        <Typewriter 
            mode="cascade" 
            interval={50} 
            keepCursorOnFinish={false} 
            cursor={false}
            on:done={() => showNext = true}
        >
            <p class="text-8xl justify-center text-center flex items-center w-full text-[#FCFFF9]">Hey! I'm</p>
        </Typewriter>

        {#if showNext}
            <Typewriter 
                mode="cascade" 
                interval={75} 
                keepCursorOnFinish={false}
                cursor={false}
                on:done={() => showIntro = true} 
            >
                <p class="text-9xl justify-center text-center flex items-center w-full text-[#F7B71F]">Osmond Lee!</p>
            </Typewriter>
        {/if}
    </div>

    <div class="py-8">
        <div class="px-12 m-2">
            <div class="" id="Intro">
                <p class="text-4xl flex w-full text-[#FCFFF9]">
                    I'm a student programmer who loves games, making them, and all things cool! 
                    I'm still pretty new to applied programming, but I'm learning more every day! <br> <br>
                </p>
                <p class="text-4xl py-8 flex w-full text-[#FCFFF9]">
                    If you want to know more about me, check out my blog over <a href="#about" class="hover:underline inline">here</a>.
                </p>
            </div>
        </div>

    </div>
</div>