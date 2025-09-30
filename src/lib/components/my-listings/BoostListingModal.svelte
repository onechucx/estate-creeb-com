<script lang="ts">
    import Modal from '$lib/components/common/Modal.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import { createEventDispatcher } from 'svelte';
    import { BoltIcon, EyeIcon, TrendingUpIcon, CurrencyDollarIcon, CheckCircleIcon } from 'heroicons-svelte/24/outline';

    export let open: boolean = false;
    export let listing: any;
    
    const dispatch = createEventDispatcher();

    let selectedPlan: 'basic' | 'premium' | 'featured' | null = null;
    let duration: number = 7;
    let isSubmitting = false;

    const boostPlans = [
        {
            id: 'basic',
            name: 'Basic Boost',
            icon: EyeIcon,
            price: 2000,
            features: [
                'Move to top of search results',
                '2x more visibility',
                'Basic analytics',
                'Email support'
            ],
            color: 'blue'
        },
        {
            id: 'premium',
            name: 'Premium Boost',
            icon: TrendingUpIcon,
            price: 5000,
            features: [
                'Featured in category',
                '5x more visibility',
                'Advanced analytics',
                'Priority support',
                'Social media promotion'
            ],
            color: 'purple'
        },
        {
            id: 'featured',
            name: 'Featured Listing',
            icon: BoltIcon,
            price: 10000,
            features: [
                'Homepage featured section',
                '10x more visibility',
                'Full analytics suite',
                'Dedicated support',
                'All marketing channels',
                'Badge highlighting'
            ],
            color: 'yellow'
        }
    ];

    const durationOptions = [
        { days: 7, label: '1 Week', multiplier: 1 },
        { days: 14, label: '2 Weeks', multiplier: 1.8 },
        { days: 30, label: '1 Month', multiplier: 3.5 }
    ];

    $: selectedPlanData = boostPlans.find(plan => plan.id === selectedPlan);
    $: totalPrice = selectedPlanData ? Math.round(selectedPlanData.price * (durationOptions.find(d => d.days === duration)?.multiplier || 1)) : 0;

    function selectPlan(planId: 'basic' | 'premium' | 'featured') {
        selectedPlan = planId;
    }

    async function handleSubmit() {
        if (!selectedPlan) return;

        isSubmitting = true;
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            dispatch('boost', {
                listing: listing,
                plan: selectedPlan,
                duration: duration,
                price: totalPrice
            });
            
            close();
        } catch (error) {
            console.error('Error boosting listing:', error);
        } finally {
            isSubmitting = false;
        }
    }

    function close() {
        selectedPlan = null;
        duration = 7;
        dispatch('close');
    }
</script>

<Modal {open} title="Boost Your Listing" on:close={close}>
    <div class="p-6 space-y-6">
        <!-- Listing Info -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
                {listing?.title || 'Your Listing'}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                {listing?.location || 'Property Location'} • ₦{listing?.price?.toLocaleString() || '0'}
            </p>
            <p class="text-sm text-gray-500 mt-1">
                Current views: {listing?.views || 0} • Leads: {listing?.leads || 0}
            </p>
        </div>

        <!-- Boost Plans -->
        <section aria-labelledby="plans-heading">
            <h3 id="plans-heading" class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Choose Your Boost Plan
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                {#each boostPlans as plan}
                    <button
                        type="button"
                        class="text-left p-4 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        class:border-blue-500={selectedPlan === plan.id}
                        class:bg-blue-50={selectedPlan === plan.id}
                        class:dark:bg-blue-900={selectedPlan === plan.id}
                        class:border-gray-200={selectedPlan !== plan.id}
                        class:dark:border-gray-700={selectedPlan !== plan.id}
                        on:click={() => selectPlan(plan.id)}
                        aria-pressed={selectedPlan === plan.id}
                        aria-describedby="plan-{plan.id}-features"
                    >
                        <div class="flex items-center mb-3">
                            <div class="w-8 h-8 rounded-full bg-{plan.color}-100 dark:bg-{plan.color}-900 flex items-center justify-center mr-3">
                                <svelte:component this={plan.icon} class="w-4 h-4 text-{plan.color}-600 dark:text-{plan.color}-400" aria-hidden="true" />
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900 dark:text-white">{plan.name}</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400">₦{plan.price.toLocaleString()}/week</p>
                            </div>
                        </div>
                        
                        <ul id="plan-{plan.id}-features" class="space-y-2">
                            {#each plan.features as feature}
                                <li class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <CheckCircleIcon class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                                    {feature}
                                </li>
                            {/each}
                        </ul>
                    </button>
                {/each}
            </div>
        </section>

        <!-- Duration Selection -->
        {#if selectedPlan}
            <section aria-labelledby="duration-heading">
                <h3 id="duration-heading" class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Select Duration
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {#each durationOptions as option}
                        <label class="flex items-center p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                            <input
                                type="radio"
                                name="duration"
                                value={option.days}
                                bind:group={duration}
                                class="text-blue-600 focus:ring-blue-500"
                            />
                            <div class="ml-3">
                                <div class="font-medium text-gray-900 dark:text-white">{option.label}</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400">
                                    ₦{Math.round(selectedPlanData.price * option.multiplier).toLocaleString()}
                                    {#if option.multiplier < 3}
                                        <span class="text-green-600 dark:text-green-400 ml-1">
                                            (Save {Math.round((1 - option.multiplier / option.days * 7) * 100)}%)
                                        </span>
                                    {/if}
                                </div>
                            </div>
                        </label>
                    {/each}
                </div>
            </section>

            <!-- Summary -->
            <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Boost Summary</h4>
                <div class="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <div class="flex justify-between">
                        <span>Plan:</span>
                        <span>{selectedPlanData?.name}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Duration:</span>
                        <span>{durationOptions.find(d => d.days === duration)?.label}</span>
                    </div>
                    <div class="flex justify-between font-semibold border-t border-blue-200 dark:border-blue-700 pt-2 mt-2">
                        <span>Total:</span>
                        <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Actions -->
        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
                type="button"
                variant="secondary"
                on:click={close}
                disabled={isSubmitting}
            >
                Cancel
            </Button>
            <Button
                type="button"
                variant="primary"
                on:click={handleSubmit}
                disabled={!selectedPlan || isSubmitting}
                aria-label="Boost listing for {selectedPlan ? selectedPlanData?.name : ''}"
            >
                {#if isSubmitting}
                    <span class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                {:else if selectedPlan}
                    Boost for ₦{totalPrice.toLocaleString()}
                {:else}
                    Select a Plan
                {/if}
            </Button>
        </div>
    </div>
</Modal>
