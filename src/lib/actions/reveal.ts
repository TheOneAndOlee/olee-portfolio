type RevealOptions = {
	delay?: number;
};

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	let observer: IntersectionObserver | undefined;

	function setDelay(delay = 0) {
		node.style.setProperty('--reveal-delay', `${Math.max(0, delay)}ms`);
	}

	function show() {
		node.dataset.reveal = 'visible';
		observer?.unobserve(node);
	}

	setDelay(options.delay);

	if (
		typeof IntersectionObserver === 'undefined' ||
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		show();
	} else {
		observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					show();
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
		);

		observer.observe(node);
	}

	return {
		update(nextOptions: RevealOptions = {}) {
			setDelay(nextOptions.delay);
		},
		destroy() {
			observer?.disconnect();
		}
	};
}
