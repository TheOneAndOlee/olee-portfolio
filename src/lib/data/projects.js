import android from '$lib/assets/platforms/Android_Dark.svg';
import ios from '$lib/assets/platforms/App_Store_Dark.svg';
import itchio from '$lib/assets/platforms/Itchio_Dark.svg';
import oculus from '$lib/assets/platforms/Oculus_Dark.svg';
import androidStudio from '$lib/assets/tools/Android_Studio_Regular.png';
import godot from '$lib/assets/tools/Godot_Dark.svg';
import unity from '$lib/assets/tools/Unity_Dark.svg';
import unrealEngine from '$lib/assets/tools/Unreal_Engine_Dark.svg';
import githubIcon from '$lib/assets/socials/github.png';
import perforce from '$lib/assets/tools/Perforce.svg';
import jira from '$lib/assets/tools/Jira.png';
import slack from '$lib/assets/tools/Slack.svg';

import fishFracasThumbnail from '$lib/assets/thumbnails/FishFracas.png';
import facThumbnail from '$lib/assets/thumbnails/FAC_Mockup.svg';
import vrrThumbnail from '$lib/assets/thumbnails/VRRocketry2.png';
import dartThumbnail from '$lib/assets/thumbnails/DART.png';


import vrrDemoVideo from '$lib/assets/videos/VRRDemoVideo.mp4';
import dartDemoVideo from '$lib/assets/videos/DARTDemoVideo.mp4';

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
        video: vrrDemoVideo,
        gameEngine: { name: 'Unreal Engine 5', icon: unrealEngine },
        detailLines: [
            'Role: Programmer',
            'Duration: Phase 1 (13 Weeks), Phase 2 (2 Weeks, Ongoing)',
            'Team: 7 Members',
            '(3 Programmers, 1 PM, 1 Artist, 1 Designer, 1 Associate Producer)'
        ],
        supportingIcons: [unrealEngine, perforce, jira],
        content: {
            introductionTitle: 'Project Introduction',
            introduction: 'An educational rocketry simulation in VR, made possible through the APEC-APRU Academic Exchange Program grant with POSTECH, South Korea',
            summaryTitle: 'Summary of Work',
            summaryPoints: `
                - **Delivered a sponsor-driven VR application**, collaborating with artists and designers to translate client requirements into actionable technical design documents.
                - **Engineered modular VR user interfaces** using Unreal Engine 5 Blueprints, improving scalability and component reusability.
                - **Developed a Computational Fluid Dynamics visualizer** using the Niagara Particle System to simulate complex data.
                - **Implemented interactive level mechanics**, programming 3D user interactions such as plane rotation and selection.            `
        },
        actions: [
            { }
        ]
    },
    {
        id: 2,
        slug: 'dart',
        name: 'DART',
        platforms: [android, ios],
        image: dartThumbnail,
        imageVerticalAlign: 'middle',
        video: dartDemoVideo,
        gameEngine: { name: 'Unity', icon: unity },
        detailLines: [
            'Role: Programmer',
            'Duration: 11 Weeks (Ongoing)',
            'Team: 5 Members',
            '(1 Programmer, 1 PM, 3 Play-Testers'
        ],
        supportingIcons: [unity, jira],
        content: { 
            introductionTitle: 'Project Introduction',
            introduction: 'A mobile title designed to teach the elderly about real-world scams',
            summaryTitle: 'Summary of Work',
            summaryPoints: `
                 - **Resolved bugs and engineered new features** for an existing Unity mobile game, translating playtester feedback into actionable improvements.
                 - **Managed the Agile development cycle using Jira**, working closely with a Project Manager to track issues, prioritize tasks, and manage weekly sprints.
                 - **Delivered consistent weekly builds** to facilitate continuous, iterative playtesting and ensure app stability.
                 - **Implemented a streamlined tutorial navigation system**, optimizing user experiences for the elderly target audience.
            `
        },
        actions: [
            { }
        ]
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
            'Team: 2 Members',
            '(1 Developer, 1 Supervisor)'
        ],
        supportingIcons: [androidStudio, githubIcon, slack],
        content: {
            introductionTitle: 'Project Introduction',
            introduction: 'A mobile app designed to make networking at in-person events easier as part of Discovery Partners Institute\'s Summer Tech Interns Program.',
            summaryTitle: 'Summary of Work',
            summaryPoints: `
                 - **Integrated MongoDB into an existing Android application**, utilizing Kotlin Coroutines for asynchronous data logging.
                 - **Developed a Python-based algorithm** to parse user logs and detect physical encounters between event attendees.
                 - **Authored and maintained technical documentation** to improve codebase readibility and quicken future development.
                 - **Conducted rapid testing, iteration, and debugging** to optimize application performance and improve encounter-detection accuracy.
            `
        },
        actions: [
            { }
        ]
    },
    {
        id: 4,
        slug: 'fish-fracas',
        name: 'Fish Fracas',
        platforms: [itchio],
        image: fishFracasThumbnail,
        imageVerticalAlign: 'middle',
        video: '',
        // video: 'https://www.youtube.com/watch?v=8SB1omi9_B8',
        gameEngine: { name: 'Godot', icon: godot },
        // description: 'A 2D platform fighter where you and your opponent are tied together, made for the 2025 Gamebuilders Game Jam with the theme of "tired".',
        detailLines: [
            'Role: Programmer',
            'Duration: 48 Hours (Game Jam)',
            'Team: 8 Members',
            '(5 Programmers, 3 Artists)'
        ],
        supportingIcons: [godot, githubIcon],
        content: {
            introductionTitle: 'Project Introduction',
            introduction: 'A 2D platform fighter where you and your opponent are tied together, made for the 2025 Gamebuilders Game Jam with the theme of "tied".',
            summaryTitle: 'Summary of Work',
            summaryPoints: `
                - **Engineered a dynamic 2D rope system** in GDScript to serve as the core physical constraint between players.
                - **Iterated on rope and tension variables** to balance restrictive movement with slingshotty momentum.
                - **Debugged the knockback system**, ensuring functionality under the rope's constraints.
                - **Collaborated in a team of 8** to implement experimental constraints to make a functional gameplay loop.
            `
            // Move the actions buttons to the left side of the portfolio
        },
        actions: [
            { label: 'Itch.Io Page', href: 'https://bigspajeti.itch.io/game-jam-tied' }
        ]
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