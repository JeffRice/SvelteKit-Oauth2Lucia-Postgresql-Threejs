<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: { message?: string };
</script>

<h2>Sign in</h2>
<a href="/api/oauth?provider=github" class="button">Continue with Github</a>
<p class="center">or</p>

{#if form?.message}
	<p class="error">{form.message || ''}</p>
{/if}
<a href="/signup" class="link">Create a new account</a>