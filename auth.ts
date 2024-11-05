import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

import { client } from './sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from './sanity/lib/queries';
import { writeClient } from './sanity/lib/write-client';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user: { name, email, image }, profile }) {
			const { id, login, bio, node_id } = profile;
			// console.dir({ id, login, bio, node_id });

			const existingUser = await client
				.withConfig({ useCdn: false })
				.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

			if (!existingUser) {
				await writeClient.create({
					_type: 'author',
					id,
					name,
					username: login,
					email,
					image,
					bio: bio || '',
				});
			}

			return true;
		},

		async jwt({ token, account, profile }) {
			if (account && profile) {
				const user = await client
					.withConfig({ useCdn: false })
					.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

				token.id = user?._id;
			}
			// console.log('jwt: ', token);
			return token;
		},

		async session({ session, token }) {
			// console.log('session: ', session);
			// console.log('token: ', token);

			Object.assign(session, { id: token.id });
			return session;
		},
	},
});
