<script lang="ts">
	import Card from '$lib/components/common/Card.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { appSettings } from '$lib/stores';
	import type { Theme, UserPrivacySettings } from '$lib/types';
	import { PaintBrush, BellAlert, ShieldCheck, Language } from '@heroicons/svelte/24/outline';
    import { writable } from 'svelte/store';

    // Local state for settings page
    const privacySettings = writable<UserPrivacySettings>({
        isPhoneNumberPublic: false,
        isAddressPublic: false,
        isBirthYearPublic: true,
        messagePrivacy: 'members_only',
    });

    const notificationSettings = writable({
        inApp: true,
        email: true,
        community: true,
        project: true,
        wallet: false,
    });
	
	const themes = [
        { name: 'light', displayName: 'Default Light', isDark: false, colors: ['#1E3A8A', '#3B82F6', '#10B981'] },
        { name: 'ocean', displayName: 'Ocean', isDark: false, colors: ['#006d77', '#83c5be', '#ffddd2'] },
        { name: 'forest', displayName: 'Forest', isDark: false, colors: ['#2d6a4f', '#74c69d', '#d95f02'] },
        { name: 'sunset', displayName: 'Sunset', isDark: false, colors: ['#d90429', '#ff9e00', '#ffc300'] },
        { name: 'rose', displayName: 'Rose', isDark: false, colors: ['#be185d', '#f9a8d4', '#6ee7b7'] },
        { name: 'mint', displayName: 'Mint', isDark: false, colors: ['#059669', '#6ee7b7', '#fb923c'] },
        { name: 'dark', displayName: 'Default Dark', isDark: true, colors: ['#3B82F6', '#1E3A8A', '#10B981'] },
        { name: 'royal', displayName: 'Royal', isDark: true, colors: ['#f59e0b', '#fcd34d', '#a855f7'] },
    ];

    function handleFontColorChange(e: Event) {
        const target = e.target as HTMLInputElement;
        appSettings.update(s => ({ ...s, fontColor: target.value }));
    }

    function handleResetFontColor() {
        appSettings.update(s => {
            const { fontColor, ...rest } = s;
            return rest;
        });
    }

    function handleNotificationToggle(key: keyof typeof $notificationSettings) {
        notificationSettings.update(s => ({...s, [key]: !s[key]}));
    }

    function handlePrivacyToggle(key: keyof Omit<UserPrivacySettings, 'messagePrivacy'>) {
        privacySettings.update(s => ({...s, [key]: !s[key]}));
    }

</script>

<div class="max-w-3xl mx-auto space-y-8">
	<h2 class="text-3xl font-bold text-brand-text-primary">Settings</h2>
	<Card>
		<h3 class="text-xl font-bold mb-6 flex items-center">
			<PaintBrush class="h-6 w-6 mr-3 text-brand-primary" />
			Appearance
		</h3>

		<div class="space-y-6">
			<!-- Theme Setting -->
			<div>
				<p class="font-semibold mb-2">Theme</p>
				<p class="text-sm text-brand-text-secondary mb-3">
					Choose how Creeb looks to you. Select a theme from the options below.
				</p>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{#each themes as theme}
						<button
							on:click={() => $appSettings.theme = theme.name as Theme}
							class="p-4 border-2 rounded-lg text-left transition-all {
                                $appSettings.theme === theme.name ? 'border-brand-primary ring-2 ring-brand-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                            } {theme.isDark ? 'bg-gray-800' : 'bg-brand-surface'}"
						>
							<p class="font-bold {theme.isDark ? 'text-white' : ''}">{theme.displayName}</p>
							<div class="flex space-x-2 h-8 mt-2">
								{#each theme.colors as color}
									<div class="w-1/3 rounded" style="background-color: {color}"></div>
								{/each}
							</div>
						</button>
					{/each}
				</div>
			</div>
            <!-- Dynamic Font Color -->
            <div>
                <p class="font-semibold mb-2">Dynamic Font Color</p>
                <p class="text-sm text-brand-text-secondary mb-3">Override the primary text color for any theme.</p>
                <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-brand-surface/50 rounded-lg">
                    <div class="relative">
                        <input
                            type="color"
                            value={$appSettings.fontColor || '#000000'}
                            on:input={handleFontColorChange}
                            class="w-10 h-10 p-0 border-none cursor-pointer bg-transparent"
                            title="Select font color"
                        />
                    </div>
                    <div class="flex-1">
                        <p class="font-bold text-lg" style="color: {$appSettings.fontColor}">Live Preview Text</p>
                        <p class="text-sm" style="color: {$appSettings.fontColor}">This is how the primary font color will look.</p>
                    </div>
                    <Button variant="secondary" on:click={handleResetFontColor}>Reset</Button>
                </div>
            </div>
            <!-- Font Size -->
            <div>
                 <p class="font-semibold mb-2">Font Size</p>
                 <div class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                    <Button on:click={() => $appSettings.fontSize = 'sm'} variant={$appSettings.fontSize === 'sm' ? 'primary' : 'secondary'} class="w-full">Small</Button>
                    <Button on:click={() => $appSettings.fontSize = 'base'} variant={$appSettings.fontSize === 'base' ? 'primary' : 'secondary'} class="w-full">Medium</Button>
                    <Button on:click={() => $appSettings.fontSize = 'lg'} variant={$appSettings.fontSize === 'lg' ? 'primary' : 'secondary'} class="w-full">Large</Button>
                </div>
            </div>
		</div>
	</Card>

    <Card>
        <h3 class="text-xl font-bold mb-6 flex items-center"><BellAlert class="h-6 w-6 mr-3 text-brand-primary" />Notification Settings</h3>
        <div class="space-y-6">
           <div class="flex items-center justify-between"><div><p class="font-semibold">In-App Notifications</p><p class="text-sm text-brand-text-secondary">Receive notifications directly within the app.</p></div><button on:click={() => handleNotificationToggle('inApp')} class="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors {$notificationSettings.inApp ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}"><div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out {$notificationSettings.inApp ? 'translate-x-6' : ''}"/></button></div>
           <div class="flex items-center justify-between"><div><p class="font-semibold">Email Notifications</p><p class="text-sm text-brand-text-secondary">Receive important updates via email.</p></div><button on:click={() => handleNotificationToggle('email')} class="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors {$notificationSettings.email ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}"><div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out {$notificationSettings.email ? 'translate-x-6' : ''}"/></button></div>
           <div class="flex items-center justify-between"><div><p class="font-semibold">Community Updates</p><p class="text-sm text-brand-text-secondary">Notifications about new posts and comments.</p></div><button on:click={() => handleNotificationToggle('community')} class="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors {$notificationSettings.community ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}"><div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out {$notificationSettings.community ? 'translate-x-6' : ''}"/></button></div>
           <div class="flex items-center justify-between"><div><p class="font-semibold">Project Milestones</p><p class="text-sm text-brand-text-secondary">Get notified about project progress.</p></div><button on:click={() => handleNotificationToggle('project')} class="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors {$notificationSettings.project ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}"><div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out {$notificationSettings.project ? 'translate-x-6' : ''}"/></button></div>
           <div class="flex items-center justify-between"><div><p class="font-semibold">Wallet Transactions</p><p class="text-sm text-brand-text-secondary">Alerts for any activity in your wallets.</p></div><button on:click={() => handleNotificationToggle('wallet')} class="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors {$notificationSettings.wallet ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}"><div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out {$notificationSettings.wallet ? 'translate-x-6' : ''}"/></button></div>
        </div>
    </Card>

    <Card>
        <h3 class="text-xl font-bold mb-6 flex items-center"><ShieldCheck class="h-6 w-6 mr-3 text-brand-primary" />Privacy Settings</h3>
        <p class="text-sm text-brand-text-secondary mb-6">These settings control what personal information other members in your communities and estates can see.</p>
        <div class="space-y-6">
           <div class="flex items-center justify-between"><div><p class="font-semibold">Make Phone Number Public</p></div><button on:click={() => handlePrivacyToggle('isPhoneNumberPublic')} class="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors {$privacySettings.isPhoneNumberPublic ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}"><div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out {$privacySettings.isPhoneNumberPublic ? 'translate-x-6' : ''}"/></button></div>
           <div class="flex items-center justify-between"><div><p class="font-semibold">Make Address Public</p></div><button on:click={() => handlePrivacyToggle('isAddressPublic')} class="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors {$privacySettings.isAddressPublic ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}"><div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out {$privacySettings.isAddressPublic ? 'translate-x-6' : ''}"/></button></div>
           <div class="flex items-center justify-between"><div><p class="font-semibold">Make Birth Year Public</p></div><button on:click={() => handlePrivacyToggle('isBirthYearPublic')} class="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors {$privacySettings.isBirthYearPublic ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}"><div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out {$privacySettings.isBirthYearPublic ? 'translate-x-6' : ''}"/></button></div>
            <div>
                <p class="font-semibold mb-2">Messaging Privacy</p>
                <div class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                    <Button on:click={() => $privacySettings.messagePrivacy = 'anyone'} variant={$privacySettings.messagePrivacy === 'anyone' ? 'primary' : 'secondary'} class="w-full">Anyone</Button>
                    <Button on:click={() => $privacySettings.messagePrivacy = 'members_only'} variant={$privacySettings.messagePrivacy === 'members_only' ? 'primary' : 'secondary'} class="w-full">Members Only</Button>
                </div>
            </div>
        </div>
    </Card>

    <Card>
        <h3 class="text-xl font-bold mb-6 flex items-center">
            <Language class="h-6 w-6 mr-3 text-brand-primary"/>
            Language & Region
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-brand-text-secondary mb-1">Language</label>
                <select class="w-full p-2 border rounded-md bg-brand-surface dark:bg-dark-surface border-brand-border">
                    <option>English (United States)</option>
                    <option>English (United Kingdom)</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-brand-text-secondary mb-1">Time Zone</label>
                <select class="w-full p-2 border rounded-md bg-brand-surface dark:bg-dark-surface border-brand-border">
                    <option>(GMT+01:00) West Africa Time</option>
                    <option>(GMT+00:00) Greenwich Mean Time</option>
                </select>
            </div>
        </div>
    </Card>
</div>
