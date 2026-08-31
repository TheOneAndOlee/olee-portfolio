const TIMELINE_ITEM_SELECTOR = '[data-timeline-item]';

export function timeline(node: HTMLElement) {
	const items = Array.from(node.querySelectorAll<HTMLElement>(TIMELINE_ITEM_SELECTOR));
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	let animationFrame = 0;
	let resizeObserver: ResizeObserver | undefined;

	function revealAll() {
		node.style.setProperty('--timeline-progress', '1');
		items.forEach((item) => (item.dataset.timelineVisible = 'true'));
	}

	function update() {
		animationFrame = 0;

		if (reducedMotion.matches || items.length === 0) {
			revealAll();
			return;
		}

		const readingLine = window.innerHeight * 0.78;
		const firstRect = items[0].getBoundingClientRect();
		const lastRect = items[items.length - 1].getBoundingClientRect();
		const start = firstRect.top + Math.min(firstRect.height / 2, 12);
		const end = lastRect.top + Math.min(lastRect.height / 2, 12);
		const progress = Math.min(1, Math.max(0, (readingLine - start) / Math.max(1, end - start)));

		node.style.setProperty('--timeline-progress', progress.toFixed(3));

		items.forEach((item) => {
			const itemRect = item.getBoundingClientRect();
			if (itemRect.top + Math.min(itemRect.height / 2, 12) <= readingLine) {
				item.dataset.timelineVisible = 'true';
			}
		});
	}

	function scheduleUpdate() {
		if (!animationFrame) {
			animationFrame = window.requestAnimationFrame(update);
		}
	}

	window.addEventListener('scroll', scheduleUpdate, { passive: true });
	window.addEventListener('resize', scheduleUpdate, { passive: true });
	reducedMotion.addEventListener('change', scheduleUpdate);

	if (typeof ResizeObserver !== 'undefined') {
		resizeObserver = new ResizeObserver(scheduleUpdate);
		resizeObserver.observe(node);
	}

	scheduleUpdate();

	return {
		destroy() {
			window.removeEventListener('scroll', scheduleUpdate);
			window.removeEventListener('resize', scheduleUpdate);
			reducedMotion.removeEventListener('change', scheduleUpdate);
			resizeObserver?.disconnect();
			window.cancelAnimationFrame(animationFrame);
		}
	};
}
