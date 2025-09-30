<script lang="ts">
    export let className: string = '';
    export let role: string | undefined = undefined;
    export let ariaLabel: string | undefined = undefined;
    export let ariaLabelledby: string | undefined = undefined;
    export let ariaDescribedby: string | undefined = undefined;
    export let tabindex: number | string | undefined = undefined;
</script>

<div 
    class={`bg-brand-surface dark:bg-dark-surface rounded-xl shadow-sm p-6 dark:border dark:border-dark-border ${className}`}
    {role}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    aria-describedby={ariaDescribedby}
    tabindex={tabindex !== undefined && tabindex >= 0 ? tabindex : undefined}
    {...$$restProps}
>
    <slot />
</div>
