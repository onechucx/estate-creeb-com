<script lang="ts">
    import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from 'heroicons-svelte/24/outline';
    import { createEventDispatcher, onMount } from 'svelte';
    import type { ToastMessage } from '$lib/types';

    export let message: ToastMessage | null = null;

    const dispatch = createEventDispatcher();

    const iconMap = {
        success: CheckCircleIcon,
        error: XCircleIcon,
        info: InformationCircleIcon
    } as const;

    onMount(() => {
        if (!message) return;
        const timer = setTimeout(() => dispatch('dismiss'), 5000);
        return () => clearTimeout(timer);
    });
</script>

{#if message}
    <div class="fixed top-5 right-5 bg-brand-surface dark:bg-dark-surface shadow-lg rounded-lg p-4 flex items-center z-[100] animate-fade-in-down border border-brand-border dark:border-dark-border" role="status" aria-live="polite">
    <svelte:component this={iconMap[message.type] ?? InformationCircleIcon} class={`h-6 w-6 ${message.type === 'success' ? 'text-green-500' : message.type === 'error' ? 'text-red-500' : 'text-blue-500'}`} aria-hidden="true" />
        <p class="ml-3 font-medium text-brand-text-primary dark:text-brand-text-primary">{message.message}</p>
    <button type="button" aria-label="Dismiss toast" on:click={() => dispatch('dismiss')} class="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">&times;</button>
    </div>
{/if}

