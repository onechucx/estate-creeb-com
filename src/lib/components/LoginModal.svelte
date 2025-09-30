<script lang="ts">
    import { XMarkIcon } from 'heroicons-svelte/24/outline';
    import Button from './common/Button.svelte';
    import Card from './common/Card.svelte';

    export let onLogin: () => void;
    export let onClose: () => void;

    let email = 'user@creeb.vip';
    let password = 'password';
    let error = '';

    const handleSubmit = () => {
        error = '';

        if (email === 'user@creeb.vip' && password === 'password') {
            onLogin();
        } else {
            error = 'Invalid email or password.';
        }
    };
</script>

<div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <Card class="w-full max-w-md relative">
        <button
            on:click={onClose}
            class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close login dialog"
        >
            <XMarkIcon class="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        <div class="flex flex-col items-center mb-6">
            <svg
                class="h-10 w-10 text-brand-primary dark:text-dark-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                />
            </svg>
            <h2 class="text-2xl font-bold text-center text-brand-text-primary dark:text-dark-text-primary mt-3">
                Welcome Back!
            </h2>
            <p class="text-center text-brand-text-secondary dark:text-dark-text-secondary">
                Sign in to continue.
            </p>
        </div>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
                <label for="email-modal" class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Email</label>
                <input
                    id="email-modal"
                    type="email"
                    required
                    bind:value={email}
                    class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
            </div>
            <div>
                <label for="password-modal" class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Password</label>
                <input
                    id="password-modal"
                    type="password"
                    required
                    bind:value={password}
                    class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
            </div>
            {#if error}
                <p class="text-sm text-red-600 text-center">{error}</p>
            {/if}
            <div>
                <Button type="submit" class="w-full justify-center">Sign in</Button>
            </div>
        </form>
    </Card>
</div>
