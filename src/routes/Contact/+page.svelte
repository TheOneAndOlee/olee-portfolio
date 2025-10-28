<script>
    import '../../app.css'
	import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';

	import CoolButton from '$lib/components/ui/CoolButton/CoolButton.svelte';

    let sparkleCount = 0;
    let showButtons = false;
    let showLinks = false;

    const navLinks = [
        {text: 'About', href: '../About'},
        {text: 'Projects', href: '../Projects'},
        {text: 'Contact', href: '../Contact'},
        // {text: 'Blog', href: '../Blog'}
    ];

    const breadcrumbs = [
        { text: 'Home', href: '../'},
        { text: 'Contact', href: '../Contact', current: true}
    ];
    
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

    <Navbar
        breadcrumbs = {breadcrumbs}
        navLinks = {navLinks}
    ></Navbar>
    
    <div class="py-8 h-screen"
        style="font-family: 'geo-regular', sans-serif;"
    >

        <div class="py-8"
            on:introend={() => showButtons = true}>
            <p class="text-8xl justify-center text-center flex items-center w-full text-[#FCFFF9]">Contact Me!</p>
        </div>

        {#if showButtons}
        <div class="flex-grow py-16 flex flex-col justify-center items-center gap-8"
            style="font-family: 'atkinson-hyperlegible-next', sans-serif;"
            transition:fly={{delay:300, duration:300, x:0, y:150}}
            on:introend={() => showLinks = true}
        >
            <CoolButton 
                text = "Check out my (public) code!"
                imgSrc = "/src/lib/assets/github-fixed.png"
                href = "https://github.com/TheOneAndOlee"
                invert = {1.0}
            />

            <CoolButton 
                text = "Connect with me!"
                imgSrc = "/src/lib/assets/linkedIn.webp"
                href = "https://www.linkedin.com/in/olee10"
                invert = {0.0}
            />
        </div>
        {/if}

        <!-- {#if showButtons}
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
        {/if} -->
    </div>

        <!-- TODO 
            1. Find carousel effect, or a list of buttons for different contacts
            2. Contacts to add: LinkedIn, Github, and Email 
        -->
</div>