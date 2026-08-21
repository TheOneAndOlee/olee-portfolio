<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ContactButton from '$lib/components/ContactButton.svelte';
	import { colors } from '$lib/data/colors';
	import type { ContactItem } from '$lib/types';
	import githubIcon from '$lib/assets/socials/github.png';
	import linkedinIcon from '$lib/assets/socials/LinkedIn.png';
	import emailIcon from '$lib/assets/socials/email.png';

	const { TextWhite, BackgroundBlack } = colors;
	const pageStyle = `background-color: ${BackgroundBlack}; color: ${TextWhite};`;
	const headingStyle = `color: ${AccentGold};`;

	const contacts: ContactItem[] = [
		{ name: 'GitHub', icon: githubIcon, link: 'https://github.com/TheOneAndOlee' },
		{ name: 'LinkedIn', icon: linkedinIcon, link: 'https://linkedin.com/in/toao' },
		{ name: 'Email', icon: emailIcon, link: 'mailto:toaodeveloper@gmail.com' }
	];
</script>

<svelte:head>
	<title>Socials | Osmond Lee</title>
</svelte:head>

<div class="min-h-screen" style={pageStyle}>
	<Header />

	<main class="flex flex-col items-center pt-8 pb-16">
		<h1 class="mb-12 text-4xl font-normal md:mb-16 md:text-5xl lg:text-6xl" style={headingStyle}>
			Socials
		</h1>

		<div class="w-full px-4 sm:px-8 md:px-12 lg:px-[15%] xl:px-[20%]">
			<div class="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12">
				{#each contacts as contact}
					<div class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)]">
						<ContactButton name={contact.name} icon={contact.icon} link={contact.link} />
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>
