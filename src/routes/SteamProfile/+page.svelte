<script lang="ts">
    export let data;    
    import '../../app.css'
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
    import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
    import { Colors } from '$lib/assets/Colors.js';

    let textColor = Colors.WhiteText;

    const navLinks = [
        {text: 'About', href: '../About'},
        {text: 'Projects', href: '../Projects'},
        {text: 'Contact', href: '../Contact'},
        // {text: 'Blog', href: '../Blog'}
    ];

    const breadcrumbs = [
        { text: 'Home', href: '../'},
        { text: 'Projects', href: '../Projects'},
        { text: 'Steam Profile', href: '../SteamProfile', current: true}
    ];
</script>

<svelte:head>
    <title>My Steam Profile</title>
    <meta name="description" content="Olee's Steam Profile Page" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="relative w-full text-[#FCFFF9] h-screen flex flex-col">
    
    <Navbar
        breadcrumbs = {breadcrumbs}
        navLinks = {navLinks}
    ></Navbar>

    <h1 class="text-[5vh] mb-4 text-center w-full text-[{textColor}]">My Most Recently Played Steam Games!</h1>
    <em class="text-[2.25vh] text-center w-full">Data Source: {data.source} | Last Updated: {data.lastUpdated} | Total Games Played Recently: {data.totalGames}</em>
    
    <div class="container" style="font-family: 'Atkinson-Hyperlegible-Next', sans-serif; color: {textColor};">

        {#if data.recentGames && data.recentGames.length !== 0}
            <table class="table table-striped table-xl">
                <thead>
                    <tr>
                        <th class="text-[#041322]">Game</th>
                        <th class="text-[#041322]">Hours (Last 2 Weeks)</th>
                        <th class="text-[#041322]">Hours (Total)</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.recentGames as game}
                        <tr>
                            <td>{game.name}</td>
                            <td>{(game.playtime_2weeks / 60).toFixed(2)}</td>
                            <td>{(game.playtime_forever / 60).toFixed(2)}</td>
                        </tr>
                    {/each}
                </tbody> 
            </table>
        {:else}
            <p>No recent games found!</p>
        {/if}
    </div>
</div>

<style>
  .container {
    font-family: sans-serif;
    max-width: 800px;
    margin: 2rem auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
</style>