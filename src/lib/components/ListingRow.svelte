<script lang="ts">
    import Card from './common/Card.svelte';
    import Button from './common/Button.svelte';
    import type { Listing } from '$lib/types';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let listing: Listing;
    export let onViewVendor: ((vendorName: string) => void) | undefined = undefined;

    function handleViewVendor(e: Event) {
        e.stopPropagation?.();
        if (onViewVendor) {
            onViewVendor(listing.vendorName);
        }
    }
</script>

<Card class="flex items-center space-x-4 mb-2">
    <img
        src={listing.images[0]}
        alt={listing.title}
        class="w-24 h-24 object-cover rounded-lg flex-shrink-0"
    />
    <div class="flex-1">
        <div class="flex items-center space-x-2">
            <p class="text-sm text-gray-500 dark:text-dark-text-secondary">{listing.category}</p>
            {#if listing.isPaid}
                <span
                    class="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 font-bold px-2 py-0.5 rounded-full"
                    >Paid</span
                >
            {/if}
        </div>
        <h3 class="text-lg font-bold text-brand-text-primary dark:text-dark-text-primary">
            {listing.title}
        </h3>
        <p class="text-sm text-gray-500 dark:text-dark-text-secondary">{listing.location}</p>
            {#if onViewVendor}
            <p class="text-sm text-gray-500 dark:text-dark-text-secondary">
                by
                    <button type="button" on:click={handleViewVendor} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleViewVendor(e) } }} class="hover:underline font-semibold" aria-label={`View vendor ${listing.vendorName}`}>
                    {listing.vendorName}
                </button>
            </p>
        {:else}
            <p class="text-sm text-gray-500 dark:text-dark-text-secondary">by {listing.vendorName}</p>
        {/if}
    </div>
    <div class="text-right">
        <p class="font-semibold text-brand-primary dark:text-dark-primary text-xl">
            ₦{listing.price.toLocaleString()}
        </p>
    <Button type="button" variant="secondary" class="mt-2 text-sm !py-1 !px-3" on:click={() => dispatch('open', listing)} aria-label={`View details for ${listing.title}`}>View Details</Button>
    </div>
</Card>
