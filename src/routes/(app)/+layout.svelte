<script lang="ts">
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Header from '$lib/components/Header.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import type { ToastMessage } from '$lib/types';

    let toastMessage: ToastMessage | null = null;
    // simple example: show a toast on mount
    // toastMessage = { id: 't1', type: 'info', message: 'Welcome to Creeb Svelte' };
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <div class="flex">
        <Sidebar />
        <div class="flex-1">
            <Header />
            <main class="p-6">
                <slot />
            </main>
        </div>
    </div>
    <Toast message={toastMessage} />
</div>