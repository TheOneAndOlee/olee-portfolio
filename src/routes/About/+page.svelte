<script>
    import '../../app.css'
    import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
    import Typewriter from 'svelte-typewriter';
    import CardHoverEffect from '$lib/components/ui/CardHoverEffect/CardHoverEffect.svelte';
	import { fly } from 'svelte/transition';

    let showNext = false;
    let showIntro = false;
    let showButtons = false
</script>

<!-- For Credits:
    Sparkles: https://aceternity.sveltekit.io/components/sparkles
    TypewriterEffect: https://www.npmjs.com/package/svelte-typewriter
-->

<!-- <Navbar /> -->

<div class="relative w-full bg-[#070809] text-[#FCFFF9]"
    style="font-family: 'geo-regular', sans-serif;">
    <Sparkles
        minSize={0.8}
        maxSize={2}
        speed={3}
        particleDensity={300}
        className="absolute inset-0 w-full h-full pointer-events-none"
    />
    <div class="h-screen flex flex-col">
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

        {#if showIntro}
            <div class="flex-grow flex w-full text-[#FCFFF9] px-12 m-2" id="Intro" transition:fly={{delay:100, duration:300, x:0, y:150}} on:introend={() => showButtons = true}>
                <div>
                    <p class="text-4xl text-[#FCFFF9]">
                        I'm a student programmer who loves games, making them, and all things cool! 
                        I'm still pretty new to applied programming, but I'm learning more every day! <br> <br>
                    </p>
                </div>
            </div>
            {#if showButtons}
                <div></div>
            {/if}
        {/if}


    </div>
    <div class="h-screen py-8 px-12 m-2 w-full text-[#FCFFF9]" id="About">
        <p class="text-8xl py-8 justify-center items-center text-center">About Me</p>
    </div>
</div>