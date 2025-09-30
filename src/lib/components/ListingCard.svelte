<script lang="ts">
    import { StarIcon } from 'heroicons-svelte/24/solid';
    import Card from './common/Card.svelte';
    import type { Listing } from '$lib/types';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let listing: Listing;
    export let onViewVendor: ((vendorName: string) => void) | undefined = undefined;

    function handleViewVendor(e: MouseEvent) {
        e.stopPropagation();
        if (onViewVendor) {
            onViewVendor(listing.vendorName);
        }
    }
</script>

<Card class="group relative">
    {#if listing.isPaid}
            <div aria-hidden="false" class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                <StarIcon aria-hidden="true" class="h-4 w-4 mr-1" />
                <span class="sr-only">Paid listing</span>
                <span aria-hidden="true">Paid</span>
            </div>
    {/if}
    <img src={listing.images[0]} alt={listing.title} class="w-full h-48 object-cover rounded-lg mb-4" />
    <p class="text-sm text-gray-500 dark:text-dark-text-secondary">{listing.category}</p>
    <h3 class="text-lg font-bold truncate text-brand-text-primary dark:text-dark-text-primary group-hover:text-brand-primary dark:group-hover:text-dark-primary">{listing.title}</h3>
    <p class="font-semibold text-brand-primary dark:text-dark-primary text-xl">₦{listing.price.toLocaleString()}</p>
    <p class="text-sm text-gray-500 dark:text-dark-text-secondary truncate">{listing.location}</p>
    {#if onViewVendor}
        <p class="text-xs text-gray-400 mt-1">by <button type="button" on:click={handleViewVendor} class="hover:underline font-semibold" aria-label={`View vendor ${listing.vendorName}`}>{listing.vendorName}</button></p>
    {/if}
    <div class="mt-4">
        <button type="button" class="px-3 py-2 bg-brand-primary text-white rounded" on:click={() => dispatch('open', listing)} aria-label={`View details for ${listing.title}`}>View Details</button>
    </div>
</Card>
 
