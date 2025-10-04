<script>
    import '../../app.css'
    import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
    import Typewriter from 'svelte-typewriter';
	import { fly } from 'svelte/transition';
    import CardHoverEffect from '$lib/components/ui/CardHoverEffect/CardHoverEffect.svelte';

    import { onMount } from 'svelte';

    import PinContainer from '$lib/components/ui/ThreeDPin/PinContainer.svelte';

    let sparkleCount = 0;
    let showButtons = false;
    let showLinks = false;
    
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

</script>

<!-- For Credits:
    Sparkles: https://aceternity.sveltekit.io/components/sparkles
    TypewriterEffect: https://www.npmjs.com/package/svelte-typewriter
-->

<!-- <Navbar /> -->

<div class="relative w-full text-[#FCFFF9]"
    style="font-family: 'geo-regular', sans-serif;">

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

        {#if showLinks}
        <div class="flex-grow flex justify-center items-center"
            style="font-family: 'atkinson-hyperlegible-next', sans-serif;"
            transition:fly={{delay:300, duration:300, x:0, y:150}}
            on:introend={() => showButtons = true}
        >
            <PinContainer
                title="LinkedIn"
                href="https://www.linkedin.com/in/olee10"
                className="inline-block"
                containerClassName="inline-block"
            >
                <enhanced:img src="/src/lib/assets/linkedIn.webp" 
                    alt="LinkedIn Icon" 
                    class="w-full h-auto block"
                />

                <p class="absolute bottom-[-24px] w-full text-center justify-center text-[#FCFFF9] text-2xl">Connect with me!</p>
            </PinContainer>

            <PinContainer
                title="Github"
                href="https://github.com/TheOneAndOlee"
                className="inline-block"
                containerClassName="inline-block"
            >
                <enhanced:img src="/src/lib/assets/github-fixed.png" 
                    alt="Github Icon" 
                    class="w-[full] h-auto block rounded-xl bg-[#FCFFF9]"
                /> 
                
                <p class="absolute bottom-[-30px] mx-auto w-full text-center justify-center text-[#FCFFF9] text-2xl">Look at my code!</p>
            </PinContainer>
        </div>
        {/if}

        {#if showButtons}
            <div class="mx-8" 
                transition:fly={{delay:200, duration:300, x:0, y:100}}>
                <CardHoverEffect
                    items={[
                            {title: "About me", description: "A little about me!", link: "/About"},
                            {title: "Back Home", description: "Back to the introduction!", link:"../"},
                            {title: "Projects", description: "Learn more about my work!", link:"/Projects"}
                        ]} 
                    >
                </CardHoverEffect>
            </div>
        {/if}
    </div>

        <!-- TODO 
            1. Find carousel effect, or a list of buttons for different contacts
            2. Contacts to add: LinkedIn, Github, and Email 
        -->
</div>