import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects.js';
import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => {
	const project = projects.find((item) => item.slug === params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	return { project };
};
