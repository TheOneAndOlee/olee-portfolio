<script>
    import { Colors } from '$lib/assets/Colors.js';
    import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
    import { Button } from '$lib/components/ui/button/index.js';

    export let navLinks = [
        { text: 'About', href: '#' },
        { text: 'Projects', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Contact', href: '#' }
    ];

    let backgroundColor = Colors.BGBlack;
    let textColor = Colors.WhiteText;
    let hoverColor = Colors.HoverGray;
    let gold = Colors.ButtonGold;
    let testBlue1 = Colors.TestBlue1;
    let testBlue2 = Colors.TestBlue2;

    export let breadcrumbs = [
        { text: 'Projects', href: '#' },
        { text: 'My Awesome Project', href: '#', current: true }
    ];

    let isMobileMenuOpen = false;

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
</script>

<!-- Navbar Component -->
<nav class="shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16" style="text-color: {textColor};">
            <!-- Breadcrumb -->
            
            <Breadcrumb.Root textColor={textColor}>
                <Breadcrumb.List>
                    {#each breadcrumbs as crumb, index}
                        <Breadcrumb.Item>
                            {#if crumb.current}
                                <Breadcrumb.Page>{crumb.text}</Breadcrumb.Page>
                            {:else}
                                <Breadcrumb.Link href={crumb.href}>{crumb.text}</Breadcrumb.Link>
                            {/if}
                        </Breadcrumb.Item>
                        {#if index < breadcrumbs.length - 1}
                            <Breadcrumb.Separator />
                        {/if}
                    {/each}
                </Breadcrumb.List>
            </Breadcrumb.Root>

            {#each navLinks as link}
                <Button variant="link" href={link.href} textColor={textColor}>{link.text}</Button>
            {/each}

            <!-- Mobile menu button -->
            <div class="-mr-2 flex md:hidden">
                <button on:click={toggleMobileMenu} type="button" class="bg-white inline-flex items-center justify-center p-2 rounded-md text-[{textColor}] hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                    <span class="sr-only">Open main menu</span>
                    {#if !isMobileMenuOpen}
                        <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    {:else}
                        <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    {/if}
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class:hidden={!isMobileMenuOpen} class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {#each navLinks as link}
                <a href={link.href} class="text-[{textColor}] hover:bg-gray-100 hover:text-[{hoverColor}]">
                    {link.text}
                </a>
            {/each}
        </div>
    </div>
</nav>

<style>
    /* You can add component-specific styles here if needed. */
    /* Note: To use TailwindCSS, you'll need to have it set up in your Svelte project. */
    :global(body) {
        font-family: 'Atkinson-Hyperlegible-Next', sans-serif;
        background-color: #f3f4f6; /* Equivalent to bg-gray-100 */
    }
</style>

