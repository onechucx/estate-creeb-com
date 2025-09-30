<script lang="ts">
    export let className: string = '';
</script>

<div class={`bg-brand-surface dark:bg-dark-surface rounded-xl shadow-sm p-6 dark:border dark:border-dark-border ${className}`}>
    <slot />
</div>
