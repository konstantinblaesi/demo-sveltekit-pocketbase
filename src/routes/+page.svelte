<script lang="ts">
	import { enhance } from '$app/forms'

	export let data
</script>

{#if data.user}
	session
	<pre>{JSON.stringify(data.user, null, 2)}</pre>

	<form method="post" action="?/logout" use:enhance>
		<button>Logout</button>
	</form>
{:else}
	<a href="/login">Go to Login</a>
{/if}
