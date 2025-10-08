<script>
    import { Colors } from '$lib/assets/Colors.js';

    export let navLinks = [
        { text: 'About', href: '#' },
        { text: 'Projects', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Contact', href: '#' }
    ];

    let backgroundColor = Colors.BGBlack;
    let textColor = Colors.WhiteText;

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
<nav class="bg-[{backgroundColor}] shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <!-- Breadcrumb -->
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <a href="../" class="text-xl font-bold text-[{textColor}]">Logo</a>
                </div>
                <div class="hidden md:block">
                    <nav aria-label="Breadcrumb">
                        <ol class="ml-10 flex items-center space-x-4">
                            <li>
                                <div>
                                    <a href="/" class="text-[{textColor}] hover:text-gray-700">
                                        <svg class="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="sr-only">Home</span>
                                    </a>
                                </div>
                            </li>
                            
                            <!-- Dynamic Breadcrumb items -->
                            {#each breadcrumbs as breadcrumb}
                                <li>
                                    <div class="flex items-center">
                                        <svg class="h-5 w-5 flex-shrink-0 text-[{textColor}]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                        </svg>
                                        {#if breadcrumb.current}
                                            <span aria-current="page" class="ml-4 text-sm font-medium text-[{textColor}]">{breadcrumb.text}</span>
                                        {:else}
                                            <a href={breadcrumb.href} class="ml-4 text-sm font-medium text-[{textColor}] hover:text-gray-700">{breadcrumb.text}</a>
                                        {/if}
                                    </div>
                                </li>
                            {/each}
                        </ol>
                    </nav>
                </div>
            </div>

            <!-- Right side links -->
            <div class="hidden md:block">
                <div class="ml-4 flex items-center md:ml-6 space-x-4">
                    {#each navLinks as link}
                        <a href={link.href} class="text-[{textColor}] hover:text-gray-900 px-3 py-2 text-sm">
                            {link.text}
                        </a>
                    {/each}
                </div>
            </div>

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
                <a href={link.href} class="text-[{textColor}] hover:bg-gray-100 hover:text-gray-900">
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
        font-family: 'Inter', sans-serif;
        background-color: #f3f4f6; /* Equivalent to bg-gray-100 */
    }
</style>

