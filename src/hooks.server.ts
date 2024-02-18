import { env } from '$env/dynamic/private'
import PocketBase from 'pocketbase'

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(env.POCKETBASE_URL)
	const {
		locals: { pb }
	} = event

	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

	try {
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh()
		}
	} catch (err) {
		pb.authStore.clear()
	}

	const response = await resolve(event)
	response.headers.append(
		'set-cookie',
		pb.authStore.exportToCookie({ secure: true, sameSite: 'Lax' })
	)
	return response
}
