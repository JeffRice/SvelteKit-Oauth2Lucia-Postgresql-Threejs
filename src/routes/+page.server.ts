import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from "./$types";
import { createPool } from '@vercel/postgres';

const db = createPool();

export const load: PageServerLoad = async ({ locals }) => {
	const { rows: users } = await db.query('SELECT * FROM users');
	const { rows: aUser } = await db.query("SELECT * FROM users WHERE name='Steven Tey'");
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, "/login");
	console.log('from routes/page.server.ts ', user.userId)
	const { rows: auth_user } = await db.query(`SELECT * FROM auth_user WHERE id='${user.userId}'`);
	return {
		user,
		auth_user: auth_user,
		users: users,
		aUser: aUser,
	};
};

export const actions: Actions = {
	// signout
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	}
};
