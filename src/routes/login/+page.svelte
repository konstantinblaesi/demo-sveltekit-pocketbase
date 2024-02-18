<script lang="ts">
	import { enhance } from '$app/forms'

	export let data
</script>

Choose a provider<br />
<form method="post" action="?/login" use:enhance>
	{#each data.authProviders ?? [] as provider}
		<div>
			<button name="provider" value={provider.name}>Login with {provider.name}</button>
		</div>
	{/each}
</form>
