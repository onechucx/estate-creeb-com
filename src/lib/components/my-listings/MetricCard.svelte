<script lang="ts">
  export let label: string;
  export let value: string | number;
  export let icon: any;
</script>

<div class="p-4 bg-brand-surface dark:bg-dark-surface rounded-lg shadow" role="region" aria-label={label}>
  <div class="flex items-center">
    {#if icon}
      <svelte:component this={icon} class="h-6 w-6 mr-3" aria-hidden="true" focusable="false" />
    {/if}
    <div>
      <div class="text-sm text-brand-text-secondary">{label}</div>
      <div class="font-bold text-xl">{value}</div>
    </div>
  </div>
</div>
