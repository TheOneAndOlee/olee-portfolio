<!-- Sample Page -->
<!-- To be used whenever a new page is being made -->
<!-- For use, just make a copy of this page and build off of it! -->

<script lang="ts">
    // Imports
    import '../../app.css'
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
    import * as Card from '$lib/components/ui/card/index.js';
    import { Colors } from '$lib/assets/Colors.js';
    import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
    import { Badge } from "$lib/components/ui/badge/index.js";
	import { linear } from 'svelte/easing';
	import { Link } from '$lib/components/ui/breadcrumb';

    // Navbar Links - Update Accordingly!
    const navLinks = [
        {text: 'About', href: '../About'},
        {text: 'Projects', href: '../Projects'},
        {text: 'Contact', href: '../Contact'},
    ];

    // Breadcrumbs - Update Accordingly!
    const breadcrumbs = [
        { text: 'Home', href: '../'},
        { text: 'Projects', href: '../Projects', current: true }
    ];

    const projects = [
        {
            title: "VRRocketry",
            description: "A rocketry simulation in VR",
            tags: ["Unreal Engine 5", "VR/AR/XR", "Unreal Engine Blueprints", "Game Development", "Collaboration", "Perforce", "Playtesting"],
            link: "../../"
        },
        {
            title: "Find and Connect",
            description: "A social networking app for anyone",
            tags: ["MongoDB", "Android Studio", "Kotlin", "Kotlin Coroutines", "Python", "Quality Assurance", "Collaboration"],
            link: "../../"
        },
        {
            title: "Fish Fracas",
            description: "A submission for the Gamebuilders 2025 game jam",
            tags: ["Godot", "GDScript", "Collaboration", "Game Development", "GitHub"],
            link: "../../"
        },
        {
            title: "Richochet Standoff",
            description: "A simple shooting prototype with a twist, built in Unity for a course",
            tags: ["Unity", "C#", "Game Development", "GitHub"],
            link: "../../"
        },
        {
            title: "The Downstairs",
            description: "A horror game made as a part of Gamebuilders' 2024 Winter Session",
            tags: ["Audacity", "Playtesting", "Game Design"],
            link: "../../"
        },
        {
            title: "Illini Esports Minecraft",
            description: "Hosting and coordinating community events in Minecraft",
            tags: ["Community Management", "Event Planning", "Collaboration"],
            link: "../../"
        },
        {
            title: "Summer Tech Internship w/ Discovery Partners Institute",
            description: "A program focused on developing workforce skills in tech",
            tags: ["Professional Development", "Collaboration", "Interview Skills", "Resume Building", "Networking"],
            link: "../../"
        },
        {
            title: "Personal Website",
            description: "Creating this website using SvelteKit",
            tags: ["SvelteKit", "TypeScript", "TailwindCSS"],
            link: "../../"
        }
    ];

</script>

<!-- Head -->
<svelte:head>
    <title>My Projects</title>
    <meta name="description" content="Projects Page" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<!-- Actual Page Content -->
<div class="relative w-full text-[#FCFFF9] h-screen flex flex-col">
    <div class="flex flex-col flex-1 min-h-0">
        <Navbar
            breadcrumbs = {breadcrumbs}
            navLinks = {navLinks}
        ></Navbar>

        <div class="flex-1 overflow-y-auto p-8 md:p-12">
            <h1 class="w-full text-center justify-items-center mb-8 text-4xl">My Projects!</h1>

            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card.Root>
                    <Card.Header>
                        <Card.Title>VRRocketry</Card.Title>
                        <Card.Description>A rocketry simulation in VR</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>Card Content</p>
                    </Card.Content>
                    <Card.Footer>
                        <Button variant="link" size="sm">Learn More</Button>
                    </Card.Footer>
                </Card.Root>
            </div>
        </div>
    </div>
</div>