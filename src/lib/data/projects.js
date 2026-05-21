import android from '$lib/assets/platforms/AndroidDark.svg';
import ios from '$lib/assets/platforms/AppStoreDark.svg';
import itchio from '$lib/assets/platforms/ItchioDark.svg';
import oculus from '$lib/assets/platforms/OculusDark.svg';
import windows from '$lib/assets/platforms/WindowsDark.svg';
import androidStudio from '$lib/assets/tools/AndroidStudio.png';
import godot from '$lib/assets/tools/GodotDark.svg';
import unity from '$lib/assets/tools/UnityDark.svg';
import unrealEngine from '$lib/assets/tools/UnrealEngineDark.svg';
import githubIcon from '$lib/assets/socials/github.png';
import perforce from '$lib/assets/tools/Perforce.svg';
import jira from '$lib/assets/tools/Jira.png';
import slack from '$lib/assets/tools/Slack.svg';
import diversion from '$lib/assets/tools/Diversion.png';

import fishFracasThumbnail from '$lib/assets/thumbnails/FishFracas.png';
import facThumbnail from '$lib/assets/thumbnails/FACMockup.svg';
import vrrThumbnail from '$lib/assets/thumbnails/VRRocketry2.png';
import dartThumbnail from '$lib/assets/thumbnails/DART.png';
import infernalCycleThumbnail from '$lib/assets/thumbnails/InfernalCycle.png';

import vrrDemoVideo from '$lib/assets/videos/VRRDemoVideo.mp4';
import vrrDemoVideo2 from '$lib/assets/videos/VRRDemoVideo2.MOV';
import dartDemoVideo from '$lib/assets/videos/DARTDemoVideo.mp4';
import infernalCycleDemoVideo from '$lib/assets/videos/InfernalCycleDemo.mp4';
import infernalCycleCodeOverview from '$lib/assets/videos/InfernalCycleCodeOverview.mp4';

import { idText } from 'typescript';

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
        videos: [vrrDemoVideo, vrrDemoVideo2],
        videoCaptions: [
            'A demo video showcasing our first iteration of the CFD visualizer, using the Niagara Particle System.',
            'A demo video showcasing the new CFD visualization. I\'m the one playing the game in the beige hoodie.',
        ],
        gameEngine: { name: 'Unreal Engine 5', icon: unrealEngine },
        detailLines: [
            '**Role:** Programmer',
            '**Duration:** 24 Weeks\\nPhase 1 (13 Weeks) | Phase 2 (11 Weeks)',
            '**Team:** 7 Members\\n3 Programmers, 1 PM, 1 Artist, 1 Designer, 1 Associate Producer'
        ],
        supportingIcons: [unrealEngine, perforce, jira],
        content: {
            introductionTitle: 'Project Introduction',
            introduction: 'An educational rocketry simulation in VR, made possible through the APEC-APRU Academic Exchange Program grant with POSTECH, South Korea.',
            summaryTitle: 'Summary of Work',
            summaryPoints: `
                - **Delivered a sponsor-driven VR application**, collaborating with artists and designers to translate client requirements into a playable prototype.
                - **Engineered modular VR user components** using Unreal Engine 5 Blueprint, improving scalability and component reusability.
                - **Developed a Computational Fluid Dynamics visualizer** using the Niagara Particle System to simulate complex data.
                - **Upgraded the CFD visualization system** to display real generated airflow data from OpenFOAM, replacing the previous procedural implementation.
                - **Implemented interactive level mechanics**, programming 3D user interactions such as plane rotation and selection.            
            `
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
        videoCaption: 'A video showing the tutorial button I implemented, allowing users to go back to the tutorials',
        gameEngine: { name: 'Unity', icon: unity },
        detailLines: [
            'Role: Programmer',
            'Duration: 19 Weeks (Ongoing)',
            'Team: 5 Members\\n1 Programmer, 1 PM, 3 Play-Testers'
        ],
        supportingIcons: [unity, jira],
        content: { 
            introductionTitle: 'Project Introduction',
            introduction: 'A mobile title designed to teach the elderly about real-world scams',
            summaryTitle: 'Summary of Work',
            summaryPoints: `
                 - **Resolved bugs and engineered new features** for an existing Unity mobile game, translating playtester feedback into actionable improvements.
                 - **Managed the Agile development cycle using Jira**, working closely with a Project Manager to track issues, prioritize tasks, and manage weekly sprints.
                 - **Shipped a major version update to the iOS App Store**, managing the macOS build pipeline and ensuring compliance with App Store guidelines.
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
            'Team: 2 Members\\n(1 Developer, 1 Supervisor)'
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
        slug: 'infernal-cycle',
        name: 'Infernal Cycle',  
        platforms: [windows],
        image: infernalCycleThumbnail,
        imageVerticalAlign: 'middle',
        videos: [infernalCycleDemoVideo, infernalCycleCodeOverview],
        videoCaptions: [
            'A demo showcasing the game at the end of the semester. A lot of features were implemented, but I didn\'t have time to add more content.',
            'A code overview where I go through the codebase and explain some of the systems I implemented.'
        ],
        gameEngine: { name: 'Unity', icon: unity },
        detailLines: [
            '**Role:** Programmer & Designer',
            '**Duration:** 16 Weeks (A Semester)',
            '**Team:** 5 Members\\n1 Programmers, 2 Artists, 1 Audio Engineer, 1 PM'
        ],
        supportingIcons: [unity, githubIcon, jira],
        content: {
            introductionTitle: 'Project Introduction',
            introduction: 'A 2D platformer roguelite made for GSD 405: Intro to Game Development Processes, where I worked with a multi-disciplinary team to iterate on previous design documents and create a prototype.',
            summaryTitle: 'Summary of Work',
            summaryPoints: `
                 - **Programmed core gameplay mechanics** for a 3D action-adventure game in Unity, including combat systems, enemy AI, and player controls.
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
        image: '',
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
            introduction: '',
            summaryTitle: 'Summary of Work',
            summaryPoints: `
                - **Implemented a multiplayer system** in Unreal Engine 5 using the Advanced Steam Sessions plugin.
            `
        },
        actions: [
            
        ]
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
            introduction: 'A 2D platform fighter where you and your opponent are tied together, made for the 2025 Gamebuilders Game Jam with the theme of "tied".',
            summaryTitle: 'Summary of Work',
            summaryPoints: `
                - **Engineered a dynamic 2D rope system** in GDScript to serve as the core physical constraint between players.
                - **Iterated on rope and tension variables** to balance restrictive movement with slingshotty momentum.
                - **Debugged the knockback system**, ensuring functionality under the rope's constraints.
                - **Collaborated in a team of 8** to implement experimental constraints to make a functional gameplay loop.
            `
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