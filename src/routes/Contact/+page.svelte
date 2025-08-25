<script>
    import '../../app.css'
    import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
    import Typewriter from 'svelte-typewriter';
	import { fly } from 'svelte/transition';

    import { onMount } from 'svelte';

    import PinContainer from '$lib/components/ui/ThreeDPin/PinContainer.svelte';

    let sparkleCount = 0;

    onMount(() => {
        function updateSparkleCount() {
            sparkleCount = Math.round(window.innerWidth * 0.1);
        }

        updateSparkleCount();
        window.addEventListener('resize', updateSparkleCount);

        return () => {
            window.removeEventListener('resize', updateSparkleCount);
        };
    });

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
        particleDensity={sparkleCount}
        className="absolute inset-0 w-full h-full pointer-events-none"
    />

        <div class="py-8 h-screen"
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

            <div class="flex-grow w-full"
                style="font-family: 'atkinson-hyperlegible-next', sans-serif;"
            >
                
            </div>
        </div>

        <!-- TODO 
            1. Find carousel effect, or a list of buttons for different contacts
            2. Contacts to add: LinkedIn, Github, and Email 
        -->
</div>