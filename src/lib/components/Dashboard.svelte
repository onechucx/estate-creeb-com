<script lang="ts">
    import Card from '$lib/components/common/Card.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import MetricCard from '$lib/components/my-listings/MetricCard.svelte';
    import { HomeIcon, UserIcon, BuildingOfficeIcon, CurrencyDollarIcon } from 'heroicons-svelte/24/outline';
    
    // Mock data - in real app would come from stores or API
    const metrics = [
        { label: 'Total Properties', value: '24', icon: HomeIcon, trend: '+12%' },
        { label: 'Active Listings', value: '18', icon: BuildingOfficeIcon, trend: '+8%' },
        { label: 'Total Revenue', value: '₦2.4M', icon: CurrencyDollarIcon, trend: '+23%' },
        { label: 'New Inquiries', value: '47', icon: UserIcon, trend: '+5%' }
    ];

    const recentActivity = [
        { type: 'inquiry', message: 'New inquiry for Modern 2-Bedroom Flat', time: '2 hours ago' },
        { type: 'listing', message: 'Property listing approved and published', time: '4 hours ago' },
        { type: 'payment', message: 'Payment received for Office Space rental', time: '1 day ago' },
        { type: 'review', message: 'New 5-star review received', time: '2 days ago' }
    ];
</script>

<main class="p-4 sm:p-6">
    <!-- Page Header -->
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-brand-text-primary">Dashboard</h1>
        <p class="text-lg text-brand-text-secondary mt-2">Welcome back! Here's what's happening with your properties.</p>
    </div>

    <!-- Metrics Grid -->
    <section aria-labelledby="metrics-heading" class="mb-8">
        <h2 id="metrics-heading" class="sr-only">Key Metrics</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each metrics as metric}
                <MetricCard 
                    label={metric.label} 
                    value={metric.value} 
                    icon={metric.icon}
                    class="hover:shadow-lg transition-shadow duration-200"
                />
            {/each}
        </div>
    </section>

    <!-- Quick Actions -->
    <section aria-labelledby="actions-heading" class="mb-8">
        <h2 id="actions-heading" class="text-xl font-semibold text-brand-text-primary mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
                type="button" 
                variant="primary" 
                class="justify-center py-6"
                aria-label="Create new property listing"
                on:click={() => {/* Navigate to create listing */}}
            >
                <HomeIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                Create New Listing
            </Button>
            <Button 
                type="button" 
                variant="secondary" 
                class="justify-center py-6"
                aria-label="View all messages and inquiries"
                on:click={() => {/* Navigate to inbox */}}
            >
                <UserIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                View Messages
            </Button>
            <Button 
                type="button" 
                variant="ghost" 
                class="justify-center py-6 border-2 border-dashed border-gray-300 hover:border-brand-primary"
                aria-label="Manage property portfolio"
                on:click={() => {/* Navigate to estate management */}}
            >
                <BuildingOfficeIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                Manage Portfolio
            </Button>
        </div>
    </section>

    <!-- Recent Activity -->
    <section aria-labelledby="activity-heading">
        <h2 id="activity-heading" class="text-xl font-semibold text-brand-text-primary mb-4">Recent Activity</h2>
        <Card>
            <div class="p-6">
                <ul role="list" class="space-y-4">
                    {#each recentActivity as activity}
                        <li class="flex items-start space-x-3">
                            <div class="flex-shrink-0 w-2 h-2 bg-brand-primary rounded-full mt-2" aria-hidden="true"></div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm text-brand-text-primary">{activity.message}</p>
                                <p class="text-xs text-brand-text-secondary mt-1">{activity.time}</p>
                            </div>
                        </li>
                    {/each}
                </ul>
                <div class="mt-6 pt-4 border-t border-brand-border dark:border-dark-border">
                    <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        aria-label="View all recent activity"
                    >
                        View All Activity
                    </Button>
                </div>
            </div>
        </Card>
    </section>
</main>
