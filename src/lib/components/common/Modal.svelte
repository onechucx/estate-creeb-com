<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    
    export let open: boolean = false;
    export let title: string = '';
    export let closeOnEscape: boolean = true;
    export let closeOnBackdrop: boolean = true;
    
    const dispatch = createEventDispatcher();
    let modalElement: HTMLElement;
    let previousActiveElement: HTMLElement | null = null;

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape' && closeOnEscape) {
            close();
        }
        
        // Trap focus within modal
        if (event.key === 'Tab' && modalElement) {
            const focusableElements = modalElement.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement?.focus();
                }
            }
        }
    }

    function handleBackdropClick(event: MouseEvent) {
        if (closeOnBackdrop && event.target === event.currentTarget) {
            close();
        }
    }

    function close() {
        dispatch('close');
    }

    // Focus management
    $: if (open) {
        previousActiveElement = document.activeElement as HTMLElement;
        // Wait for DOM update then focus first focusable element
        setTimeout(() => {
            const firstFocusable = modalElement?.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) as HTMLElement;
            firstFocusable?.focus();
        }, 100);
    } else if (previousActiveElement) {
        previousActiveElement.focus();
        previousActiveElement = null;
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
    <!-- Backdrop -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        on:click={handleBackdropClick}
        on:keydown|preventDefault
    >
        <!-- Modal Container -->
        <div 
            bind:this={modalElement}
            class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            role="document"
        >
            <!-- Modal Header -->
            {#if title}
                <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <h2 id="modal-title" class="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                </div>
            {/if}
            
            <!-- Modal Content -->
            <div class={title ? '' : 'p-6'}>
                <slot />
            </div>
        </div>
    </div>
{/if}
