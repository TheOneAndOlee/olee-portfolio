<script>
    export let entryList = ["Sample"];
</script>

<div class="justify-center items-center text-center text-[#FCFFF9] text-5xl">
    
    {#each entryList as entry}
        <li class='py-4'><a href={"#" + entry} class='transition duration-300 hover:scale-120 ease-in-out inline-block'>- {entry}</a></li>
    {/each}

</div>