<script lang="ts">
    import Card from '$lib/components/common/Card.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import { BellIcon, ShieldCheckIcon, UserIcon, CogIcon, EyeIcon, MoonIcon, SunIcon } from 'heroicons-svelte/24/outline';

    let activeSection: 'profile' | 'notifications' | 'privacy' | 'preferences' = 'profile';
    
    // Settings state
    let notifications = {
        email: true,
        push: true,
        sms: false,
        marketing: false
    };
    
    let privacy = {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        allowMessages: true
    };
    
    let preferences = {
        theme: 'auto',
        language: 'en',
        currency: 'NGN',
        timezone: 'Africa/Lagos'
    };

    const sections = [
        { id: 'profile', label: 'Profile', icon: UserIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon },
        { id: 'privacy', label: 'Privacy', icon: ShieldCheckIcon },
        { id: 'preferences', label: 'Preferences', icon: CogIcon }
    ] as const;

    function handleSave() {
        // Handle save functionality
        console.log('Settings saved');
    }
</script>

<main class="p-4 sm:p-6">
    <!-- Page Header -->
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-brand-text-primary">Settings</h1>
        <p class="text-lg text-brand-text-secondary mt-2">Manage your account preferences and privacy settings.</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Settings Navigation -->
        <aside class="lg:w-64 flex-shrink-0" aria-label="Settings navigation">
            <Card>
                <nav class="p-4" aria-label="Settings sections">
                    <ul role="list" class="space-y-2">
                        {#each sections as section}
                            <li role="listitem">
                                <button
                                    type="button"
                                    class="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors duration-200 {activeSection === section.id 
                                        ? 'bg-brand-primary text-white' 
                                        : 'text-brand-text-primary hover:bg-gray-100 dark:hover:bg-gray-800'}"
                                    aria-current={activeSection === section.id ? 'page' : false}
                                    on:click={() => activeSection = section.id}
                                    on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activeSection = section.id } }}
                                >
                                    <svelte:component this={section.icon} class="w-5 h-5 mr-3" aria-hidden="true" />
                                    {section.label}
                                </button>
                            </li>
                        {/each}
                    </ul>
                </nav>
            </Card>
        </aside>

        <!-- Settings Content -->
        <div class="flex-1">
            {#if activeSection === 'profile'}
                <Card>
                    <div class="p-6">
                        <h2 class="text-xl font-semibold text-brand-text-primary mb-4">Profile Settings</h2>
                        <form on:submit|preventDefault={handleSave} class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label for="firstName" class="block text-sm font-medium text-brand-text-secondary mb-2">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value="John"
                                        class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>
                                <div>
                                    <label for="lastName" class="block text-sm font-medium text-brand-text-secondary mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value="Doe"
                                        class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-brand-text-secondary mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value="john.doe@example.com"
                                    class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>
                            <div>
                                <label for="bio" class="block text-sm font-medium text-brand-text-secondary mb-2">Bio</label>
                                <textarea
                                    id="bio"
                                    rows="4"
                                    placeholder="Tell us about yourself..."
                                    class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                ></textarea>
                            </div>
                        </form>
                    </div>
                </Card>
            {:else if activeSection === 'notifications'}
                <Card>
                    <div class="p-6">
                        <h2 class="text-xl font-semibold text-brand-text-primary mb-4">Notification Preferences</h2>
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-brand-text-primary">Email Notifications</h3>
                                    <p class="text-sm text-brand-text-secondary">Receive notifications via email</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        bind:checked={notifications.email}
                                        class="sr-only peer"
                                        aria-describedby="email-notifications-desc"
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/25 dark:peer-focus:ring-brand-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </label>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-brand-text-primary">Push Notifications</h3>
                                    <p class="text-sm text-brand-text-secondary">Receive push notifications in your browser</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        bind:checked={notifications.push}
                                        class="sr-only peer"
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </label>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-brand-text-primary">SMS Notifications</h3>
                                    <p class="text-sm text-brand-text-secondary">Receive important alerts via SMS</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        bind:checked={notifications.sms}
                                        class="sr-only peer"
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </label>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-brand-text-primary">Marketing Communications</h3>
                                    <p class="text-sm text-brand-text-secondary">Receive updates about new features and offers</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        bind:checked={notifications.marketing}
                                        class="sr-only peer"
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </Card>
            {:else if activeSection === 'privacy'}
                <Card>
                    <div class="p-6">
                        <h2 class="text-xl font-semibold text-brand-text-primary mb-4">Privacy Settings</h2>
                        <div class="space-y-6">
                            <div>
                                <label for="profileVisibility" class="block text-sm font-medium text-brand-text-secondary mb-2">Profile Visibility</label>
                                <select
                                    id="profileVisibility"
                                    bind:value={privacy.profileVisibility}
                                    class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="contacts">Contacts Only</option>
                                </select>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-brand-text-primary">Show Email Address</h3>
                                    <p class="text-sm text-brand-text-secondary">Allow others to see your email address</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        bind:checked={privacy.showEmail}
                                        class="sr-only peer"
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </label>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-brand-text-primary">Allow Direct Messages</h3>
                                    <p class="text-sm text-brand-text-secondary">Let other users send you direct messages</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        bind:checked={privacy.allowMessages}
                                        class="sr-only peer"
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </Card>
            {:else if activeSection === 'preferences'}
                <Card>
                    <div class="p-6">
                        <h2 class="text-xl font-semibold text-brand-text-primary mb-4">Preferences</h2>
                        <div class="space-y-6">
                            <div>
                                <label for="theme" class="block text-sm font-medium text-brand-text-secondary mb-2">Theme</label>
                                <select
                                    id="theme"
                                    bind:value={preferences.theme}
                                    class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                >
                                    <option value="auto">Auto (System)</option>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>
                            <div>
                                <label for="language" class="block text-sm font-medium text-brand-text-secondary mb-2">Language</label>
                                <select
                                    id="language"
                                    bind:value={preferences.language}
                                    class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                >
                                    <option value="en">English</option>
                                    <option value="yo">Yoruba</option>
                                    <option value="ig">Igbo</option>
                                    <option value="ha">Hausa</option>
                                </select>
                            </div>
                            <div>
                                <label for="currency" class="block text-sm font-medium text-brand-text-secondary mb-2">Currency</label>
                                <select
                                    id="currency"
                                    bind:value={preferences.currency}
                                    class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                >
                                    <option value="NGN">Nigerian Naira (₦)</option>
                                    <option value="USD">US Dollar ($)</option>
                                    <option value="EUR">Euro (€)</option>
                                    <option value="GBP">British Pound (£)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Card>
            {/if}

            <!-- Save Button -->
            <div class="mt-6">
                <Button 
                    type="button" 
                    variant="primary"
                    on:click={handleSave}
                    aria-label="Save current settings"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    </div>
</main>
