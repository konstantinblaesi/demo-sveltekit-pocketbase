import { cookieNames } from '$lib/server/auth.js'
import { error, redirect } from '@sveltejs/kit'

export async function GET({
	locals,
	url: { searchParams, origin },
	cookies,
	params: { provider: providerName }
}) {
	const callbackUrlForProvider = `${origin}/auth/${providerName}/callback`
	const expectedState = cookies.get(cookieNames.state(providerName))
	const expectedPkceVerifier = cookies.get(cookieNames.pkce.verifier(providerName))

	const state = searchParams.get('state')
	const code = searchParams.get('code')

	const provider = (await locals.pb?.collection('users').listAuthMethods())?.authProviders.find(
		(p) => p.name === providerName
	)
	if (!provider) {
		error(500, { message: 'No such provider' })
	}

	if (expectedState !== state || !expectedPkceVerifier) {
		error(500, { message: 'Invalid callback request' })
	}

	try {
		await locals.pb
			?.collection('users')
			.authWithOAuth2Code(provider.name, code || '', expectedPkceVerifier, callbackUrlForProvider)
	} catch (err) {
		console.error('Pocketbase rejected oauth2/oidc code', err)
		error(500, { message: 'Login failed' })
	}

	redirect(303, '/')
}
