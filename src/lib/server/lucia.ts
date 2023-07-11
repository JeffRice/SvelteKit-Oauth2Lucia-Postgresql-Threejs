// lib/server/lucia.ts
import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import { dev } from "$app/environment";
import { github } from "@lucia-auth/oauth/providers";
import { pg } from "@lucia-auth/adapter-postgresql";
import postgres from "pg";


const pool = new postgres.Pool({
	connectionString: ' INSERT YOUR POSTGRES URL HERE  verceldb?sslmode=require'
});					   	


export const auth = lucia({
    adapter: pg(pool),
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
    transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			game_stats: userData.game_stats
		};
	}
});

let config = {
    clientId: ' Github ClientID here',
    clientSecret: 'Github Client Secret here'
}

export const githubAuth = github(auth, config);


export type Auth = typeof auth;