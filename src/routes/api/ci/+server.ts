import { auth } from '$lib/server/lucia';
import { createPool } from '@vercel/postgres';
const db = createPool();

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request }) {

  // get the data parameters from the request
  const data = await request.json();
  console.log('formdata js log of request : ', data);
  data.highScore+=128
  let dataJson = JSON.stringify(data)

  // get the user id from auth
  const { user } = await locals.auth.validateUser();
  let userCookie = locals.auth.context.request.headers.cookie
  userCookie =  userCookie.split(';').filter(x => x.includes('auth_session'))
  let auth_sessionId = userCookie[0].split('=')
  let testvalidateSessionUser = await auth.validateSessionUser(auth_sessionId[1]); 
  console.log('validated response user: ', testvalidateSessionUser.user.userId)
  let userId = testvalidateSessionUser.user.userId

  await db.query(`UPDATE auth_user
  SET game_stats = '${dataJson}'
  WHERE id = '${userId}';`);

  return new Response(user, {
      status: 200,
  });
}