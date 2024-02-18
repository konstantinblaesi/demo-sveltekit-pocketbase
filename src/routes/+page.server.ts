export async function load({ locals: { pb } }) {
	return {
		user: pb?.authStore.model
	}
}

export const actions = {
	async logout({ locals: { pb } }) {
		// this only clears the pocketbase session
		// does not do a provider logout
		await pb?.authStore.clear()
	}
}
