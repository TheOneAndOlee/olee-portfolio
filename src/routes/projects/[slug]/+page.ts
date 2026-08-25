import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = projects.find((item) => item.slug === params.slug);

	if (!project) {
		error(404, 'Project not found');
	}

	return { project };
};
