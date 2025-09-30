<script lang="ts">
    import {
        MagnifyingGlassIcon,
        FunnelIcon,
        Squares2X2Icon,
        Bars3Icon,
        ChevronLeftIcon,
        ChevronRightIcon,
        InformationCircleIcon,
        WrenchScrewdriverIcon
    } from 'heroicons-svelte/24/outline';
    import Card from './common/Card.svelte';
    import Button from './common/Button.svelte';
    import ListingCard from './ListingCard.svelte';
    import ListingRow from './ListingRow.svelte';
    import ListingDetailModal from './ListingDetailModal.svelte';
    import type { Listing, ListingCategory, ToastMessage, AppView } from '$lib/types';
    import { createEventDispatcher } from 'svelte';

    export let showToast: (message: string, type?: ToastMessage['type']) => void;
    export let isAuthenticated: boolean = true;
    export let isCommunitySubscribed: boolean = false;
    export let listings: Listing[];
    export let onStartMessage: ((userId: string, userName: string) => void) | undefined = undefined;
    export let onLoginRequest: (() => void) | undefined = undefined;

    const dispatch = createEventDispatcher();

    let searchTerm = '';
    let sortBy = 'date-desc';
    let viewMode: 'grid' | 'list' = 'grid';
    let currentPage = 1;
    let itemsPerPage = 6;
    let activeCategory: ListingCategory | 'All' = 'All';
    let priceRange = { min: '', max: '' };
    let selectedListing: Listing | null = null;

    const categories: (ListingCategory | 'All')[] = ['All', 'Properties', 'Assets', 'Services'];

    $: processedListings = (() => {
        let filteredListings = listings.filter((l) => l.status === 'Active');

        if (activeCategory !== 'All') {
            filteredListings = filteredListings.filter((l) => l.category === activeCategory);
        }

        if (searchTerm.trim() !== '') {
            const lowercasedSearch = searchTerm.toLowerCase();
            filteredListings = filteredListings.filter(
                (l) =>
                    l.title.toLowerCase().includes(lowercasedSearch) ||
                    l.description.toLowerCase().includes(lowercasedSearch) ||
                    l.location.toLowerCase().includes(lowercasedSearch)
            );
        }

        const minPrice = parseFloat(priceRange.min);
        const maxPrice = parseFloat(priceRange.max);
        if (!isNaN(minPrice)) {
            filteredListings = filteredListings.filter((l) => l.price >= minPrice);
        }
        if (!isNaN(maxPrice)) {
            filteredListings = filteredListings.filter((l) => l.price <= maxPrice);
        }

        const sortedListings = [...filteredListings].sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'date-asc':
                    return new Date(a.dateListed).getTime() - new Date(b.dateListed).getTime();
                case 'date-desc':
                    return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
                case 'location-asc':
                    return a.location.localeCompare(b.location);
                case 'location-desc':
                    return b.location.localeCompare(a.location);
                case 'category-asc':
                    return a.category.localeCompare(b.category);
                case 'category-desc':
                    return b.category.localeCompare(a.category);
                default:
                    return 0;
            }
        });

        const paid = sortedListings.filter((l) => l.isPaid);
        const unpaid = sortedListings.filter((l) => !l.isPaid);

        return [...paid, ...unpaid];
    })();

    $: totalPages = Math.ceil(processedListings.length / itemsPerPage);
    $: currentListings = processedListings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    $: {
        currentPage = 1;
        // We need to reference the dependencies of the reactive block
        // to make svelte re-run it when they change.
        activeCategory, searchTerm, sortBy, itemsPerPage, priceRange;
    }

    function onViewVendor(vendorName: string) {
        dispatch('viewvendor', vendorName);
    }

    function setActiveView(view: AppView) {
        dispatch('setactiveview', view);
    }
</script>

{#if selectedListing}
    <ListingDetailModal
        listing={selectedListing}
        on:close={() => (selectedListing = null)}
        {isAuthenticated}
        {onStartMessage}
        {onLoginRequest}
    />
{/if}

<div class="space-y-6">
    <Card>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="relative lg:col-span-2">
                <MagnifyingGlass
                    class="h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2"
                />
                <input
                    type="text"
                    placeholder="Search listings by title, location..."
                    bind:value={searchTerm}
                    class="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
            </div>
            <div class="flex items-center gap-2">
                <input
                    type="number"
                    placeholder="Min Price"
                    bind:value={priceRange.min}
                    class="pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-center"
                />
                <span class="text-gray-400">-</span>
                <input
                    type="number"
                    placeholder="Max Price"
                    bind:value={priceRange.max}
                    class="pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-center"
                />
            </div>
            <div class="flex items-center gap-4">
                <select
                    bind:value={sortBy}
                    class="p-2 w-full border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="location-asc">Location (A-Z)</option>
                    <option value="location-desc">Location (Z-A)</option>
                    <option value="category-asc">Category (A-Z)</option>
                    <option value="category-desc">Category (Z-A)</option>
                </select>
                <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    <button
                        type="button"
                        on:click={() => (viewMode = 'grid')}
                        class={`p-1 rounded ${
                            viewMode === 'grid' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''
                        }`}
                        aria-label="Grid View"
                        aria-pressed={viewMode === 'grid'}
                    ><Squares2X2 class="h-5 w-5" /></button
                    >
                    <button
                        type="button"
                        on:click={() => (viewMode = 'list')}
                        class={`p-1 rounded ${
                            viewMode === 'list' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''
                        }`}
                        aria-label="List View"
                        aria-pressed={viewMode === 'list'}
                    ><Bars3 class="h-5 w-5" /></button
                    >
                </div>
            </div>
        </div>
        <div class="mt-4 border-b border-brand-border dark:border-dark-border">
            <nav class="-mb-px flex space-x-4 overflow-x-auto">
                {#each categories as category}
                    <button
                        type="button"
                        on:click={() => (activeCategory = category)}
                        aria-pressed={activeCategory === category}
                        class={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                            activeCategory === category
                                ? 'border-brand-primary text-brand-primary dark:border-dark-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        {category}
                    </button>
                {/each}
            </nav>
        </div>
    </Card>

    {#if isAuthenticated}
        <div class="flex justify-end">
            <Button
                type="button"
                variant="secondary"
                on:click={() => setActiveView('MY_LISTINGS')}
                disabled={!isCommunitySubscribed}
                title={!isCommunitySubscribed ? 'Community subscription required to manage listings' : ''}
            >
                <WrenchScrewdriver class="h-5 w-5 mr-2" />
                Manage My Listings
            </Button>
        </div>
    {/if}

    {#if currentListings.length > 0}
        {#if viewMode === 'grid'}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each currentListings as listing (listing.id)}
                    <ListingCard
                        {listing}
                        on:open={(e) => (selectedListing = e.detail)}
                        on:viewvendor={(e) => onViewVendor(e.detail)}
                    />
                {/each}
            </div>
        {:else}
            <div class="space-y-4">
                {#each currentListings as listing (listing.id)}
                    <ListingRow
                        {listing}
                        on:open={(e) => (selectedListing = e.detail)}
                        on:viewvendor={(e) => onViewVendor(e.detail)}
                    />
                {/each}
            </div>
        {/if}
    {:else}
        <Card class="text-center py-16">
            <InformationCircleIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 class="text-xl font-bold">No listings found</h3>
            <p class="text-gray-500">Try adjusting your search or filters.</p>
        </Card>
    {/if}

    <Card class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-2 text-sm">
            <span>Items per page:</span>
            <select
                bind:value={itemsPerPage}
                class="p-1 border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-md"
            >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={18}>18</option>
            </select>
        </div>
        <div class="flex items-center gap-2">
            <Button
                type="button"
                variant="secondary"
                on:click={() => (currentPage = Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeftIcon class="h-5 w-5" />
            </Button>
            >
            <span class="text-sm font-medium">Page {currentPage} of {totalPages}</span>
            <Button
                type="button"
                variant="secondary"
                on:click={() => (currentPage = Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <ChevronRightIcon class="h-5 w-5" />
            </Button>
            >
        </div>
    </Card>
</div>
