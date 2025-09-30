<script lang="ts">
    export let open: boolean = false;
    export let title: string = '';
</script>

{#if open}
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-2xl shadow-lg">
            <h3 class="text-lg font-bold mb-4">{title}</h3>
            <slot />
        </div>
    </div>
{/if}
