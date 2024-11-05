import { createClient } from 'next-sanity';
import 'server-only';

import { apiVersion, dataset, projectId, token } from '../env';

export const writeClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	token,
});

if (!writeClient.config().token) {
	throw new Error('Write client token is not empty');
}
