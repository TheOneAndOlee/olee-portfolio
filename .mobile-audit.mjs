import { pathToFileURL } from 'node:url';

const playwright = await import(
	pathToFileURL(
		'C:/Users/Osmond/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
	)
);

const baseUrl = 'http://127.0.0.1:5173';
const routes = [
	'/',
	'/about',
	'/resume',
	'/socials',
	'/projects/vrrocketry',
	'/projects/dart',
	'/projects/fac',
	'/projects/infernal-cycle',
	'/projects/party-school',
	'/projects/fish-fracas',
	'/projects/dim-sum'
];
const viewports = [
	{ name: 'narrow', width: 320, height: 568 },
	{ name: 'compact', width: 360, height: 800 },
	{ name: 'standard', width: 390, height: 844 }
];

const browser = await playwright.chromium.launch({
	headless: true,
	executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
});
const results = [];

for (const viewport of viewports) {
	const context = await browser.newContext({
		viewport: { width: viewport.width, height: viewport.height },
		deviceScaleFactor: 1,
		isMobile: true,
		hasTouch: true
	});
	const page = await context.newPage();
	const pageErrors = [];
	page.on('pageerror', (error) => pageErrors.push(error.message));
	await page.route('**/*', async (route) => {
		const requestUrl = new URL(route.request().url());
		if (requestUrl.hostname === '127.0.0.1') {
			await route.continue();
		} else {
			await route.abort();
		}
	});

	for (const route of routes) {
		pageErrors.length = 0;
		const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
		await page.waitForTimeout(250);
		await page.evaluate(async () => {
			const step = Math.max(240, Math.floor(window.innerHeight * 0.7));
			for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
				window.scrollTo(0, y);
				await new Promise((resolve) => window.setTimeout(resolve, 25));
			}
			window.scrollTo(0, document.documentElement.scrollHeight);
			await new Promise((resolve) => window.setTimeout(resolve, 100));
		});
		const revealTargets = page.locator('[data-reveal]');
		for (let index = 0; index < (await revealTargets.count()); index += 1) {
			await revealTargets.nth(index).scrollIntoViewIfNeeded();
			await page.waitForTimeout(80);
		}
		const metrics = await page.evaluate(() => {
			const viewportWidth = document.documentElement.clientWidth;
			const overflowElements = [...document.querySelectorAll('*')]
				.filter((element) => {
					const rect = element.getBoundingClientRect();
					const style = getComputedStyle(element);
					return (
						style.display !== 'none' &&
						style.visibility !== 'hidden' &&
						rect.width > 0 &&
						(rect.right > viewportWidth + 1 || rect.left < -1)
					);
				})
				.slice(0, 8)
				.map((element) => {
					const rect = element.getBoundingClientRect();
					return {
						tag: element.tagName.toLowerCase(),
						className: String(element.className).slice(0, 100),
						left: Math.round(rect.left),
						right: Math.round(rect.right),
						width: Math.round(rect.width)
					};
				});
			const brokenImages = [...document.images]
				.filter((image) => image.complete && image.naturalWidth === 0)
				.map((image) => image.getAttribute('src'));

			return {
				viewportWidth,
				documentWidth: document.documentElement.scrollWidth,
				horizontalOverflow: document.documentElement.scrollWidth > viewportWidth + 1,
				overflowElements,
				brokenImages,
				hiddenRevealCount: document.querySelectorAll(
					"[data-reveal]:not([data-reveal='visible'])"
				).length,
				hiddenTimelineDotCount: document.querySelectorAll(
					"[data-timeline-item]:not([data-timeline-visible='true'])"
				).length
			};
		});

		results.push({
			viewport: viewport.name,
			route,
			status: response?.status() ?? null,
			...metrics,
			pageErrors: [...pageErrors]
		});

		if (viewport.name === 'standard' && ['/', '/resume', '/projects/fac'].includes(route)) {
			await page.evaluate(() => window.scrollTo(0, 0));
			await page.waitForTimeout(100);
			const filename = route === '/' ? 'home' : route.split('/').filter(Boolean).join('-');
			await page.screenshot({
				path: `C:/Users/Osmond/AppData/Local/Temp/olee-mobile-${filename}.png`,
				fullPage: true
			});
		}

		if (viewport.name === 'narrow' && ['/', '/resume', '/projects/vrrocketry'].includes(route)) {
			await page.evaluate(() => window.scrollTo(0, 0));
			await page.waitForTimeout(100);
			const filename = route === '/' ? 'home' : route.split('/').filter(Boolean).join('-');
			await page.screenshot({
				path: `C:/Users/Osmond/AppData/Local/Temp/olee-mobile-narrow-${filename}.png`
			});
		}
	}

	await context.close();
}

await browser.close();
const failures = results.filter(
	(result) =>
		result.status !== 200 ||
		result.horizontalOverflow ||
		result.brokenImages.length > 0 ||
		result.hiddenRevealCount > 0 ||
		result.hiddenTimelineDotCount > 0 ||
		result.pageErrors.length > 0
);
console.log(
	JSON.stringify(
		{
			checks: results.length,
			viewports: viewports.map(({ name, width, height }) => ({ name, width, height })),
			failures
		},
		null,
		2
	)
);
