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
				points: [
                    '**Collaborated** with designers, programmers, and sponsors to **implement** a Computational Fluid Dynamics (CFD) visualizer using UE5’s Niagara Particle System, Blueprints, and C++.', 
                    '**Engineered** modular UI interfaces in Unreal Engine 5, **resolving** critical UI bugs and **enhancing** user experience.', 
                    '**Designed and implemented** a user-interactive level, enabling the user to rotate and choose between 2 planes to simulate.',
                    '**Translated** user feedback into actionable gameplay improvements by implementing and refining features for a mobile title in Unity.',
                    '**Maintain** code base quality by conducting regular peer reviews using Perforce and Helix Swarm.'
                ],
				logo: {
					variant: 'badge',
					text: ['stu/', 'dio'],
					textColorClass: 'text-slate-800'
				}
			},
            {
				id: 'sti-dpi',
				organization: 'Discovery Partners Institute',
				role: 'Summer Tech Intern',
				points: [
                    '**Integrated** MongoDB into a social networking app using Kotlin Coroutines for research, looking at how to turn in-person connections into online connections.',
                    '**Processed** 30+ logs from MongoDB Atlas using a Python algorithm, finding 25 social encounters.', 
                    '**Developed** practical skills in technical interviews, AI, and entrepreneurship by completing 14 workshops on tech career topics.',
                ],
				logo: {
					variant: 'badge',
					text: ['DPI'],
					textColorClass: 'text-slate-800'
				}
			}
		]
	},
	{
		id: 'projects-and-activities',
		title: 'Projects & Activities',
		activities: [
            {
                id: 'illini-esports',
                organization: 'Illini Esports',
                role: 'Minecraft Community Coordinator',
                points: [
                    '**Serve** as one of two primary liaisons between administration and a 40+ member community, managing communications and providing critical updates.',
                    '**Co-led** the successful re-launch of the Illini Esports Minecraft server for 15+ concurrent users while enforcing community guidelines and moderation policies.',
                    '**Coordinate and supervise** weekly community events to drive server growth and player engagement.'
                ],
                logo: {
                    variant: 'badge',
                    text: ['IE']
                }
            },
			{
				id: 'gamebuilders',
				organization: 'Gamebuilders',
				role: 'SFX Artist',
				points: [
                    '**Designed and play-tested** The Downstairs, a psychological horror game, with a team of 15 students.', 
                    '**Produced and engineered** 44 immersive sound effects using Audacity to build a psychological horror atmosphere.', 
                    '**Gained** experience in a game development pipeline, collaborating directly with artists and programmers on asset implementation.'
                ],
				logo: {
					variant: 'badge',
					text: ['GB'],
					textColorClass: 'text-indigo-900'
				}
			}
		]
	}
];
