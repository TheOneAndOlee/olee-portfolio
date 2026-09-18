import type { BentoImage, InterestTile } from './data/interests';

const videoIdPattern = /^[\w-]{11}$/;

export function getYouTubeVideo(video: string | undefined) {
	if (!video) return undefined;
	const input = video.trim();
	if (videoIdPattern.test(input)) {
		return { id: input, url: `https://www.youtube.com/watch?v=${input}` };
	}

	try {
		const url = new URL(input);
		if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined;
		const host = url.hostname.replace(/^(www\.|m\.)/, '');
		const parts = url.pathname.split('/').filter(Boolean);
		let id: string | null | undefined;
		if (host === 'youtu.be' && parts.length === 1) {
			id = parts[0];
		} else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
			if (url.pathname === '/watch') id = url.searchParams.get('v');
			else if (['shorts', 'live', 'embed'].includes(parts[0]) && parts.length === 2) {
				id = parts[1];
			}
		}
		if (!id || !videoIdPattern.test(id)) return undefined;
		const destination = new URL('https://www.youtube.com/watch');
		destination.searchParams.set('v', id);
		const time = url.searchParams.get('t') ?? url.searchParams.get('start');
		if (time && (/^\d+$/.test(time) || /^(?:\d+h)?(?:\d+m)?(?:\d+s)?$/.test(time))) {
			destination.searchParams.set('t', time);
		}
		return { id, url: destination.href };
	} catch {
		return undefined;
	}
}

export function safeTileLink(value: string | undefined): string | undefined {
	const href = value?.trim();
	if (!href || [...href].some((character) => character.charCodeAt(0) <= 32 || character === '\\')) {
		return undefined;
	}
	if (/^\/(?!\/)/.test(href) || href.startsWith('#') || href.startsWith('?')) return href;
	try {
		const url = new URL(href);
		return ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) ? href : undefined;
	} catch {
		return undefined;
	}
}

export function getTileMedia(item: InterestTile) {
	const video = getYouTubeVideo(item.youtube?.video);
	const image: BentoImage | undefined =
		item.image ??
		(video
			? {
					src: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
					alt: '',
					aspectRatio: '16 / 9'
				}
			: undefined);
	const href = safeTileLink(item.link ?? video?.url);
	return {
		image,
		href,
		newTab: item.newTab ?? /^https?:\/\//i.test(href ?? ''),
		showPlayIcon: !!(video && href && item.youtube?.showPlayIcon !== false)
	};
}
