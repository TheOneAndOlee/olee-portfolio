<script>
    import '../../app.css'
    import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
    import Typewriter from 'svelte-typewriter';
	import { fly } from 'svelte/transition';

    let showLinks = false;
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

        <div class="py-8"
            style="font-family: 'geo-regular', sans-serif;"
        >
            <Typewriter 
                mode="cascade" 
                interval={25} 
                keepCursorOnFinish={false} 
                cursor={false}
                on:done={() => showLinks = true}
            >
                <p class="text-8xl justify-center text-center flex items-center w-full text-[#FCFFF9]">Contact Me!</p>
            </Typewriter>
        </div>

        <div class=""
            style="font-family: 'atkinson-hyperlegible-next', sans-serif;"
        >
            
        </div>

        <!-- TODO 
            1. Find carousel effect, or a list of buttons for different contacts
            2. Contacts to add: LinkedIn, Github, and Email 
        -->
</div>