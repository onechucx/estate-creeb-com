<script lang="ts">
    import Modal from '$lib/components/common/Modal.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import { createEventDispatcher } from 'svelte';
    import { HomeIcon, MapPinIcon, CurrencyDollarIcon, PhotoIcon, XMarkIcon } from 'heroicons-svelte/24/outline';

    export let open: boolean = false;
    
    const dispatch = createEventDispatcher();

    let formData = {
        title: '',
        description: '',
        propertyType: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        features: [] as string[],
        images: [] as File[]
    };

    let errors: Record<string, string> = {};
    let isSubmitting = false;
    let previewUrls: string[] = [];

    const propertyTypes = [
        'Apartment',
        'House',
        'Commercial',
        'Land',
        'Office Space',
        'Shop',
        'Warehouse'
    ];

    const availableFeatures = [
        'Swimming Pool',
        'Gym',
        'Parking',
        'Security',
        'Generator',
        'Air Conditioning',
        'Furnished',
        'Garden',
        'Balcony',
        'Elevator'
    ];

    function validateForm() {
        errors = {};
        
        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.description.trim()) errors.description = 'Description is required';
        if (!formData.propertyType) errors.propertyType = 'Property type is required';
        if (!formData.location.trim()) errors.location = 'Location is required';
        if (!formData.price || Number(formData.price) <= 0) errors.price = 'Valid price is required';
        
        return Object.keys(errors).length === 0;
    }

    function handleImageUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        
        if (files) {
            const newImages = Array.from(files);
            formData.images = [...formData.images, ...newImages];
            
            // Create preview URLs
            newImages.forEach(file => {
                const url = URL.createObjectURL(file);
                previewUrls = [...previewUrls, url];
            });
        }
    }

    function removeImage(index: number) {
        // Revoke URL to prevent memory leaks
        URL.revokeObjectURL(previewUrls[index]);
        
        formData.images = formData.images.filter((_, i) => i !== index);
        previewUrls = previewUrls.filter((_, i) => i !== index);
    }

    function toggleFeature(feature: string) {
        if (formData.features.includes(feature)) {
            formData.features = formData.features.filter(f => f !== feature);
        } else {
            formData.features = [...formData.features, feature];
        }
    }

    async function handleSubmit() {
        if (!validateForm()) return;

        isSubmitting = true;
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            dispatch('submit', formData);
            close();
        } catch (error) {
            console.error('Error creating listing:', error);
        } finally {
            isSubmitting = false;
        }
    }

    function close() {
        // Clean up preview URLs
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        dispatch('close');
    }

    function resetForm() {
        formData = {
            title: '',
            description: '',
            propertyType: '',
            location: '',
            price: '',
            bedrooms: '',
            bathrooms: '',
            area: '',
            features: [],
            images: []
        };
        errors = {};
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        previewUrls = [];
    }

    // Reset form when modal closes
    $: if (!open) {
        resetForm();
    }
</script>

<Modal {open} title="Create New Listing" on:close={close}>
    <form on:submit|preventDefault={handleSubmit} class="p-6 space-y-6">
        <!-- Basic Information -->
        <section aria-labelledby="basic-info-heading">
            <h3 id="basic-info-heading" class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <HomeIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                Basic Information
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Property Title <span class="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        bind:value={formData.title}
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        class:border-red-500={errors.title}
                        placeholder="e.g., Modern 3-Bedroom Apartment"
                        aria-describedby={errors.title ? 'title-error' : undefined}
                    />
                    {#if errors.title}
                        <p id="title-error" class="mt-1 text-sm text-red-600" role="alert">
                            {errors.title}
                        </p>
                    {/if}
                </div>

                <div>
                    <label for="propertyType" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Property Type <span class="text-red-500" aria-label="required">*</span>
                    </label>
                    <select
                        id="propertyType"
                        bind:value={formData.propertyType}
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        class:border-red-500={errors.propertyType}
                        aria-describedby={errors.propertyType ? 'propertyType-error' : undefined}
                    >
                        <option value="">Select type</option>
                        {#each propertyTypes as type}
                            <option value={type}>{type}</option>
                        {/each}
                    </select>
                    {#if errors.propertyType}
                        <p id="propertyType-error" class="mt-1 text-sm text-red-600" role="alert">
                            {errors.propertyType}
                        </p>
                    {/if}
                </div>
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description <span class="text-red-500" aria-label="required">*</span>
                </label>
                <textarea
                    id="description"
                    bind:value={formData.description}
                    required
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                    class:border-red-500={errors.description}
                    placeholder="Describe your property in detail..."
                    aria-describedby={errors.description ? 'description-error' : 'description-help'}
                ></textarea>
                {#if errors.description}
                    <p id="description-error" class="mt-1 text-sm text-red-600" role="alert">
                        {errors.description}
                    </p>
                {:else}
                    <p id="description-help" class="mt-1 text-sm text-gray-500">
                        Provide details about the property, its condition, and unique features
                    </p>
                {/if}
            </div>
        </section>

        <!-- Location & Pricing -->
        <section aria-labelledby="location-pricing-heading">
            <h3 id="location-pricing-heading" class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <MapPinIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                Location & Pricing
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location <span class="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                        id="location"
                        type="text"
                        bind:value={formData.location}
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        class:border-red-500={errors.location}
                        placeholder="e.g., Ikeja, Lagos"
                        aria-describedby={errors.location ? 'location-error' : undefined}
                    />
                    {#if errors.location}
                        <p id="location-error" class="mt-1 text-sm text-red-600" role="alert">
                            {errors.location}
                        </p>
                    {/if}
                </div>

                <div>
                    <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price (₦) <span class="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                        id="price"
                        type="number"
                        bind:value={formData.price}
                        required
                        min="0"
                        step="1000"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        class:border-red-500={errors.price}
                        placeholder="5000000"
                        aria-describedby={errors.price ? 'price-error' : undefined}
                    />
                    {#if errors.price}
                        <p id="price-error" class="mt-1 text-sm text-red-600" role="alert">
                            {errors.price}
                        </p>
                    {/if}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label for="bedrooms" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bedrooms
                    </label>
                    <input
                        id="bedrooms"
                        type="number"
                        bind:value={formData.bedrooms}
                        min="0"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label for="bathrooms" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bathrooms
                    </label>
                    <input
                        id="bathrooms"
                        type="number"
                        bind:value={formData.bathrooms}
                        min="0"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label for="area" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Area (sq ft)
                    </label>
                    <input
                        id="area"
                        type="number"
                        bind:value={formData.area}
                        min="0"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </section>

        <!-- Features -->
        <section aria-labelledby="features-heading">
            <h3 id="features-heading" class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Features & Amenities
            </h3>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                {#each availableFeatures as feature}
                    <label class="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.features.includes(feature)}
                            on:change={() => toggleFeature(feature)}
                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </label>
                {/each}
            </div>
        </section>

        <!-- Images -->
        <section aria-labelledby="images-heading">
            <h3 id="images-heading" class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <PhotoIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                Property Images
            </h3>
            
            <div class="space-y-4">
                <div>
                    <label for="images" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Upload Images
                    </label>
                    <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        on:change={handleImageUpload}
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p class="mt-1 text-sm text-gray-500">
                        Upload multiple images to showcase your property
                    </p>
                </div>

                {#if previewUrls.length > 0}
                    <div class="grid grid-cols-3 md:grid-cols-4 gap-4">
                        {#each previewUrls as url, index}
                            <div class="relative">
                                <img 
                                    src={url} 
                                    alt="Property preview {index + 1}"
                                    class="w-full h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                />
                                <button
                                    type="button"
                                    class="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    on:click={() => removeImage(index)}
                                    aria-label="Remove image {index + 1}"
                                >
                                    <XMarkIcon class="w-4 h-4" aria-hidden="true" />
                                </button>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </section>

        <!-- Form Actions -->
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
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                aria-label="Create listing"
            >
                {#if isSubmitting}
                    <span class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                    </span>
                {:else}
                    Create Listing
                {/if}
            </Button>
        </div>
    </form>
</Modal>
