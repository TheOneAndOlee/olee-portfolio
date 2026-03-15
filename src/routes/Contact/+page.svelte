<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ContactButton from '$lib/components/ContactButton.svelte';
	import githubIcon from '$lib/assets/github.png';
	import linkedinIcon from '$lib/assets/LinkedIn.png';
	import emailIcon from '$lib/assets/email.png';

	// Update these with your actual social media links
	const contacts = [
		{ name: "GitHub", icon: githubIcon, link: "https://github.com/TheOneAndOlee" },
		{ name: "LinkedIn", icon: linkedinIcon, link: "https://linkedin.com/in/toao" },
		{ name: "Email", icon: emailIcon, link: "mailto:toaodeveloper@gmail.com" }
	];
</script>

<div class="min-h-screen bg-white">
	<Header />

	<main class="flex flex-col items-center py-16">
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-normal mb-12 md:mb-16">Contact</h1>

		<div class="w-full px-4 sm:px-8 md:px-12 lg:px-[15%] xl:px-[20%]">
			<div class="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12">
				{#each contacts as contact}
					<div class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)]">
						<ContactButton 
							name={contact.name} 
							icon={contact.icon} 
							link={contact.link} 
						/>
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>
