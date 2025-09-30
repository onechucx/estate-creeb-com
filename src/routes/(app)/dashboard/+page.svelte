<script lang="ts">
    import Dashboard from '$lib/components/Dashboard.svelte';
    import { activeView } from '$lib/stores';
</script>

<Dashboard on:setactiveview={(e) => activeView.set(e.detail)} />

