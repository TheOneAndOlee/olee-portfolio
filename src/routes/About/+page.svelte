<script>
    import '../../app.css'
    import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
    import Typewriter from 'svelte-typewriter';
	import { fly } from 'svelte/transition';
    import CardHoverEffect from '$lib/components/ui/CardHoverEffect/CardHoverEffect.svelte';

    let showText = false;
    let showImage = false;
    let showButtons = false;
</script>

<!-- For Credits:
    Sparkles: https://aceternity.sveltekit.io/components/sparkles
    TypewriterEffect: https://www.npmjs.com/package/svelte-typewriter
-->

<!-- <Navbar /> -->

<div class="relative w-full bg-[#070809] text-[#FCFFF9]">
    <Sparkles
        minSize={0.8}
        maxSize={2}
        speed={3}
        particleDensity={150}
        className="absolute inset-0 w-full h-full pointer-events-none"
    />
    <div class="h-screen flex flex-col">
        <div class="py-8"
            style="font-family: 'geo-regular', sans-serif;">
            <Typewriter 
                mode="cascade" 
                interval={25} 
                keepCursorOnFinish={false} 
                cursor={false}
                on:done={() => showImage = true}
            >
                <p class="text-8xl justify-center text-center flex items-center w-full text-[#FCFFF9]">About Me!</p>
            </Typewriter>
        </div>

        <div class="flex-grow grid grid-cols-5 w-full text-[#FCFFF9] px-12 m-2" 
            style="font-family: 'atkinson-hyperlegible-next', sans-serif;"
        >
            {#if showImage}
            <div class="col-span-1" transition:fly={{delay:250, duration:300, x:-100, y:0}} on:introend={() => showText = true}>
                <enhanced:img 
                    class="relative z-50 w-full h-auto object-cover rounded-xl" 
                    src="/src/lib/assets/betterHeadshot.webp" 
                    sizes="(min-width: 640px) 768px, (min-width: 1920px) 1280px, (min-width-1080) 640px" 
                    alt="An alright pic of me!" 
                />
            </div>
            {/if}

            <div class="col-span-4 px-8">
                {#if showText} 
                <div transition:fly={{delay:0, duration:300, x:-100, y:0}} on:introend={() => showButtons = true}>
                    <p class="text-3xl text-[#FCFFF9]">
                        I'm Osmond Lee, a Computer Science major with a Game Studies and Design minor at the University of Illinois Urbana Champaign (UIUC).
                    </p>
                    <p class="text-3xl py-8 text-[#FCFFF9]">
                        I've grown up playing games my whole life, and I've come to appreciate what I call "invisible design" in the media I consume.
                    </p>
                    <p class="text-3xl text-[#FCFFF9]">
                        In no small part due to my history with and love for games, my dream is to make my own games/media that combine my passion for programming with my love for invisible design.
                    </p>
                </div>
                {/if}

                {#if showButtons}
                    <div class="mx-8" 
                    transition:fly={{delay:200, duration:500, x:-300, y:0}}>
                    <CardHoverEffect
                        items={[
                                {title: "Contact", description: "Getting in touch with me!", link: "/Contact"},
                                {title: "Back Home", description: "Back to the introduction!", link:"../"},
                                {title: "Projects", description: "Learn more about my work!", link:"/Projects"}
                            ]} 
                        >
                    </CardHoverEffect>
                </div>
                {/if}
            </div>
        </div>


    </div>
</div>