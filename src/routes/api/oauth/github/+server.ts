import { auth, githubAuth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies.get('github_oauth_state');
	console.log(code)
	console.log(state)
	console.log(storedState)
	if (!storedState || storedState !== state || !code || !state) {
		return new Response(null, { status: 401 });
	}
	else {
		const { existingUser, providerUser, createUser } =
		await githubAuth.validateCallback(code);
		if (existingUser) console.log(existingUser)
		if (providerUser) console.log(providerUser)

	const getUser = async () => {
		if (existingUser) return existingUser;
		// create a new user if the user does not exist
		return await createUser({
			// attributes
			username: providerUser.login
		});
	};

	const user = await getUser();
	const session = await auth.createSession(user.userId);
		locals.auth.setSession(session);

		const myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");

		let bodyData = new FormData()
		bodyData.append('client_id',' YOUR GITHUB CLIENTID ' )
		bodyData.append('client_secret', ' YOUR GITHUB SECRET ')
		bodyData.append('code', code)

		const request = new Request("https://github.com/login/oauth/access_token" , {
			method: "POST",
			headers: myHeaders,
			mode: "cors",
			body: bodyData
		  });

		// fetch token
		fetch(request)
  		.then((response) => {

  				  if (response.status === 200) {
					// use access token to make call to github on users behalf
					async function asyncCall() {
						const result = await response.json();
						return result
					  }

					  asyncCall().then((response) => {
						let userToken = response.access_token
						const bearerHeaders = new Headers();
						bearerHeaders.append("Authorization", "Bearer " + userToken + "");
						const userRequest = new Request("https://api.github.com/user" , {
							method: "GET",
							headers: bearerHeaders
						  });

						// fetch user
						fetch(userRequest)
					  });

  				  } else {
  				    throw new Error("Something went wrong on API server!");
  				  }
  				})

	} 
	throw redirect(302, '/');
};