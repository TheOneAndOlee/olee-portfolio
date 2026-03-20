<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { colors } from '$lib/data/colors';
	import { skills } from '$lib/data/resume.js';

	const { TextWhite, HoverWhite, BackgroundBlack, AccentGold } = colors;
	const pageStyle = `background-color: ${BackgroundBlack}; color: ${TextWhite};`;
	const headingStyle = `color: ${AccentGold};`;
	const sectionBorderStyle = `border-color: ${AccentGold};`;
	const focusCardStyle = `border-color: ${AccentGold};`;
	const linkStyle = `border-color: ${AccentGold}; color: ${TextWhite}; --about-link-hover-bg: ${HoverWhite}; --about-link-hover-text: ${BackgroundBlack};`;

	const focusAreas = [
		{
			title: 'Gameplay Systems',
			description:
				'I build mechanics from prototype to polished feature, with a focus on readability, modularity, and player feedback loops.'
		},
		{
			title: 'Cross-Disciplinary Collaboration',
			description:
				'I enjoy working with designers, artists, and producers to convert goals into technical plans and shippable milestones.'
		},
		{
			title: 'Iterative Development',
			description:
				'I rely on playtests and bug triage to refine balance, improve UX clarity, and keep releases stable week over week.'
		}
	];

	const currentHighlights = [
		'Shipping sponsor-driven VR and mobile features in Unreal Engine 5 and Unity.',
		'Building portfolio-ready technical documentation and cleaner gameplay architecture.',
		'Expanding full-stack and frontend skills with Svelte to communicate projects clearly.'
	];

	const skillPreview = skills.slice(0, 3);
</script>

<div class="min-h-screen" style={pageStyle}>
	<Header />

	<main class="mx-auto w-full max-w-5xl px-6 pb-14 pt-4 sm:px-10 sm:pt-6">
		<section class="border-t border-slate-500 pt-2 sm:pt-3" style={sectionBorderStyle}>
			<h1 class="text-4xl leading-tight sm:text-5xl md:text-6xl" style={headingStyle}>About Me!</h1>
			<div class="mt-4 space-y-4 text-base leading-relaxed sm:text-lg">
				<p>
					Hey! I'm Osmond Lee, I'm a undergraduate at the University of Illinois Urbana Champaign (UIUC) majoring in computer science with a minor in game studies and design.
				</p>
				<p>
					I currently work as a gameplay programmer and playtester at the Stu/Dio, a student-led game studio here on campus that works with professors to deliver games under their vision and budget. 
					As of right now, I'm working on VRRocketry and DART, a VR game built in Unreal Engine 5 and a mobile title built in Unity, respectively.
				</p>
				<p>
					I'm personally interested in a lot of things, but some of my biggest interests as of right now are:
				</p>
				<ul class="list-disc space-y-1 pl-6">
					<li>E-Sports (Valorant, CS2, Overwatch, Smash, etc.)</li>
					<li>Game design and player psychology, especially in multiplayer titles</li>
					<li>Playing games (I play a LOT of games)</li>
					<li>MINECRAFT AND POKEMON RAHHHHHH</li>
				</ul>
			</div>

			<div class="mt-6 flex flex-wrap gap-3 sm:gap-4">
				<a href="/" class="about-link border px-4 py-2 text-sm sm:text-base" style={linkStyle}>View My Work</a>
				<a href="/resume" class="about-link border px-4 py-2 text-sm sm:text-base" style={linkStyle}>Resume</a>
				<a href="/socials" class="about-link border px-4 py-2 text-sm sm:text-base" style={linkStyle}>Contact</a>
			</div>
		</section>

		<!-- <section class="mt-6 border-t border-slate-500 pt-2 sm:pt-3" style={sectionBorderStyle}>
			<h2 class="text-4xl leading-tight sm:text-5xl md:text-6xl" style={headingStyle}>What I Focus On</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
				{#each focusAreas as area}
					<article class="border border-slate-500 p-4" style={focusCardStyle}>
						<h3 class="text-lg font-semibold sm:text-xl">{area.title}</h3>
						<p class="mt-2 text-sm leading-relaxed sm:text-base">{area.description}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="mt-6 border-t border-slate-500 pt-2 sm:pt-3" style={sectionBorderStyle}>
			<h2 class="text-4xl leading-tight sm:text-5xl md:text-6xl" style={headingStyle}>Current Toolkit</h2>
			<div class="mt-3 space-y-3 sm:space-y-4">
				{#each skillPreview as skill (skill.label)}
					<div class="grid grid-cols-1 gap-1 sm:grid-cols-[13rem_1fr] sm:gap-4">
						<h3 class="text-base font-semibold sm:text-lg">{skill.label}</h3>
						<p class="text-sm sm:text-base">{skill.items.join(', ')}</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="mt-6 border-t border-slate-500 pt-2 sm:pt-3" style={sectionBorderStyle}>
			<h2 class="text-4xl leading-tight sm:text-5xl md:text-6xl" style={headingStyle}>Right Now</h2>
			<ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
				{#each currentHighlights as highlight}
					<li>{highlight}</li>
				{/each}
			</ul>
		</section> -->
	</main>
</div>

<style>
	.about-link {
		transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
	}

	.about-link:hover {
		background-color: var(--about-link-hover-bg);
		color: var(--about-link-hover-text);
	}
</style>
