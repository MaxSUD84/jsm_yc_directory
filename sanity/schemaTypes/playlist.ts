import { defineField, defineType } from 'sanity';

export const playlist = defineType({
	name: 'playlist',
	title: 'Playlists',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Title', type: 'string' }),
		defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
		defineField({
			name: 'select',
			title: 'Select',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'startup' }],
				},
			],
		}),
	],
});
playlist;
