<script lang="ts">
    import Card from '$lib/components/common/Card.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import { PlusIcon, EyeIcon, ChartBarIcon, BoltIcon, PencilIcon, TrashIcon } from 'heroicons-svelte/24/outline';
    import type { MyListing } from '$lib/types';
    import CreateListingModal from '$lib/components/my-listings/CreateListingModal.svelte';
    import BoostListingModal from '$lib/components/my-listings/BoostListingModal.svelte';
    import MetricCard from '$lib/components/my-listings/MetricCard.svelte';

    let listings: MyListing[] = [
        {
            id: 'listing1',
            title: 'Modern 2-Bedroom Flat',
            location: 'Yaba, Lagos',
            price: 50000000,
            status: 'active',
            views: 1204,
            leads: 45,
            image: '/placeholder.svg'
        },
        {
            id: 'listing2',
            title: 'Serviced Office Space',
            location: 'VI, Lagos',
            price: 15000000,
            status: 'pending',
            views: 302,
            leads: 12,
            image: '/placeholder.svg'
        },
        {
            id: 'listing3',
            title: 'Land for Sale',
            location: 'Epe, Lagos',
            price: 25000000,
            status: 'inactive',
            views: 88,
            leads: 5,
            image: '/placeholder.svg'
        }
    ];

    let showCreateModal = false;
    let showBoostModal = false;
    let selectedListing: MyListing | null = null;

    const totalViews = listings.reduce((sum, l) => sum + l.views, 0);
    const totalLeads = listings.reduce((sum, l) => sum + l.leads, 0);
    const activeListings = listings.filter((l) => l.status === 'active').length;

    const metrics = [
        { label: 'Total Views', value: totalViews.toLocaleString(), icon: EyeIcon },
        { label: 'Total Leads', value: totalLeads.toLocaleString(), icon: ChartBarIcon },
        { label: 'Active Listings', value: activeListings, icon: BoltIcon }
    ];

    function openBoostModal(listing: MyListing) {
        selectedListing = listing;
        showBoostModal = true;
    }

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            default:
                return '';
        }
    };
</script>

{#if showCreateModal}
    <CreateListingModal on:close={() => (showCreateModal = false)} />
{/if}
{#if showBoostModal && selectedListing}
    <BoostListingModal listing={selectedListing} on:close={() => (showBoostModal = false)} />
{/if}

<div class="p-4 sm:p-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 class="text-2xl font-bold text-brand-text-primary mb-4 sm:mb-0">My Listings</h1>
        <Button type="button" on:click={() => (showCreateModal = true)} aria-label="Create a new listing">
            <PlusIcon class="w-5 h-5 mr-2" />
            Create Listing
        </Button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {#each metrics as metric}
            <MetricCard label={metric.label} value={metric.value} icon={metric.icon} />
        {/each}
    </div>

    <Card>
        <div class="overflow-x-auto">
            <table class="w-full text-left" aria-label="My listings table">
                <thead class="border-b border-brand-border dark:border-dark-border">
                    <tr class="text-sm text-brand-text-secondary">
                        <th class="p-4 font-medium">Listing</th>
                        <th class="p-4 font-medium hidden md:table-cell">Price</th>
                        <th class="p-4 font-medium hidden sm:table-cell">Status</th>
                        <th class="p-4 font-medium hidden lg:table-cell">Views</th>
                        <th class="p-4 font-medium hidden lg:table-cell">Leads</th>
                        <th class="p-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-brand-border dark:divide-dark-border">
                    {#each listings as listing (listing.id)}
                        <tr class="text-brand-text-primary">
                            <td class="p-4">
                                <div class="flex items-center">
                                    <img
                                        src={listing.image.replace('http://placeimg.com', 'https://loremflickr.com')}
                                        alt={listing.title}
                                        class="w-16 h-12 object-cover rounded-md mr-4 hidden sm:block"
                                        loading="lazy"
                                    />
                                    <div>
                                        <p class="font-semibold">{listing.title}</p>
                                        <p class="text-sm text-brand-text-secondary">{listing.location}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-4 hidden md:table-cell">₦{listing.price.toLocaleString()}</td>
                            <td class="p-4 hidden sm:table-cell">
                                <span
                                    class="text-xs font-medium px-2 py-1 rounded-full capitalize {getStatusClass(
                                        listing.status
                                    )}"
                                >
                                    {listing.status}
                                </span>
                            </td>
                            <td class="p-4 hidden lg:table-cell">{listing.views}</td>
                            <td class="p-4 hidden lg:table-cell">{listing.leads}</td>
                            <td class="p-4">
                                <div class="flex items-center space-x-2">
                                    <Button type="button" size="sm" variant="ghost" on:click={() => openBoostModal(listing)} aria-label={`Boost ${listing.title}`}>
                                        <BoltIcon class="w-4 h-4" />
                                    </Button>
                                    <Button type="button" size="sm" variant="ghost" aria-label={`Edit ${listing.title}`}>
                                        <PencilIcon class="w-4 h-4" />
                                    </Button>
                                    <Button type="button" size="sm" variant="ghost" class="text-red-500" aria-label={`Delete ${listing.title}`}>
                                        <TrashIcon class="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </Card>
</div>
