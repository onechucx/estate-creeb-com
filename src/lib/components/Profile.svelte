<script lang="ts">
    import Card from '$lib/components/common/Card.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import { user } from '$lib/stores';
    import { PencilIcon } from 'heroicons-svelte/24/outline';

    let editMode = false;

    let localUser = { ...$user };

    function handleSubmit() {
        user.set(localUser);
        editMode = false;
    }

    function handleCancel() {
        localUser = { ...$user };
        editMode = false;
    }
</script>

<div class="p-4 sm:p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-brand-text-primary">My Profile</h1>
        {#if !editMode}
            <Button type="button" on:click={() => (editMode = true)} aria-label="Edit profile">
                    <PencilIcon class="w-5 h-5 mr-2" aria-hidden="true" />
                Edit Profile
            </Button>
        {/if}
    </div>

    <Card>
        <form on:submit|preventDefault={handleSubmit}>
            <div class="p-6 space-y-6">
                <div class="flex items-center space-x-6">
                    <img
                        src={localUser.avatar}
                        alt="User Avatar"
                        class="w-24 h-24 rounded-full object-cover"
                    />
                    {#if editMode}
                        <div>
                            <Button variant="secondary">Change Photo</Button>
                            <p class="text-xs text-brand-text-secondary mt-2">
                                JPG, GIF or PNG. 1MB max.
                            </p>
                        </div>
                    {/if}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="fullName" class="block text-sm font-medium text-brand-text-secondary">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            bind:value={localUser.name}
                            disabled={!editMode}
                            class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm bg-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-brand-text-secondary">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            bind:value={localUser.email}
                            disabled
                            class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm sm:text-sm bg-gray-100 dark:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label for="phone" class="block text-sm font-medium text-brand-text-secondary">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            bind:value={localUser.phone}
                            disabled={!editMode}
                            class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm bg-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label for="role" class="block text-sm font-medium text-brand-text-secondary">Role</label>
                        <input
                            type="text"
                            id="role"
                            bind:value={localUser.role}
                            disabled
                            class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm sm:text-sm bg-gray-100 dark:bg-gray-800"
                        />
                    </div>
                    <div class="md:col-span-2">
                        <label for="bio" class="block text-sm font-medium text-brand-text-secondary">Bio</label>
                        <textarea
                            id="bio"
                            rows="4"
                            bind:value={localUser.bio}
                            disabled={!editMode}
                            class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm bg-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"
                        ></textarea>
                    </div>
                </div>
            </div>
            {#if editMode}
                <div class="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 flex justify-end space-x-3 rounded-b-lg">
                    <Button type="button" variant="secondary" on:click={handleCancel}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </div>
            {/if}
        </form>
    </Card>
</div>
