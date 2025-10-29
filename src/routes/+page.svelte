<script lang="ts">
    import '../app.css'
    import CoolButton from '$lib/components/ui/CoolButton/CoolButton.svelte';
    import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
    import { Colors } from '$lib/assets/Colors.js';


    const textColor = Colors.WhiteText;
    const buttonBlack = Colors.BGBlack;
    let showNext = false;
    let showIntro = false;
    let showButtons = false;
    let showStart = false;
    let showSecondary = false;

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
    ShadCN for a ton of stuff: https://www.shadcn-svelte.com/docs/components
-->

<!-- <Navbar /> -->

<svelte:head>
    <title>Welcome!</title>
    <meta name="description" content="Introductory Page" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="relative w-full text-[#FCFFF9] h-screen flex flex-col">
    <Navbar
        breadcrumbs = {breadcrumbs}
        navLinks = {navLinks}
    ></Navbar>
    <div class="flex flex-col flex-1 min-h-0">
        <div class="py-8"
            style="font-family: 'Atkinson-Hyperlegible-Next', sans-serif;"
            on:introend={() => showNext = true}
        >
            {#if showStart}
            <div 
                transition:fly={{delay:100, duration:300, x:225, y:0}}
                on:introend={() => showSecondary = true}
            >

                 <p class="text-[6.5vh] justify-center text-center flex items-center w-full text-[#FCFFF9]">Hey! I'm&nbsp;<u>Osmond Lee</u>,</p>
            </div>
            {/if}
            {#if showSecondary}
            <div 
                transition:fly={{delay:100, duration:300, x:225, y:0}}
                on:introend={() => showIntro = true}
            >

                 <p class="text-[3.5vh] justify-center text-center flex items-center w-full text-[#FCFFF9]">AKA&nbsp;<i>TheOneAndOlee</i>, or&nbsp;<i>TOAO</i>&nbsp;for short</p>
            </div>
            {/if}
        </div>

        {#if showIntro}
            <div class="flex flex-col lg:flex-row flex-grow min-h-0">
                <div class="h-full px-8 py-4" transition:fly={{delay:250, duration:300, x:-100, y:0}}>
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
                    <div class="space-y-[3vh] pb-[3vh]">
                        <p class="text-[3.2vh] w-full text-[#FCFFF9]">
                            I'm an undergraduate in Computer Science major at the University of Illinois Urbana Champaign, with a minor in Game Studies and Design.
                        </p>
                        <p class="text-[3.2vh] w-full text-[#FCFFF9]">
                            As an avid gamer, my dream is to work in the video game industry to design and develop games that create memorable experiences.
                        </p>
                        <p class="text-[3.2vh] w-full text-[#FCFFF9]">When I'm not doing schoolwork or working, you can find me cooking, playing video games, or writing up game design documents that will never see the light of day!</p>
                    </div>

                    <div class="flex-grow"></div>

                    {#if showButtons}
                        <div class="flex flex-col justify-center items-center gap-[2vh] py-8"
                            transition:fly={{delay:200, duration:300, x:0, y:225}}
                        >
                            <p class="underline text-[3.5vh] text-[#FCFFF9] text-center w-full justify-center items-center">Check out these links!</p>
                                
                            <div class="flex justify-center items-center gap-8">
                                <!-- <Button 
                                    variant="outline" 
                                    href='../About' 
                                    textColor={buttonBlack}
                                    size="xl3"
                                >
                                    About Me!
                                </Button> -->

                                <Button 
                                    variant="outline" 
                                    href='../Projects' 
                                    textColor={buttonBlack}
                                    size="xl3"
                                >
                                    Projects!
                                </Button>

                                <Button 
                                    variant="outline" 
                                    href='../Contact' 
                                    textColor={buttonBlack}
                                    size="xl3"
                                >
                                    Contact Me!
                                </Button>
                            </div>
                        </div>
                    {/if} 
       
                    <div class="flex-grow"></div>  
                </div>
            </div>
        {/if}

    </div>
</div>