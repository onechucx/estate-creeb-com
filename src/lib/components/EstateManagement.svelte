<script lang="ts">
    import Card from '$lib/components/common/Card.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import { BuildingOfficeIcon, MapIcon, CurrencyDollarIcon, UsersIcon, PlusIcon, EyeIcon, PencilIcon } from 'heroicons-svelte/24/outline';

    // Mock estate data
    const properties = [
        {
            id: 1,
            name: 'Sunset Heights Apartments',
            location: 'Victoria Island, Lagos',
            type: 'Residential',
            units: 24,
            occupied: 22,
            monthlyRevenue: 4800000,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'
        },
        {
            id: 2,
            name: 'Business Park Complex',
            location: 'Ikeja, Lagos',
            type: 'Commercial',
            units: 12,
            occupied: 10,
            monthlyRevenue: 8200000,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
        },
        {
            id: 3,
            name: 'Marina Towers',
            location: 'Lagos Island, Lagos',
            type: 'Mixed Use',
            units: 36,
            occupied: 28,
            monthlyRevenue: 12600000,
            status: 'maintenance',
            image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400'
        }
    ];

    const summaryStats = [
        { label: 'Total Properties', value: properties.length.toString(), icon: BuildingOfficeIcon },
        { label: 'Total Units', value: properties.reduce((sum, p) => sum + p.units, 0).toString(), icon: MapIcon },
        { label: 'Occupied Units', value: properties.reduce((sum, p) => sum + p.occupied, 0).toString(), icon: UsersIcon },
        { label: 'Monthly Revenue', value: `₦${(properties.reduce((sum, p) => sum + p.monthlyRevenue, 0) / 1000000).toFixed(1)}M`, icon: CurrencyDollarIcon }
    ];

    function getOccupancyRate(property: any) {
        return Math.round((property.occupied / property.units) * 100);
    }

    function getStatusColor(status: string) {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
</script>

<main class="p-4 sm:p-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-brand-text-primary">Estate Management</h1>
            <p class="text-lg text-brand-text-secondary mt-2">Manage your property portfolio and track performance.</p>
        </div>
        <Button 
            type="button" 
            variant="primary" 
            class="mt-4 sm:mt-0"
            aria-label="Add new property to portfolio"
        >
            <PlusIcon class="w-5 h-5 mr-2" aria-hidden="true" />
            Add Property
        </Button>
    </div>

    <!-- Summary Statistics -->
    <section aria-labelledby="stats-heading" class="mb-8">
        <h2 id="stats-heading" class="sr-only">Portfolio Statistics</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each summaryStats as stat}
                <Card class="text-center hover:shadow-lg transition-shadow duration-200">
                    <div class="p-6">
                        <div class="flex justify-center mb-3">
                            <svelte:component this={stat.icon} class="w-8 h-8 text-brand-primary" aria-hidden="true" />
                        </div>
                        <div class="text-2xl font-bold text-brand-text-primary">{stat.value}</div>
                        <div class="text-sm text-brand-text-secondary mt-1">{stat.label}</div>
                    </div>
                </Card>
            {/each}
        </div>
    </section>

    <!-- Properties List -->
    <section aria-labelledby="properties-heading">
        <h2 id="properties-heading" class="text-xl font-semibold text-brand-text-primary mb-6">Your Properties</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {#each properties as property}
                <Card class="hover:shadow-lg transition-shadow duration-200">
                    <article class="overflow-hidden">
                        <img 
                            src={property.image} 
                            alt="Exterior view of {property.name}"
                            class="w-full h-48 object-cover"
                            loading="lazy"
                        />
                        <div class="p-6">
                            <div class="flex items-start justify-between mb-3">
                                <div>
                                    <h3 class="text-lg font-semibold text-brand-text-primary">{property.name}</h3>
                                    <p class="text-sm text-brand-text-secondary flex items-center mt-1">
                                        <MapIcon class="w-4 h-4 mr-1" aria-hidden="true" />
                                        {property.location}
                                    </p>
                                </div>
                                <span 
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize {getStatusColor(property.status)}"
                                    aria-label="Property status: {property.status}"
                                >
                                    {property.status}
                                </span>
                            </div>

                            <div class="space-y-2 mb-4">
                                <div class="flex justify-between text-sm">
                                    <span class="text-brand-text-secondary">Type:</span>
                                    <span class="text-brand-text-primary font-medium">{property.type}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-brand-text-secondary">Occupancy:</span>
                                    <span class="text-brand-text-primary font-medium">
                                        {property.occupied}/{property.units} units ({getOccupancyRate(property)}%)
                                    </span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-brand-text-secondary">Monthly Revenue:</span>
                                    <span class="text-brand-text-primary font-medium">₦{(property.monthlyRevenue / 1000000).toFixed(1)}M</span>
                                </div>
                            </div>

                            <!-- Occupancy Progress Bar -->
                            <div class="mb-4">
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-brand-text-secondary">Occupancy Rate</span>
                                    <span class="text-brand-text-primary">{getOccupancyRate(property)}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        class="bg-brand-primary h-2 rounded-full transition-all duration-300" 
                                        style="width: {getOccupancyRate(property)}%"
                                        role="progressbar"
                                        aria-valuenow={getOccupancyRate(property)}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        aria-label="Occupancy rate for {property.name}"
                                    ></div>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex items-center justify-between pt-4 border-t border-brand-border dark:border-dark-border">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm"
                                    aria-label="View details for {property.name}"
                                >
                                    <EyeIcon class="w-4 h-4 mr-2" aria-hidden="true" />
                                    View Details
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm"
                                    aria-label="Edit {property.name}"
                                >
                                    <PencilIcon class="w-4 h-4 mr-2" aria-hidden="true" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </article>
                </Card>
            {/each}
        </div>
    </section>
</main>
