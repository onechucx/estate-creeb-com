<script lang="ts">
    type ButtonVariant = 'primary' | 'secondary' | 'danger';

    export let variant: ButtonVariant = 'primary';
    export let type: 'button' | 'submit' | 'reset' = 'button';
    export let disabled: boolean = false;
    export let title: string | undefined = undefined;
    export let form: string | undefined = undefined;
    export let className: string = '';

    const baseClasses =
        'px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses: Record<ButtonVariant, string> = {
        primary:
            'bg-brand-primary text-white hover:bg-blue-800 focus:ring-brand-primary dark:bg-dark-primary dark:hover:bg-blue-500 dark:focus:ring-blue-400',
        secondary:
            'bg-gray-200 text-brand-text-primary hover:bg-gray-300 focus:ring-gray-400 dark:bg-dark-surface dark:text-dark-text-primary dark:hover:bg-gray-700 dark:focus:ring-gray-500 border border-gray-300 dark:border-gray-600',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    };

    let finalClasses: string;
    // Merge any `class` passed via the component's attributes with the computed classes
    $: extraClass = ($$restProps && ($$restProps as any).class) || '';
    $: finalClasses = `${baseClasses} ${variantClasses[variant]} ${className} ${extraClass}`.trim();
    // Build rest props without `class` so we don't accidentally duplicate the attribute
    $: restProps = (() => {
        const { class: _cls, ...r } = $$restProps as any;
        return r;
    })();
</script>

<button {type} class={finalClasses} {disabled} {title} {form} {...restProps}>
    <slot />
</button>
