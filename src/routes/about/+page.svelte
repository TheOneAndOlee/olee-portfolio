<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Header from '$lib/components/Header.svelte';
	import { colors } from '$lib/data/colors';

	const headshot = '/betterHeadshot.webp';

	const { TextWhite, BackgroundBlack, AccentGold } = colors;
	const pageStyle = `background-color: ${BackgroundBlack}; color: ${TextWhite};`;
	const headingStyle = `color: ${TextWhite};`;
	const headshotBorderStyle = `border-color: ${AccentGold};`;
</script>

<svelte:head>
	<title>About | Osmond Lee</title>
</svelte:head>

<div class="min-h-screen" style={pageStyle}>
	<Header />

	<main class="flex flex-col items-center pt-8 pb-16">
		<h1
			class="page-title mb-12 text-4xl font-normal sm:text-5xl md:mb-16 md:text-6xl"
			style={headingStyle}
		>
			Literally me fr
		</h1>

		<div class="w-full px-4 sm:px-8 md:px-12 lg:px-[15%] xl:px-[20%]">
			<section data-reveal use:reveal>
				<div class="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
					<div
						class="headshot-frame w-48 shrink-0 overflow-hidden border-2 sm:w-56 md:w-56 lg:w-64"
						style={headshotBorderStyle}
					>
						<img
							src={headshot}
							alt="Osmond Lee headshot"
							class="headshot-image h-auto w-full object-cover object-center md:h-full"
						/>
					</div>

					<div
						class="flex flex-1 flex-col justify-between space-y-4 text-base leading-relaxed sm:text-xl md:space-y-0"
					>
						<p>
							Hey! I'm Osmond Lee, I'm an undergraduate at the University of Illinois Urbana
							Champaign (UIUC) majoring in computer science with a minor in game studies and design.
						</p>
						<p>
							I currently work as a gameplay programmer and playtester at the Stu/Dio, a student-led
							game studio here on campus that works with professors to deliver games under their
							vision and budget.
						</p>
						<p>
							As of right now, I'm working on VRRocketry and VArchaeology, VR games made with Unreal
							Engine 5.
						</p>
					</div>
				</div>

				<div class="mt-6 space-y-4 text-base leading-relaxed sm:text-xl">
					<p>
						I'm personally interested in a lot of things, but some of my main interests as of right
						now are:
					</p>
					<ul class="list-disc space-y-1 pl-6">
						<li>E-Sports (Valorant, CS2, Overwatch, Smash, etc.)</li>
						<li>Player-centered design in multiplayer titles</li>
						<li>
							Watching youtube videos about the above two (Coach Ocie, Shounic, Marblr, Sliggy,
							Arch, etc.)
						</li>
						<li>Cooking!</li>
						<!-- <li>MINECRAFT AND POKEMON RAHHHHHH</li> -->
					</ul>
				</div>
			</section>

			<!-- <p class="mt-6 text-base">Fun Fact: I drew the favicon myself! It's supposed to be a computer mouse, but as you can probably see, I'm not very good at art T_T</p> -->
		</div>
	</main>
</div>

<style>
	.headshot-frame {
		transition:
			box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.headshot-image {
		transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.headshot-frame:hover {
		box-shadow: 0.45rem 0.45rem 0 color-mix(in srgb, var(--color-accent) 72%, transparent);
		transform: translate(-0.2rem, -0.2rem);
	}

	.headshot-frame:hover .headshot-image {
		transform: scale(1.025);
	}
</style>
