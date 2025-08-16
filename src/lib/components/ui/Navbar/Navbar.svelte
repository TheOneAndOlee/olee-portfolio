<script>
    import { onMount, onDestroy } from 'svelte';
    import '../app.css';

    let lastScrollY = 0;
    let visible = true;
    let ticking = false;
    let headerHeight = 0;
    // @ts-ignore
    let headerElement;

    function updateHeaderHeight() {
        // @ts-ignore
        if (headerElement) {
            headerHeight = headerElement.offsetHeight;
        }
    }

    function handleScroll() {
        if (typeof window === 'undefined') return;
        const currentY = Math.max(0, window.scrollY);
        if (currentY > lastScrollY) {
            visible = false;
        } else if (currentY < lastScrollY) {
            visible = true;
        }
        lastScrollY = currentY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking && typeof window !== 'undefined') {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', onScroll);
            window.addEventListener('resize', updateHeaderHeight);
            updateHeaderHeight();
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateHeaderHeight);
            updateHeaderHeight();
        }
    })
</script>

<header
    bind:this={headerElement}
    class="w-full justify-items-center text-center px-8 h-fit 
    bg-[#1C1A23] text-[#FCFFF9] shadow-lg z-100 fixed left-0 transition-all duration-400 ease-in-out"
    style="top: {visible ? '0' : `-${headerHeight}px`}; right:0; font-family: 'geo-regular', sans-serif;"
>
    <a class="text-[3rem] font-bold tracking-wider hover:drop-shadow-2xl hover:underline decoration-2 decoration-[#FCFFF9]" href='/' style="font-family: 'geo-regular', sans-serif;">OSMOND LEE</a>
    <nav class="w-full flex justify-items-center" style="font-family: 'geo-regular', sans-serif;">
        <a class="text-xl ml-6" href='/about'>About</a>
        <a class="text-xl ml-6" href='/projects'>Projects</a>
        <a class="text-xl ml-6" href='/work'>Work</a>
        <a class="text-xl ml-6" href='/resume'>Resume</a>
    </nav>
</header>