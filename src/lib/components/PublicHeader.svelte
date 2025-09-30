<script lang="ts">
    import Button from '$lib/components/common/Button.svelte';
    import { Bars3Icon, XMarkIcon, HomeIcon, MagnifyingGlassIcon, UsersIcon, QuestionMarkCircleIcon } from 'heroicons-svelte/24/outline';
    export let onLoginClick: () => void;

    let mobileMenuOpen = false;

    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' && mobileMenuOpen) {
            mobileMenuOpen = false;
        }
    }

    function closeMobileMenu() {
        mobileMenuOpen = false;
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<header class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700" role="banner">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <!-- Logo and Brand -->
            <div class="flex items-center">
                <a href="/" class="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg p-1">
                    <svg aria-hidden="true" focusable="false" class="h-10 w-10 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    <h1 class="text-2xl font-bold text-brand-primary ml-3">Creeb</h1>
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
                <a href="/" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary rounded px-2 py-1">
                    <HomeIcon class="w-4 h-4 mr-2" aria-hidden="true" />
                    Home
                </a>
                <a href="/marketplace" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary rounded px-2 py-1">
                    <MagnifyingGlassIcon class="w-4 h-4 mr-2" aria-hidden="true" />
                    Browse Properties
                </a>
                <a href="/community" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary rounded px-2 py-1">
                    <UsersIcon class="w-4 h-4 mr-2" aria-hidden="true" />
                    Community
                </a>
                <a href="/support" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary rounded px-2 py-1">
                    <QuestionMarkCircleIcon class="w-4 h-4 mr-2" aria-hidden="true" />
                    Support
                </a>
            </nav>

            <!-- Desktop Auth Buttons -->
            <div class="hidden md:flex items-center space-x-3">
                <Button 
                    type="button" 
                    variant="secondary" 
                    on:click={onLoginClick} 
                    aria-label="Open login dialog"
                >
                    Login
                </Button>
                <Button 
                    type="button" 
                    variant="primary" 
                    aria-label="Create new account"
                >
                    Sign Up
                </Button>
            </div>

            <!-- Mobile Menu Button -->
            <button
                type="button"
                class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                on:click={toggleMobileMenu}
                on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMobileMenu() } }}
            >
                {#if mobileMenuOpen}
                    <XMarkIcon class="w-6 h-6" aria-hidden="true" />
                {:else}
                    <Bars3Icon class="w-6 h-6" aria-hidden="true" />
                {/if}
            </button>
        </div>

        <!-- Mobile Menu -->
        {#if mobileMenuOpen}
            <div 
                id="mobile-menu" 
                class="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50"
                role="menu"
                aria-labelledby="mobile-menu-button"
            >
                <div class="px-4 py-6 space-y-4">
                    <!-- Mobile Navigation Links -->
                    <nav class="space-y-2" role="navigation" aria-label="Mobile navigation">
                        <a 
                            href="/" 
                            class="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            on:click={closeMobileMenu}
                            role="menuitem"
                        >
                            <HomeIcon class="w-5 h-5 mr-3" aria-hidden="true" />
                            Home
                        </a>
                        <a 
                            href="/marketplace" 
                            class="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            on:click={closeMobileMenu}
                            role="menuitem"
                        >
                            <MagnifyingGlassIcon class="w-5 h-5 mr-3" aria-hidden="true" />
                            Browse Properties
                        </a>
                        <a 
                            href="/community" 
                            class="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            on:click={closeMobileMenu}
                            role="menuitem"
                        >
                            <UsersIcon class="w-5 h-5 mr-3" aria-hidden="true" />
                            Community
                        </a>
                        <a 
                            href="/support" 
                            class="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            on:click={closeMobileMenu}
                            role="menuitem"
                        >
                            <QuestionMarkCircleIcon class="w-5 h-5 mr-3" aria-hidden="true" />
                            Support
                        </a>
                    </nav>

                    <!-- Mobile Auth Buttons -->
                    <div class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                        <Button 
                            type="button" 
                            variant="secondary" 
                            class="w-full justify-center"
                            on:click={() => { onLoginClick(); closeMobileMenu(); }}
                            aria-label="Open login dialog"
                        >
                            Login
                        </Button>
                        <Button 
                            type="button" 
                            variant="primary" 
                            class="w-full justify-center"
                            on:click={closeMobileMenu}
                            aria-label="Create new account"
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</header>
 
