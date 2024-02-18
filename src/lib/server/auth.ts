import { env } from '$env/dynamic/private'

/**
 * Return the external cookie name
 * @param cookie cookie name internal
 * @param provider optionally scoped to provider
 * @returns cookie name external
 */
function prefix(cookie: string, provider?: string) {
	if (!provider) return cookie

	return `${cookie}_provider_${provider}`
}

export const cookieNames = {
	state(provider: string) {
		return prefix(env.AUTH_COOKIE_STATE, provider)
	},
	pkce: {
		verifier(provider: string) {
			return prefix(env.AUTH_PKCE_VERIFIER, provider)
		}
	}
}
