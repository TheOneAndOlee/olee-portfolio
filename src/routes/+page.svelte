<script>
    import '../app.css'
    import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
    import Typewriter from 'svelte-typewriter';
    import CardHoverEffect from '$lib/components/ui/CardHoverEffect/CardHoverEffect.svelte';
	import { fly } from 'svelte/transition';

    let showNext = false;
    let showIntro = false;
    let showButtons = false;
</script>

<!-- For Credits:
    Sparkles: https://aceternity.sveltekit.io/components/sparkles
    TypewriterEffect: https://www.npmjs.com/package/svelte-typewriter
    CardHoverEffect: https://aceternity.sveltekit.io/components/card-hover-effect

    Geo Font: https://fonts.google.com/specimen/Geo
    Atkinson Hyperlegible Next:  https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next
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
            <div class="flex-grow flex flex-col w-full text-[#FCFFF9] px-12 m-2" id="Intro" transition:fly={{delay:100, duration:300, x:0, y:100}} on:introend={() => showButtons = true}>
                <div>
                    <p class="text-4xl w-full text-[#FCFFF9]">
                        I'm a student programmer who loves games, making them, and all things cool! 
                        I'm still pretty new to applied programming, but I'm learning more every day!
                    </p>
                </div>
                {#if showButtons}
                    <div transition:fly={{delay:200, duration:300, x:0, y:100}}>
                        <CardHoverEffect
                            items={[
                                    {title: "About me", description: "A little about me!", link: "/About"},
                                    {title: "My Projects", description: "Showing off some of the work I've done!", link:"/Projects"},
                                    {title: "Contact", description: "Getting in touch with me!", link:"/Contact"}
                                ]} 
                            >
                        </CardHoverEffect>
                    </div>
                {/if}   
            </div>
        {/if}

    </div>
</div>