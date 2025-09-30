<script lang="ts">
    import {
        HomeIcon,
        ChartPieIcon,
        UsersIcon,
        CurrencyDollarIcon,
        UserCircleIcon,
        Cog6ToothIcon,
        InboxIcon,
        BuildingStorefrontIcon,
        BuildingLibraryIcon,
        ShieldCheckIcon,
        PlusCircleIcon,
        EnvelopeIcon
    } from 'heroicons-svelte/24/outline';
    import { activeView, userRole, userSubscriptions } from '$lib/stores';
    import type { AppView, UserRole as URole, UserSubscriptions as USubs } from '$lib/types';

    let active: AppView = 'DASHBOARD';
    let role: URole = 'User';
    let subs: USubs = { community: true, estate: false };

    activeView.subscribe((value) => (active = value));
    userRole.subscribe((value) => (role = value));
    userSubscriptions.subscribe((value) => (subs = value));

    type NavItem = { view: AppView; label: string; icon: any; roles: URole[] };

    const navItems: NavItem[] = [
        { view: 'DASHBOARD', label: 'Dashboard', icon: HomeIcon, roles: ['User', 'Partner', 'Administrator'] },
        { view: 'ESTATE', label: 'My Estates', icon: BuildingLibraryIcon, roles: ['User', 'Partner', 'Administrator'] },
        { view: 'COMMUNITY', label: 'Community', icon: UsersIcon, roles: ['User', 'Partner', 'Administrator'] },
        { view: 'PROFILE', label: 'Profile', icon: UserCircleIcon, roles: ['User', 'Partner', 'Administrator'] },
        { view: 'WALLETS', label: 'Wallets', icon: CurrencyDollarIcon, roles: ['User', 'Partner'] },
        { view: 'INBOX', label: 'Inbox', icon: EnvelopeIcon, roles: ['User', 'Partner', 'Administrator'] },
        { view: 'MARKETPLACE', label: 'Marketplace', icon: BuildingStorefrontIcon, roles: ['User', 'Partner'] },
        { view: 'SETTINGS', label: 'Settings', icon: Cog6ToothIcon, roles: ['User', 'Partner', 'Administrator'] },
        { view: 'SUPPORT', label: 'Support', icon: InboxIcon, roles: ['User', 'Partner', 'Administrator'] }
    ];

    const actionNavItems: NavItem[] = [{ view: 'CREATE_HUB', label: 'Create New...', icon: PlusCircleIcon, roles: ['User', 'Partner', 'Administrator'] }];
    const adminNavItems: NavItem[] = [{ view: 'ADMIN_PANEL', label: 'Administrator', icon: ChartPieIcon, roles: ['Administrator'] }];

    function setActiveView(view: AppView) {
        activeView.set(view);
    }

    $: visibleNavItems = navItems.filter((item) => item.roles.includes(role));
    $: visibleActionNavItems = actionNavItems.filter((item) => item.roles.includes(role));
    $: visibleAdminNavItems = adminNavItems.filter((item) => item.roles.includes(role));

    function itemClass(isActive: boolean) {
        return isActive
            ? 'flex items-center p-3 my-1 rounded-lg transition-colors duration-200 bg-brand-primary dark:bg-dark-primary text-white shadow-lg cursor-pointer'
            : 'flex items-center p-3 my-1 rounded-lg transition-colors duration-200 text-gray-500 dark:text-dark-text-secondary hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-brand-primary dark:hover:text-dark-text-primary cursor-pointer';
    }

    function actionItemClass(isDisabled: boolean) {
        return isDisabled
            ? 'flex items-center p-3 my-1 rounded-lg transition-colors duration-200 text-brand-primary dark:text-dark-primary bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 font-bold border-2 border-dashed border-blue-200 dark:border-gray-600 opacity-50 cursor-not-allowed'
            : 'flex items-center p-3 my-1 rounded-lg transition-colors duration-200 text-brand-primary dark:text-dark-primary bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 font-bold border-2 border-dashed border-blue-200 dark:border-gray-600 cursor-pointer';
    }
</script>

<aside class="w-64 bg-brand-surface dark:bg-dark-surface flex-shrink-0 p-4 border-r border-brand-border dark:border-dark-border flex flex-col">
    <div class="flex items-center mb-10 p-2">
        <svg aria-hidden="true" focusable="false" class="h-10 w-10 text-brand-primary dark:text-dark-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
        <h1 class="text-2xl font-bold text-brand-primary dark:text-dark-text-primary ml-2">Creeb</h1>
    </div>
    <nav class="flex-1" aria-label="Main navigation">
        <ul class="space-y-1">
            {#each visibleNavItems as item}
                {@const isActive = active === item.view}
                <li>
                    <button
                        type="button"
                        class={itemClass(isActive)}
                        on:click={() => setActiveView(item.view)}
                        aria-pressed={isActive}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        <svelte:component this={item.icon} class="h-6 w-6 mr-4" aria-hidden="true" />
                        <span class="font-medium">{item.label}</span>
                    </button>
                </li>
            {/each}
        </ul>

        {#if visibleActionNavItems.length > 0}
            <hr class="my-6 border-brand-border dark:border-dark-border" />
            <ul class="space-y-1">
                {#each visibleActionNavItems as item}
                    {@const isDisabled = item.view === 'CREATE_HUB' && role !== 'Administrator' && !(subs.community || subs.estate)}
                    <li>
                        <button
                            type="button"
                            class={actionItemClass(isDisabled)}
                            on:click={!isDisabled ? () => setActiveView(item.view) : undefined}
                            title={isDisabled ? 'An active subscription is required for this feature.' : ''}
                            aria-disabled={isDisabled}
                        >
                            <svelte:component this={item.icon} class="h-6 w-6 mr-4" />
                            <span class="font-medium">{item.label}</span>
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}

        {#if visibleAdminNavItems.length > 0}
            <hr class="my-6 border-brand-border dark:border-dark-border" />
            <ul class="space-y-1">
                {#each visibleAdminNavItems as item}
                    {@const isActive = active === item.view}
                    <li>
                        <button type="button" class={itemClass(isActive)} on:click={() => setActiveView(item.view)} aria-pressed={isActive}>
                            <svelte:component this={item.icon} class="h-6 w-6 mr-4" />
                            <span class="font-medium">{item.label}</span>
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </nav>
</aside>
 
