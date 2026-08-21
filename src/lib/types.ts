export type ImageVerticalAlign = 'top' | 'middle' | 'bottom';

export interface GameEngine {
	name: string;
	icon?: string;
}

export interface ProjectAction {
	label: string;
	href?: string;
}

export interface ProjectContent {
	introductionTitle?: string;
	introduction?: string;
	summaryTitle?: string;
	summaryPoints?: string | string[];
}

export interface ProjectData {
	id: number;
	slug: string;
	name: string;
	platforms: string[];
	image: string;
	imageVerticalAlign?: ImageVerticalAlign;
	video?: string;
	videos?: string[];
	videoCaption?: string;
	videoCaptions?: string[];
	gameEngine?: GameEngine;
	detailLines?: string[];
	supportingIcons?: string[];
	content?: ProjectContent;
	actions?: ProjectAction[];
}

export interface Project {
	id: number;
	slug: string;
	name: string;
	platforms: string[];
	image: string;
	imageVerticalAlign?: ImageVerticalAlign;
	video?: string;
	videos?: string[];
	videoCaption?: string;
	videoCaptions?: string[];
	gameEngine?: GameEngine;
	detailLines?: string[];
	supportingIcons?: string[];
	darkModeInvertedIcons: string[];
	link: string;
	content?: {
		introductionTitle: string;
		introduction: string;
		summaryTitle: string;
		summaryPoints: string[];
	};
	actions?: ProjectAction[];
}

export interface ResumeLogo {
	variant?: string;
	imageSrc?: string;
	imageAlt?: string;
	text?: string[];
	textColorClass?: string;
}

export interface ResumeActivity {
	id: string;
	organization: string;
	role: string;
	location?: string;
	date?: string;
	points: string[];
	logo?: ResumeLogo;
}

export interface ResumeSection {
	id: string;
	title: string;
	activities: ResumeActivity[];
}

export interface SkillGroup {
	label: string;
	items: string[];
}

export interface ContactItem {
	name: string;
	icon: string;
	link: string;
}
