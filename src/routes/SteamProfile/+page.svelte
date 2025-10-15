<script lang="ts">
    export let data;    
    import '../../app.css'
    import CoolButton from '$lib/components/ui/CoolButton/CoolButton.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
    import { Colors } from '$lib/assets/Colors.js';

    let textColor = Colors.WhiteText;

</script>

<svelte:head>
    <title>Steam Profile - Olee's Portfolio</title>
    <meta name="description" content="Olee's Steam Profile Page" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="container">
    <h1 class="text-4xl mb-4 text-center w-full text-[{textColor}]">My Most Recently Played Steam Games!</h1>
    
    <table class="table table-striped table-xl">
        <thead>
            <tr>
                <th>Game</th>
                <th>Hours (Last 2 Weeks)</th>
                <th>Hours (Total)</th>
            </tr>
        </thead>
        <tbody>
            {#each data.recentGames as game}
                <tr>
                    <td>{game.name}</td>
                    <td>{(game.playtime2Weeks / 60).toFixed(2)}</td>
                    <td>{(game.playtimeTotal / 60).toFixed(2)}</td>
                </tr>
            {/each}
        </tbody> 
    </table>
</div>