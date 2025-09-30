<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  export let open = false;
  export let title = 'Listing details';

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  // close on ESC
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }

  let dialogEl: HTMLDivElement | null = null;

  // attach a window-level keydown listener while open and focus the dialog container
  $: {
    if (open) {
      window.addEventListener('keydown', onKeyDown);
      // focus the dialog container so it can receive keyboard interactions if needed
      setTimeout(() => dialogEl?.focus(), 0);
    } else {
      window.removeEventListener('keydown', onKeyDown);
    }
  }

  onDestroy(() => {
    window.removeEventListener('keydown', onKeyDown);
  });
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center">
  <button type="button" class="fixed inset-0 bg-black/50" on:click={close} aria-label="Close dialog overlay" tabindex="-1"></button>
    <div bind:this={dialogEl} class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-3xl w-full mx-4" role="dialog" aria-modal="true" aria-label={title} tabindex="-1">
      <div class="flex items-start justify-between">
        <h2 class="text-xl font-semibold">{title}</h2>
        <button type="button" aria-label="Close dialog" on:click={close} class="ml-4">×</button>
      </div>
      <div class="mt-4">
        <!-- Listing details content placeholder -->
        <p class="text-sm text-gray-600 dark:text-gray-300">Details about the listing will appear here.</p>
      </div>
    </div>
  </div>
{/if}
