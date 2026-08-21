import dpiLogo from '$lib/assets/organizations/DPI.png';
import ieLogo from '$lib/assets/organizations/IlliniEsports.png';
import studioLogo from '$lib/assets/organizations/Studio.png';
import gamebuildersLogo from '$lib/assets/organizations/Gamebuilders.png'
import gengLogo from '$lib/assets/organizations/Gen.G.png'
import uiucLogo from '$lib/assets/organizations/UIUC.png'


export const skills = [
	{ label: 'Languages', items: ['C++', 'C#', 'GDScript', 'Kotlin', 'Python'] },
	{
		label: 'Software/Tools',
		items: ['Visual Studio', 'Git', 'GitHub', 'Perforce', 'MongoDB', 'Android Studio', 'Jira', 'Blender']
	},
    { label: 'Game Engines & Frameworks', items: ['Godot', 'Unity', 'Unreal Engine 5', 'Svelte'] }
];

export const activitySections = [
	{
		id: 'professional-experience',
		title: 'Professional Experience',
		activities: [
			{
				id: 'studio-illinois',
				organization: 'The Stu/Dio at Illinois',
				role: 'Gameplay Programmer',
				location: 'Urbana-Champaign, IL, USA',
				date: 'Aug 2025 – Present',
				points: [
                    '**Collaborated** with designers, programmers, and sponsors to implement a Computational Fluid Dynamics (CFD) visualizer using UE5’s Niagara Particle System, Blueprints, and C++.', 
                    '**Engineered** modular UI interfaces in Unreal Engine 5, resolving critical UI bugs and enhancing user experience.', 
                    '**Designed and implemented** a user-interactive level, enabling the user to rotate and choose between 2 planes to simulate.',
                    '**Translated** user feedback into actionable gameplay improvements by implementing and refining features for a mobile title in Unity.',
                    '**Maintain** code base quality by conducting regular peer reviews using Perforce and Helix Swarm.'
                ],
				logo: {
					imageSrc: studioLogo,
					imageAlt: 'Stu/Dio Logo'
				}
			},
            {
				id: 'sti-dpi',
				organization: 'Discovery Partners Institute',
				role: 'Summer Tech Intern',
				location: 'Chicago, IL, USA',
				date: 'Jun 2025 – Aug 2025',
				points: [
                    '**Integrated** MongoDB into a social networking app using Kotlin Coroutines for research, looking at how to turn in-person connections into online connections.',
                    '**Processed** 30+ logs from MongoDB Atlas using a Python algorithm, finding 25 social encounters.', 
                    '**Developed** practical skills in technical interviews, AI, and entrepreneurship by completing 14 workshops on tech career topics.',
                ],
				logo: {
					imageSrc: dpiLogo,
					imageAlt: 'Discovery Partners Institute logo'
				}
			},
			{
				id: 'digital-scholars',
				organization: 'Discovery Partners Institute',
				role: 'Digital Scholar',
				location: 'Chicago, IL, USA',
				date: 'June 2024 – Aug 2024',
				points: [
                    '**Explored** basic concepts in computing and techniques for solving programming problems in Java.', 
                    '**Developed** a potential practice Java problem for learncs.online, a website teaching Java and Kotlin to beginners.', 
                ],
				logo: {
					imageSrc: dpiLogo,
					imageAlt: 'Stu/Dio Logo'
				}
			}
		]
	},
	{
		id: 'activities-and-leadership',
		title: 'Activities and Leadership',
		activities: [
            {
                id: 'illini-esports',
                organization: 'Illini Esports',
                role: 'Minecraft Community Coordinator',
                location: 'Urbana-Champaign, IL, USA',
                date: 'Oct 2025 – Present',
                points: [
                    '**Serve** as one of two primary liaisons between administration and a 40+ member community, managing communications and providing critical updates.',
                    '**Co-led** the successful re-launch of the Illini Esports Minecraft server for 15+ concurrent users while enforcing community guidelines and moderation policies.',
                    '**Coordinate and supervise** weekly community events to drive server growth and player engagement.'
                ],
                logo: {
                    imageSrc: ieLogo,
					imageAlt: "Illini Esports Logo"
                }
            },
			{
				id: 'geng-practicum',
				organization: 'Gen.G Esports',
				role: 'Game Design Practicum Trainee',
				location: 'Seoul, South Korea',
				date: 'Jul 2026 – Aug 2026',
				points: [
					'**Designed and ideated** core mechanics for an original game, leveraging targeted market research to ensure the gameplay aligned with target audience preferences.',
                    '**Fostered** collaboration within a 6-person horizontal team, successfully mediating creative discussions and building consensus to drive design decisions forward.', 
                    '**Pitched** the unified game concept and design pillars to live audiences and Gen.G C-suite executives, clearly communicating the team\'s creative vision.'
                ],
				logo: {
					imageSrc: gengLogo,
					imageAlt: 'Gen.G'
				}
			},
			{
				id: 'gamebuilders',
				organization: 'Gamebuilders',
				role: 'SFX Artist',
				location: 'Urbana-Champaign, IL, USA',
				date: 'Sep 2025 – Dec 2025',
				points: [
                    '**Designed and play-tested** The Downstairs, a psychological horror game, with a team of 15 students.', 
                    '**Produced and engineered** 44 immersive sound effects using Audacity to build a psychological horror atmosphere.', 
                    '**Gained** experience in a game development pipeline, collaborating directly with artists and programmers on asset implementation.'
                ],
				logo: {
					imageSrc: gamebuildersLogo,
					imageAlt: 'Gamebuilders'
				}
			}
		]
	},
	{
		id: 'coursework-and-projects',
		title: 'Coursework and Projects',
		activities: [
            {
                id: 'gsd-405',
                organization: 'GSD 405: Intro to the Video Game Dev. Process',
                role: 'Programmer & Designer',
                location: 'Urbana-Champaign, IL, USA',
                date: 'Aug 2025 – Dec 2025',
                points: [
                    '**Architected and programmed** all core technical systems in Unity as the sole programmer, building frameworks from the ground up for 2D platforming physics, combat mechanics, and enemy AI.',
                    '**Collaborated** directly with artists and audio engineers to seamlessly implement 2D sprite animations, images, and sounds into Unity.'
                ],
                logo: {
                    imageSrc: uiucLogo,
					imageAlt: "UIUC Logo"
                }
            },
			{
				id: 'cs-415',
				organization: 'CS 415: Game Development',
				role: 'Programmer & Designer',
				location: 'Urbana-Champaign, IL, USA',
				date: 'Jan 2026 – May 2026',
				points: [
                    '**Engineered** a robust multiplayer framework in Unreal Engine 5 using the Advanced Steam Sessions plugin, enabling reliable lobby creation and player connectivity.', 
                    '**Prototyped** core prop-hunt mechanics, programming the logic and systems required for players to disguise themselves, interact with the environment, and navigate the game loop.', 
                ],
				logo: {
					imageSrc: uiucLogo,
					imageAlt: 'UIUC Logo'
				}
			}
		]
	}
];
