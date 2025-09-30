<script lang="ts">
    import Button from '$lib/components/common/Button.svelte';
    export let onLoginClick: () => void;
</script>

<header class="bg-brand-surface dark:bg-dark-surface p-4 border-b border-brand-border dark:border-dark-border">
    <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center">
            <svg class="h-10 w-10 text-brand-primary dark:text-dark-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <h1 class="text-2xl font-bold text-brand-primary dark:text-dark-text-primary ml-2">Creeb</h1>
        </div>
        <div class="flex items-center space-x-2">
            <Button variant="secondary" on:click={onLoginClick}>Login</Button>
            <Button variant="primary">Sign Up</Button>
        </div>
    </div>
</header>
 
