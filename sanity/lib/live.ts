import { defineLive } from 'next-sanity';
import 'server-only';

import { client } from '@/sanity/lib/client';

export const { sanityFetch, SanityLive } = defineLive({
	client,
});
