'use server';

import slugify from 'slugify';

import { parseServerActionResponse } from './utils';
import { auth } from '@/auth';
import { writeClient } from '@/sanity/lib/write-client';

export const createPitch = async (
	state: any,
	form: FormData,
	pitch: string,
) => {
	const session = await auth();

	if (!session)
		return parseServerActionResponse({
			status: 'ERROR',
			error: 'Not authorized',
		});

	console.log(session);

	const { title, description, category, link } = Object.fromEntries(
		Array.from(form).filter(([key]) => key !== 'pitch'),
	);

	const slug = slugify(title as string, {
		lower: true,
		remove: /[*+~.()'"!:@]/g,
		strict: true,
	});

	try {
		const startup = {
			title,
			description,
			category,
			image: link,
			slug: {
				_type: slug,
				current: slug,
			},
			author: {
				_type: 'reference',
				_ref: session?.id,
			},
			pitch,
		};

		const result = await writeClient.create({ _type: 'startup', ...startup });

		return parseServerActionResponse({
			...result,
			error: '',
			status: 'SUCCESS',
		});
	} catch (error) {
		console.log(error);

		return parseServerActionResponse({
			error: JSON.stringify(error),
			status: 'ERROR',
		});
	}

	if (!title)
		return parseServerActionResponse({
			status: 'ERROR',
			error: 'Title is required',
		});
};
