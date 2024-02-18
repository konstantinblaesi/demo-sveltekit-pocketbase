<script lang="ts">
	import { page } from '$app/stores'
</script>

Sorry, something went wrong
<br />
<h6>Status {$page.status}, Message {$page.error?.message ?? 'Unknown'}</h6>
