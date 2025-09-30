<script lang="ts">
    import {
        XMarkIcon,
        ChevronLeftIcon,
        ChevronRightIcon,
        ChatBubbleLeftRightIcon
    } from 'heroicons-svelte/24/outline';
    import Card from './common/Card.svelte';
    import Button from './common/Button.svelte';
    import type { Listing } from '$lib/types';
    import { createEventDispatcher } from 'svelte';

    export let listing: Listing;
    export let isAuthenticated: boolean;
    export let onStartMessage: ((userId: string, userName: string) => void) | undefined = undefined;
    export let onLoginRequest: (() => void) | undefined = undefined;

    const dispatch = createEventDispatcher();

    let selectedImageIndex = 0;

    function handleContact() {
        if (isAuthenticated && onStartMessage) {
            onStartMessage(listing.vendorId, listing.vendorName);
        } else if (!isAuthenticated && onLoginRequest) {
            onLoginRequest();
        }
        dispatch('close'); // Close modal after action
    }

    function nextImage() {
        selectedImageIndex = (selectedImageIndex + 1) % listing.images.length;
    }

    function prevImage() {
        selectedImageIndex = (selectedImageIndex - 1 + listing.images.length) % listing.images.length;
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
    <Card class="w-full max-w-4xl max-h-[90vh] flex flex-col relative">
        <button
            on:click={() => dispatch('close')}
            class="absolute top-4 right-4 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 z-20"
            aria-label="Close listing detail"
        >
            <XMarkIcon class="h-6 w-6" />
        </button>
        <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto pr-2">
            <!-- Image Gallery -->
            <div class="relative w-full aspect-square lg:aspect-auto">
                <img
                    src={listing.images[selectedImageIndex]}
                    alt={`${listing.title} - Image ${selectedImageIndex + 1}`}
                    class="w-full h-full object-cover rounded-lg bg-gray-200"
                />
                {#if listing.images.length > 1}
                    <button
                        on:click={prevImage}
                        class="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60"
                        aria-label="Previous image"
                    >
                        <ChevronLeftIcon class="h-6 w-6" />
                    </button>
                    <button
                        on:click={nextImage}
                        class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60"
                        aria-label="Next image"
                    >
                        <ChevronRightIcon class="h-6 w-6" />
                    </button>
                    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                        {#each listing.images as _, index}
                            <div
                                class={`h-2 rounded-full transition-all ${index === selectedImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                            />
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- Listing Details -->
            <div class="flex flex-col">
                <div>
                    <p class="text-sm text-brand-text-secondary">{listing.category} &bull; {listing.location}</p>
                    <h2 class="text-3xl font-bold mt-1 text-brand-text-primary">{listing.title}</h2>
                    <p class="text-3xl font-bold text-brand-primary mt-2">₦{listing.price.toLocaleString()}</p>
                    <p class="text-sm text-brand-text-secondary mt-2">
                        Listed by: <span class="font-semibold text-brand-text-primary">{listing.vendorName}</span>
                    </p>
                </div>
                <div class="my-6 border-t border-brand-border" />
                <div>
                    <h3 class="font-bold text-lg text-brand-text-primary">Description</h3>
                    <p class="mt-2 text-brand-text-secondary whitespace-pre-wrap">{listing.description}</p>
                </div>
                <div class="mt-auto pt-6">
                    <Button on:click={handleContact} class="w-full !py-3 !text-lg justify-center">
                        <ChatBubbleLeftRightIcon class="h-6 w-6 mr-2" />
                        {isAuthenticated ? 'Contact Vendor' : 'Login to Contact'}
                    </Button>
                </div>
            </div>
        </div>
    </Card>
</div>
