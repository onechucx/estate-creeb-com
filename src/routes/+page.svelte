<script lang="ts">
	import PublicHomePage from '$lib/components/PublicHomePage.svelte';
	import { initialListings } from '$lib/stores';

	let listings = initialListings;

	function onLoginSuccess() {
		// placeholder — page-level login success handling can be implemented here
		console.log('login successful');
	}
</script>

<PublicHomePage {listings} on:loginSuccess={onLoginSuccess} />
