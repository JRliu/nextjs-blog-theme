import NextAuth from "next-auth"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import jwt from "jsonwebtoken"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
	// https://next-auth.js.org/configuration/providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_URL,
		secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
	}),
	useSecureCookies: false,
	callbacks: {
		async session({ session, user, token }) {
			const signingSecret = process.env.SUPABASE_JWT_SECRET
			if (signingSecret) {
				const payload = {
					aud: "authenticated",
					exp: Math.floor(new Date(session.expires).getTime() / 1000),
					sub: user.id,
					email: user.email,
					role: "authenticated",
				}
				session.supabaseAccessToken = jwt.sign(payload, signingSecret)
			}
			session.token = token
			return session
		},
	},
	// ...
})