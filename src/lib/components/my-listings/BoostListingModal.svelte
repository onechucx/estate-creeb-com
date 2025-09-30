<script lang="ts">
  import Card from '$lib/components/common/Card.svelte';
  export let listing: any;
  export let onClose: ()=>void = ()=>{};
</script>

<Card>
  <div class="p-4">
    <h3 class="font-bold">Boost Listing (placeholder)</h3>
    <p class="text-sm text-brand-text-secondary">Boost options for {listing?.title}</p>
    <div class="mt-4">
      <button type="button" on:click={onClose} aria-label="Close modal" class="px-3 py-2 bg-brand-primary text-white rounded">Close</button>
    </div>
  </div>
</Card>
