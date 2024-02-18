import { cookieNames } from '$lib/server/auth.js'
import { error, redirect } from '@sveltejs/kit'

function noSuchProvider(): never {
	error(500, { message: 'No such provider' })
}

export async function load({ locals }) {
	const authMethods = await locals.pb?.collection('users').listAuthMethods()
	if (!authMethods) {
		error(500, { message: 'No auth methods' })
	}

	return {
		authProviders: authMethods.authProviders.map((p) => ({
			name: p.name
		}))
	}
}

export const actions = {
	async login({ cookies, locals, request }) {
		const formData = await request.formData()
		const providerName = formData.get('provider')
		if (typeof providerName !== 'string') noSuchProvider()

		const provider = (await locals.pb?.collection('users').listAuthMethods())?.authProviders.find(
			(p) => p.name === providerName
		)
		if (!provider) noSuchProvider()

		const opts = {
			path: `/auth/${provider.name}/callback`,
			secure: true,
			httpOnly: true,
			sameSite: 'lax'
		} as const

		cookies.set(cookieNames.state(providerName), provider.state, opts)
		cookies.set(cookieNames.pkce.verifier(providerName), provider.codeVerifier, opts)

		redirect(302, provider.authUrl)
	}
}
