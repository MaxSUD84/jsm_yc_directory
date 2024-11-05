import { defineField, defineType } from 'sanity';

export const startup = defineType({
	name: 'startup',
	title: 'Startup',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Title', type: 'string' }),
		defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
		defineField({ name: 'author', type: 'reference', to: { type: 'author' } }),
		defineField({ name: 'views', title: 'Views', type: 'number' }),
		defineField({ name: 'description', title: 'Description', type: 'text' }),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			validation: (Rule) =>
				Rule.min(3)
					.max(20)
					.required()
					.error('Category should be at least 3 characters'),
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'url',
			validation: (Rule) => Rule.required(),
		}),
		defineField({ name: 'pitch', title: 'Pitch', type: 'markdown' }),
	],
});
