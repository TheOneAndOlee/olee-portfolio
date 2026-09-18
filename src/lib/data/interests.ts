export type BentoSize = { width: number; height: number };
/** One-based coordinates within the immediate parent grid. */
export type BentoPosition = { column: number; row: number };
export type BentoCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type BentoImage = {
	/** Files in static/ use a root-relative URL, e.g. '/interests/player.webp'. */
	src: string;
	/** Describe the picture; use '' only when it is decorative. */
	alt: string;
	fit?: 'cover' | 'contain';
	/** CSS object-position, e.g. 'center', 'top', or '70% 25%'. */
	position?: string;
	/** Preferred frame ratio. Content can grow it; default: '1 / 1'. */
	aspectRatio?: string;
	/** Optional CSS color or gradient drawn over the picture, below the text. */
	overlay?: string;
};

export type BentoText = {
	corner?: BentoCorner;
	/** Outside captions reserve space above/below the bordered frame. */
	placement?: 'inside' | 'outside';
	color?: string;
	background?: string;
	padding?: string;
	/** Space between an outside caption and its frame. */
	gap?: string;
	maxWidth?: string;
};

export type BentoYouTube = {
	/** Video ID or a YouTube watch, share, Shorts, live, or embed URL. */
	video: string;
	showPlayIcon?: boolean;
};

export type BentoLayout = {
	/** Grid width in columns × minimum height in rows. Extra rows grow automatically. */
	size: BentoSize;
	/** 'square' = square minimum, 'equal' = equal rows, 'auto' = content, or a CSS length. */
	rowHeight: string;
};

export type BentoAppearance = {
	background: string;
	textColor: string;
	accentColor: string;
	borderColor: string;
	/** CSS border-width: '3px', '0', or per-side values such as '3px 0'. */
	borderWidth: string;
	radius: string;
	padding: string;
};

export type BentoSettings = BentoAppearance & {
	desktop: BentoLayout;
	tablet: BentoLayout;
	mobile: BentoLayout;
	gap: string;
};

export type InterestTile = Partial<BentoAppearance> & {
	id: string;
	title: string;

	description?: string;
	tags?: string[];

	/** Optional picture on any tile, including entries inside children. */
	image?: BentoImage;
	/** Optional destination; overrides the automatic YouTube video link. */
	link?: string;
	/** External HTTP links default to a new tab; local/email links stay in this tab. */
	newTab?: boolean;
	/** Optional accessible link name; defaults to the tile title. */
	linkLabel?: string;
	youtube?: BentoYouTube;
	/** Positions the whole text block (title, description, and tags). */
	text?: BentoText;
	/** A × B: A columns wide, B rows tall. Use any positive whole numbers. */
	size: BentoSize;
	/** Optional spans below 44rem of available grid width; defaults to one row. */
	tabletSize?: BentoSize;
	/** Optional spans below 28rem of available grid width; defaults to one row. */
	mobileSize?: BentoSize;
	/** Desktop placement. Smaller layouts flow automatically unless positioned separately. */
	position?: BentoPosition;
	tabletPosition?: BentoPosition;
	mobilePosition?: BentoPosition;
	align?: 'top' | 'center' | 'bottom';
	/** A tile can contain its own grid, and children can contain further grids. */
	children?: InterestTile[];
	/** Overrides for this tile's child grid; appearance inherits from this tile. */
	grid?: Partial<BentoSettings>;
};

// Customize the entire grid here. Spacing accepts CSS units (px, rem, clamp(), etc.).
export const interestGrid: BentoSettings = {
	desktop: { size: { width: 5, height: 3 }, rowHeight: 'square' },
	tablet: { size: { width: 2, height: 0 }, rowHeight: '11rem' },
	mobile: { size: { width: 1, height: 0 }, rowHeight: 'auto' },
	gap: '1rem',
	radius: '0rem',
	padding: 'clamp(1.25rem, 3cqw, 2rem)',
	background: 'var(--color-bg)',
	textColor: 'var(--color-text)',
	accentColor: 'var(--color-text)',
	borderColor: 'var(--color-accent)',
	borderWidth: '3px'
};

// Array order is reading order. Add, remove, or reorder tiles here.
// Colors accept hex, rgb(), hsl(), or existing theme variables.
export const interests: InterestTile[] = [
	{
		id: 'games',
		title: 'Games I Play',
		description: 'I play a LOT of games, but here are some of my favorites.',

		size: { width: 3, height: 2 },
		position: { column: 3, row: 1 },
		tabletSize: { width: 2, height: 2 },
		background: 'var(--color-control-bg)',
		grid: {
			// Keep this small collage in two columns even on phones.
			mobile: { size: { width: 2, height: 2 }, rowHeight: 'equal' },
			gap: '0.5rem',
			padding: '0.75rem',
			borderWidth: '1px',
			background: 'var(--color-bg)'
		},
		children: [
			{ 
				id: 'botw', 
				title: 'THE GREATEST GAME OF ALL TIME', 
				size: { width: 1, height: 1 },
				image: {
					src: '/bento-pics/botw.jpg',
					alt: 'Link from Breath of the Wild standing on a cliff overlooking a valley',
					fit: 'cover',
					position: 'right',
					aspectRatio: '16 / 9'
				},
				text: { corner: 'top-left', placement: 'outside' }
			},
			{
				id: 'valorant',
				title: 'Really fun with friends',
				// description: 'Valorant',
				size: { width: 1, height: 1 },
				// Top-right cell in this tile's own 2 × 2 grid.
				position: { column: 2, row: 1 },
				tabletPosition: { column: 2, row: 1 },
				mobilePosition: { column: 2, row: 1 },
				image: {
					src: '/bento-pics/valorant.jpg',
					alt: 'Valorant character Jett in a blue and white outfit, holding a knife',
					fit: 'cover',
					position: 'right',
					aspectRatio: '16 / 9'
				},
				text: { corner: 'top-right', placement: 'outside'
				}
			},
			{ 
				id: 'minecraft', 
				title: 'I mostly play modded', 
				size: { width: 1, height: 1 },
				image: {
					src: '/bento-pics/minecraft.jpg',
					alt: 'Minecraft character Steve holding a diamond sword, with a creeper behind him',
					fit: 'cover',
					position: 'center',
					aspectRatio: '16 / 9'
				},
				text: { corner: 'bottom-left', placement: 'outside'
				}
			},
			{ 
				id: 'no-mans-sky', 
				title: 'Amazing game, also came out on my birthday!', 
				size: { width: 1, height: 1 },
				image: {
					src: '/bento-pics/no_mans_sky.jpg',
					alt: 'No Man\'s Sky character in a red spacesuit, standing on a planet with a spaceship and a large alien creature',
					fit: 'cover',
					position: 'center',
					aspectRatio: '16 / 9'
				},
				text: { corner: 'bottom-left', placement: 'outside'
				}
			}
		]
	},
	{
		id: 'pc-and-server',

		title: 'PCs and Servers!',
		description: "I built me and my sister's PCs, and I have a mini-pc minecraft server!",

		size: { width: 2, height: 2 },
		position: { column: 1, row: 1 },
		tabletSize: { width: 1, height: 1 },
		grid: {
			desktop: { size: { width: 2, height: 1 }, rowHeight: 'auto' },
			tablet: { size: { width: 2, height: 1 }, rowHeight: 'auto' },
			mobile: { size: { width: 2, height: 1 }, rowHeight: 'auto' },
			gap: '0.5rem',
			padding: '0.5rem',
			borderWidth: '1px'
		},
		children: [
			{
				id: 'pc-build',
				title: 'My Desktop (Specs: Ryzen 5 5600X, RTX 3070, 32GB DDR4, 3 TB SSD)',
				size: { width: 1, height: 1 },
				// Copy this image block into any child tile to give it a picture.
				image: {
					src: '/bento-pics/pc_setup.jpg',
					alt: 'Desktop PC with its graphics card, processor cooler, and case fans visible',
					fit: 'cover',
					position: 'center',
					aspectRatio: '1 / 1'
				},
				text: { corner: 'bottom-left', placement: 'outside' }
			},
			{
				id: 'linux-server',
				title: 'Me setting up my minecraft linux server',
				size: { width: 1, height: 1 },
				image: {
					src: '/bento-pics/linux_img.jpg',
					alt: 'Linux terminal displaying service restart messages',
					fit: 'cover',
					position: 'center',
					aspectRatio: '1 / 1'
				},
				text: { corner: 'top-left', placement: 'outside' }
			}
		]
	},
	{
		id: 'youtube',

		title: 'Some Really Good YouTube Channels/Videos',
		// description: 'E-sports and game design, from some really cool people.',
		// tags: ['Coach Ocie', 'Shounic', 'Marblr', 'Sliggy', 'Arch'],

		size: { width: 4, height: 1 },
		position: { column: 1, row: 3 },
		tabletSize: { width: 1, height: 1 },
		grid: {
			desktop: { size: { width: 3, height: 2 }, rowHeight: 'equal' }
		},
		children: [
			{
				id: 'unique-game-analysis',
				title: 'A Really Cool Framework to Analyze Games',
				size: { width: 1, height: 1 },
				youtube: {
					video: 'https://www.youtube.com/watch?v=NgHvdCcmQ4o',
					showPlayIcon: true
				},
				text: { corner: 'bottom-left', placement: 'outside' }
			},
			{
				id: 'marblr-fall-damage',
				title: "Marblr's Fall Damage Experiment in Overwatch",
				size: { width: 1, height: 1 },
				youtube: {
					video: 'https://www.youtube.com/watch?v=PJ4PmQKr5u0',
					showPlayIcon: true
				},
				text: { corner: 'bottom-left', placement: 'outside' }
			},
			{
				id: 'ocie-ntmr-breakdown',
				title: 'Good Coverage of an Upset Match in OW',
				size: { width: 1, height: 1 },
				youtube: {
					video: 'https://www.youtube.com/watch?v=3kyHQtTsV_0',
					showPlayIcon: true
				},
				text: { corner: 'bottom-left', placement: 'outside' }
			},
			{
				id: 'airen-drx-comeback',
				title: 'Breakdown of an Insane Comeback in Valorant',
				size: { width: 1, height: 1 },
				youtube: {
					video: 'https://www.youtube.com/watch?v=WE5PEOSaQYc',
					showPlayIcon: true
				},
				text: { corner: 'bottom-left', placement: 'outside' }
			},
			{
				id: 'phy-mongolz-game',
				title: 'A Funny CS2 Game',
				size: { width: 1, height: 1 },
				youtube: {
					video: 'https://www.youtube.com/watch?v=qL-Gyz453Gs',
					showPlayIcon: true
				},
				text: { corner: 'bottom-left', placement: 'outside' }
			},
			{
				id: 'sound-in-fnaf',
				title: 'An Analysis of Sound Design in FNAF',
				size: { width: 1, height: 1 },
				youtube: {
					video: 'https://www.youtube.com/watch?v=1yTIhtfgDwY',
					showPlayIcon: true
				},
				text: { corner: 'bottom-left', placement: 'outside' }
			}
		]
	},
	{
		id: 'cooking',

		title: 'Cooking!',

		size: { width: 1, height: 1 },
		position: { column: 5, row: 3 },
		tabletSize: { width: 2, height: 1 },
		children: [
			{
				id: 'fried-rice',
				title: 'Fried Rice!',
				size: { width: 1, height: 1 },
				image: {
					src: '/bento-pics/fried_rice.jpg',
					alt: 'Fried rice with vegetables and egg',
					fit: 'cover',
					position: 'center',
					aspectRatio: '1 / 1'
				},
				text: { corner: 'bottom-left', placement: 'outside' }
			},
			{
				id: 'congee',
				title: 'Congee my beloved',
				size: { width: 1, height: 1 },
				image: {
					src: '/bento-pics/congee.jpg',
					alt: 'Congee with chicken and lettuce',
					fit: 'cover',
					position: 'center',
					aspectRatio: '1 / 1'
				},
				text: { corner: 'bottom-left', placement: 'outside' }
			}
		]
	}
];
