<script lang="ts">
  import Marketplace from '$lib/components/Marketplace.svelte';
  import type { Listing } from '$lib/types';

  // If you have server data, use a load function. For now pass empty listings.
  const listings: Listing[] = [];
</script>

<main>
  <Marketplace {listings} />
</main>
