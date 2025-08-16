<script>
    import '../../app.css'
    import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
    import Typewriter from 'svelte-typewriter';
	import { fly } from 'svelte/transition';

    let showFirst = false;
    let showSecond = false;
    let showThird = false;
    let showButtons = false;
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
        particleDensity={150}
        className="absolute inset-0 w-full h-full pointer-events-none"
    />
    <div class="h-screen flex flex-col">
        <div class="py-8">
            <Typewriter 
                mode="cascade" 
                interval={25} 
                keepCursorOnFinish={false} 
                cursor={false}
                on:done={() => showFirst = true}
            >
                <p class="text-8xl justify-center text-center flex items-center w-full text-[#FCFFF9]">About Me!</p>
            </Typewriter>
        </div>

        {#if showFirst}
            <div class="flex-grow flex flex-col-4 w-full text-[#FCFFF9] px-12 m-2">
                <div class="col-span-1" transition:fly={{delay:100, duration:300, x:-100, y:0}}>
                    <enhanced:img 
                        class="relative z-50 w-96 h-96 md:w-96 md:h-96 object-cover rounded-xl" 
                        src="/src/lib/assets/betterHeadshot.webp" 
                        sizes="(min-width: 640px) 768px, (min-width: 1920px) 1280px, (min-width-1080) 640px" 
                        alt="An alright pic of me!" 
                    />
                </div>
                <div class="col-span-3 px-8 transition:fly={{delay:300, duration:300, x:-100, y:0}} on:introend={() => showButtons = true}">
                    <p class="text-4xl text-[#FCFFF9]">
                        I'm Osmond Lee, a Computer Science major with a Game Studies and Design minor at the University of Illinois Urbana Champaign (UIUC).
                    </p>
                    <p class="text-4xl py-8 text-[#FCFFF9]">
                        I love the idea of "invisible design" in the games and softwares I use.
                    </p>
                    <p class="text-4xl text-[#FCFFF9]">
                        That's why I'm obsessed with the "feel" of a game, and why I want to make games that feel good to play.
                    </p>
                </div>
            </div>
        {/if}


    </div>
</div>