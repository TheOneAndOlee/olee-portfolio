const android = '/platforms/AndroidDark.svg';
const ios = '/platforms/AppStoreDark.svg';
const itchio = '/platforms/ItchioDark.svg';
const oculus = '/platforms/OculusDark.svg';
const windows = '/platforms/WindowsDark.svg';
const androidStudio = '/tools/AndroidStudio.png';
const godot = '/tools/GodotDark.svg';
const unity = '/tools/UnityDark.svg';
const unrealEngine = '/tools/UnrealEngineDark.svg';
const githubIcon = '/socials/github.png';
const perforce = '/tools/Perforce.svg';
const jira = '/tools/Jira.png';
const slack = '/tools/Slack.svg';
const diversion = '/tools/Diversion.png';
const visualStudio = '/tools/VisualStudio.png';

const fishFracasThumbnail = '/thumbnails/FishFracas.png';
const facThumbnail = '/thumbnails/FACMockup.svg';
const vrrThumbnail = '/thumbnails/VRRocketry2.png';
const dartThumbnail = '/thumbnails/DART.png';
const infernalCycleThumbnail = '/thumbnails/InfernalCycle.png';
const partySchoolThumbnail = '/thumbnails/PartySchool.png';
const dimSumThumbnail = '/thumbnails/DimSumItUp.png';

/**
 * @param {string[] | string | null | undefined} summaryPoints
 * @returns {string[]}
 */
function normalizeSummaryPoints(summaryPoints) {
	if (Array.isArray(summaryPoints)) {
		return summaryPoints;
	}

	if (typeof summaryPoints !== 'string') {
		return [];
	}

	return summaryPoints
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => line.replace(/^[-*]\s+/, ''));
}

const darkModeInvertedProjectDescriptionIcons = [githubIcon, unrealEngine, unity, godot];

const projectList = [
	{
		id: 1,
		slug: 'vrrocketry',
		name: 'VRRocketry',
		platforms: [oculus],
		image: vrrThumbnail,
		imageVerticalAlign: 'middle',
		videos: ['/videos/VRRDemoVideo.mp4', '/videos/VRRDemoVideo2.MOV'],
		videoCaptions: [
			'A demo video showcasing our first iteration of the CFD visualizer, using the Niagara Particle System.',
			"A demo video showcasing the new CFD visualization. I'm the one playing the game in the beige hoodie."
		],
		gameEngine: { name: 'Unreal Engine 5', icon: unrealEngine },
		detailLines: [
			'**Role:** Programmer',
			'**Duration:** 24 Weeks\\nPhase 1 (13 Weeks) | Phase 2 (11 Weeks) Phase 3 (Ongoing)',
			'**Team:** 7 Members\\n3 Programmers, 1 PM, 1 Artist, 1 Designer, 1 Associate Producer'
		],
		supportingIcons: [unrealEngine, perforce, jira],
		content: {
			introductionTitle: 'Project Introduction',
			introduction:
				'An educational rocketry simulation in VR, made possible through the APEC-APRU Academic Exchange Program grant with POSTECH, South Korea.',
			summaryTitle: 'Summary of Work',
			summaryPoints: `
                - **Delivered a sponsor-driven VR application**, collaborating with artists and designers to translate client requirements into a playable prototype.
                - **Engineered modular VR user components** using Unreal Engine 5 Blueprint, improving scalability and component reusability.
                - **Developed a Computational Fluid Dynamics visualizer** using the Niagara Particle System to simulate complex data.
                - **Upgraded the CFD visualization system** to display real generated airflow data from OpenFOAM, replacing the previous procedural implementation.
                - **Implemented interactive level mechanics**, programming 3D user interactions such as plane rotation and selection.            
            `
		},
		actions: [{}]
	},
	{
		id: 2,
		slug: 'dart',
		name: 'DART',
		platforms: [android, ios],
		image: dartThumbnail,
		imageVerticalAlign: 'middle',
		video: '/videos/DARTDemoVideo.mp4',
		videoCaption:
			'A video showing the tutorial button I implemented, allowing users to go back to the tutorials',
		gameEngine: { name: 'Unity', icon: unity },
		detailLines: [
			'Role: Programmer',
			'Duration: 21 Weeks',
			'Team: 5 Members\\n1 Programmer, 1 PM, 3 Play-Testers'
		],
		supportingIcons: [unity, jira, visualStudio],
		content: {
			introductionTitle: 'Project Introduction',
			introduction: 'A mobile title designed to teach the elderly about real-world scams.',
			summaryTitle: 'Summary of Work',
			summaryPoints: `
                 - **Resolved bugs and engineered new features** for an existing Unity mobile game, translating playtester feedback into actionable improvements.
                 - **Managed the Agile development cycle using Jira**, working closely with a Project Manager to track issues, prioritize tasks, and manage weekly sprints.
                 - **Shipped a major version update to the iOS App Store**, managing the macOS build pipeline and ensuring compliance with App Store guidelines.
                 - **Implemented a streamlined tutorial navigation system**, optimizing user experiences for the elderly target audience.
            `
		},
		actions: [{}]
	},
	{
		id: 3,
		slug: 'fac',
		name: 'Find and Connect',
		platforms: [android],
		image: facThumbnail,
		imageVerticalAlign: 'top',
		video: '',
		gameEngine: { name: 'Android Studio', icon: androidStudio },
		// description: '',
		detailLines: [
			'Role: Android Developer',
			'Duration: 12 Weeks',
			'Team: 2 Members\\n(1 Developer, 1 Supervisor)'
		],
		supportingIcons: [androidStudio, githubIcon, slack],
		content: {
			introductionTitle: 'Project Introduction',
			introduction:
				"A mobile app designed to make networking at in-person events easier as part of Discovery Partners Institute's Summer Tech Interns Program.",
			summaryTitle: 'Summary of Work',
			summaryPoints: `
                 - **Integrated MongoDB into an existing Android application**, utilizing Kotlin Coroutines for asynchronous data logging.
                 - **Developed a Python-based algorithm** to parse user logs and detect physical encounters between event attendees.
                 - **Authored and maintained technical documentation** to improve codebase readibility and quicken future development.
                 - **Conducted rapid testing, iteration, and debugging** to optimize application performance and improve encounter-detection accuracy.
            `
		},
		actions: [{}]
	},
	{
		id: 4,
		slug: 'infernal-cycle',
		name: 'Infernal Cycle',
		platforms: [windows],
		image: infernalCycleThumbnail,
		imageVerticalAlign: 'middle',
		videos: ['/videos/InfernalCycleDemo.mp4', '/videos/InfernalCycleCodeOverview.mp4'],
		videoCaptions: [
			"A showcase of the game at the end of the semester. A lot of features were implemented, but I didn't have time to add more content.",
			'A video where I go through the codebase and explain some of the systems I implemented.'
		],
		gameEngine: { name: 'Unity', icon: unity },
		detailLines: [
			'**Role:** Programmer & Designer',
			'**Duration:** 15 Weeks (A Semester)',
			'**Team:** 5 Members\\n1 Programmers, 2 Artists, 1 Audio Engineer, 1 PM'
		],
		supportingIcons: [unity, githubIcon, jira, visualStudio],
		content: {
			introductionTitle: 'Project Introduction',
			introduction:
				'A 2D action-adventure prototype developed for GSD 405: Intro to Game Development Processes, where I served as the sole engineer collaborating with a multi-disciplinary team to bring design documents to life.',
			summaryTitle: 'Summary of Work',
			summaryPoints: `
                 - **Architected and programmed all core technical systems** in Unity as the sole programmer, building scalable frameworks from the ground up for 2D platforming physics, combat mechanics, and enemy AI.
                 - **Facilitated cross-disciplinary asset integration**, collaborating directly with artists and audio engineers to seamlessly implement 2D sprite animations, images, and soundscapes into the game engine.
                 - **Engineered combat and shop logic**, creating responsive player controls and varied shop behaviors to build an engaging gameplay loop.
            `
		},
		actions: [
			{ label: 'GitHub Repository', href: 'https://github.com/TheOneAndOlee/Infernal-Cycle-MK2' }
		]
	},
	{
		id: 5,
		slug: 'party-school',
		name: 'Party School',
		platforms: [windows],
		image: partySchoolThumbnail,
		imageVerticalAlign: 'middle',
		video: '',
		gameEngine: { name: 'Unreal Engine 5', icon: unrealEngine },
		detailLines: [
			'**Role:** Programmer and Designer',
			'**Duration:** 10 Weeks (School Project)',
			'**Team:** 5 Members\\n4 Programmers, 2 Artists'
		],
		supportingIcons: [unrealEngine, diversion],
		content: {
			introductionTitle: 'Project Introduction',
			introduction:
				'A multiplayer prop-hunt prototype developed over 10 weeks, focusing on network connectivity and multiple engaging core game mechanics.',
			summaryTitle: 'Summary of Work',
			summaryPoints: `
                - **Engineered a robust multiplayer framework** in Unreal Engine 5 using the Advanced Steam Sessions plugin, enabling reliable lobby creation and player connectivity.
                - **Prototyped core prop-hunt mechanics**, programming the logic and systems required for players to disguise themselves, interact with the environment, and navigate the game loop.
                - **Authored comprehensive design documentation**, establishing clear guidelines for mechanics to align the five-person team throughout the development cycle.
            `
		},
		actions: []
	},
	{
		id: 6,
		slug: 'fish-fracas',
		name: 'Fish Fracas',
		platforms: [itchio, windows],
		image: fishFracasThumbnail,
		imageVerticalAlign: 'middle',
		video: '',
		// video: 'https://www.youtube.com/watch?v=8SB1omi9_B8',
		gameEngine: { name: 'Godot', icon: godot },
		// description: 'A 2D platform fighter where you and your opponent are tied together, made for the 2025 Gamebuilders Game Jam with the theme of "tied/tied".',
		detailLines: [
			'Role: Programmer',
			'Duration: 48 Hours (Game Jam)',
			'Team: 8 Members\\n5 Programmers, 3 Artists'
		],
		supportingIcons: [godot, githubIcon],
		content: {
			introductionTitle: 'Project Introduction',
			introduction:
				'A 2D platform fighter where you and your opponent are tied together, made for the 2025 Gamebuilders Game Jam with the theme of "tied".',
			summaryTitle: 'Summary of Work',
			summaryPoints: `
                - **Engineered a dynamic 2D rope system** in GDScript to serve as the core physical constraint between players.
                - **Iterated on rope and tension variables** to balance restrictive movement with slingshotty momentum.
                - **Debugged the knockback system**, ensuring functionality under the rope's constraints.
                - **Collaborated in a team of 8** to implement experimental constraints to make a functional gameplay loop.
            `
		},
		actions: [{ label: 'Itch.Io Page', href: 'https://bigspajeti.itch.io/game-jam-tied' }]
	},
	{
		id: 7,
		slug: 'dim-sum',
		name: 'Dim Sum It Up!',
		platforms: [itchio, windows],
		image: dimSumThumbnail,
		imageVerticalAlign: 'middle',
		video: '',
		gameEngine: { name: 'Godot', icon: godot },
		detailLines: [
			'Role: Programmer and Designer',
			'Duration: 48 Hours (Game Jam)',
			'Team: 1 Member (Me)'
		],
		supportingIcons: [godot, githubIcon],
		content: {
			introductionTitle: 'Project Introduction',
			introduction:
				'A simple game about maximizing your dim sum score, made for the AAPI Heritage Game Jam 2026.',
			summaryTitle: 'Summary of Work',
			summaryPoints: `
                - **Engineered a simple 2D game** in GDScript, implementing a scoring system and basic player controls.
            `
		},
		actions: [{ label: 'Itch.Io Page', href: 'https://idioticicecube.itch.io/dim-sum-it-up' }]
	}
];

export const projects = projectList.map((project) => ({
	...project,
	darkModeInvertedIcons: darkModeInvertedProjectDescriptionIcons,
	content: project.content
		? {
				...project.content,
				summaryPoints: normalizeSummaryPoints(project.content.summaryPoints)
			}
		: project.content,
	link: `/projects/${project.slug}`
}));
