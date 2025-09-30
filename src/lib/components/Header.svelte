<script lang="ts">
    import {
        BellIcon,
        MagnifyingGlassIcon,
        ChevronDownIcon,
        ArrowRightOnRectangleIcon
    } from 'heroicons-svelte/24/outline';
    import { userRole, activeView, isAuthenticated } from '$lib/stores';
    import type { UserRole } from '$lib/types';
    import { goto } from '$app/navigation';

    let isDropdownOpen = false;
    let role: UserRole = 'User';

    userRole.subscribe((value) => (role = value));

    const pageTitles: { [key: string]: string } = {
        DASHBOARD: 'Dashboard',
        ESTATE: 'My Estates',
        COMMUNITY: 'Community',
        PROFILE: 'Profile',
        WALLETS: 'Wallets',
        INBOX: 'Inbox',
        MARKETPLACE: 'Marketplace',
        SETTINGS: 'Settings',
        SUPPORT: 'Support',
        ADMIN_PANEL: 'Administrator',
        CREATE_HUB: 'Create New Hub'
    };

    let pageTitle = 'Creeb';
    activeView.subscribe((value) => (pageTitle = pageTitles[value] || 'Creeb'));

    function setUserRole(r: UserRole) {
        userRole.set(r);
        isDropdownOpen = false;
    }

    function onLogout() {
        isAuthenticated.set(false);
        localStorage.removeItem('creeb_user_session');
        goto('/');
    }
</script>

<header class="bg-brand-surface dark:bg-dark-surface p-4 border-b border-brand-border dark:border-dark-border flex items-center justify-between">
    <h1 class="text-2xl font-bold text-brand-text-primary dark:text-dark-text-primary">{pageTitle}</h1>

    <div class="flex items-center space-x-6">
        <div class="relative">
            <MagnifyingGlassIcon aria-hidden="true" class="h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2" />
            <input
                type="text"
                placeholder="Search..."
                aria-label="Search listings"
                class="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 rounded-lg text-brand-text-primary dark:text-dark-text-primary placeholder:text-brand-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-primary"
            />
        </div>

            <button type="button" aria-label="Notifications" title="Notifications" class="relative text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-dark-primary">
            <BellIcon class="h-6 w-6" />
            <span aria-hidden="true" class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        <div class="relative">
            <button
                id="user-menu-toggle"
                type="button"
                class="flex items-center space-x-3"
                on:click={() => (isDropdownOpen = !isDropdownOpen)}
                on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); isDropdownOpen = !isDropdownOpen } }}
                aria-haspopup="true"
                aria-controls="user-menu"
                aria-expanded={isDropdownOpen}
                aria-label="Toggle user menu"
                title="Toggle user menu"
            >
                <img src={`https://picsum.photos/seed/${role}/40/40`} alt="User Avatar" class="h-10 w-10 rounded-full" />
                <div>
                    <p class="font-semibold text-sm text-brand-text-primary dark:text-dark-text-primary">John Doe</p>
                    <div class="flex items-center">
                        <span class="text-xs text-gray-500 dark:text-dark-text-secondary">{role}</span>
                        <ChevronDownIcon class={`h-3 w-3 text-brand-text-secondary dark:text-dark-text-secondary ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>
            </button>
            {#if isDropdownOpen}
                <div id="user-menu" class="absolute right-0 mt-2 w-48 bg-brand-surface dark:bg-dark-surface rounded-md shadow-lg py-1 z-50 border border-brand-border dark:border-dark-border">
                    <div class="px-4 py-2">
                        <label for="switch-role" class="text-xs text-gray-500 dark:text-dark-text-secondary">Switch Role</label>
                            <select id="switch-role" bind:value={role} on:change={() => setUserRole(role)} class="w-full text-sm bg-transparent focus:outline-none dark:text-dark-text-primary">
                            <option value={'User'}>User</option>
                            <option value={'Partner'}>Partner</option>
                            <option value={'Administrator'}>Administrator</option>
                        </select>
                    </div>
                    <div class="border-t border-brand-border dark:border-dark-border" />
                    <button type="button" on:click={onLogout} aria-label="Logout" class="w-full text-left px-4 py-2 text-sm text-brand-text-primary dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                        <ArrowRightOnRectangleIcon class="h-5 w-5 mr-2 text-gray-500 dark:text-dark-text-secondary" />
                        Logout
                    </button>
                </div>
            {/if}
        </div>
    </div>
</header>
 
