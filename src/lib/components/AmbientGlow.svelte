<script lang="ts">
	import { onMount } from 'svelte';

	let glowElement: HTMLDivElement;

	onMount(() => {
		const finePointer = window.matchMedia('(pointer: fine)');
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

		if (!finePointer.matches || reducedMotion.matches) {
			return;
		}

		let animationFrame = 0;
		let pointerX = window.innerWidth * 0.5;
		let pointerY = window.innerHeight * 0.35;

		const paint = () => {
			glowElement.style.setProperty('--pointer-x', `${pointerX}px`);
			glowElement.style.setProperty('--pointer-y', `${pointerY}px`);
			animationFrame = 0;
		};

		const handlePointerMove = (event: PointerEvent) => {
			pointerX = event.clientX;
			pointerY = event.clientY;

			if (!animationFrame) {
				animationFrame = window.requestAnimationFrame(paint);
			}
		};

		window.addEventListener('pointermove', handlePointerMove, { passive: true });

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			window.cancelAnimationFrame(animationFrame);
		};
	});
</script>

<div bind:this={glowElement} class="ambient-glow" aria-hidden="true"></div>

<style>
	.ambient-glow {
		--pointer-x: 50vw;
		--pointer-y: 35vh;
		position: fixed;
		z-index: 60;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(
			24rem circle at var(--pointer-x) var(--pointer-y),
			rgba(253, 149, 30, 0.11),
			transparent 70%
		);
		mix-blend-mode: multiply;
		will-change: background;
	}

	@media (pointer: coarse), (prefers-reduced-motion: reduce) {
		.ambient-glow {
			display: none;
		}
	}
</style>
