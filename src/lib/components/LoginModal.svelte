<script lang="ts">
    import Modal from './common/Modal.svelte';
    import Button from './common/Button.svelte';
    import { createEventDispatcher } from 'svelte';
    import { EyeIcon, EyeSlashIcon, XMarkIcon } from 'heroicons-svelte/24/outline';

    const dispatch = createEventDispatcher();

    let email = '';
    let password = '';
    let showPassword = false;
    let isLoading = false;
    let rememberMe = false;
    let isSignUp = false;
    let confirmPassword = '';
    let fullName = '';
    let errors: Record<string, string> = {};

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    function validateForm() {
        errors = {};
        
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (isSignUp) {
            if (!fullName.trim()) {
                errors.fullName = 'Full name is required';
            }
            if (!confirmPassword.trim()) {
                errors.confirmPassword = 'Please confirm your password';
            } else if (password !== confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
        }

        return Object.keys(errors).length === 0;
    }

    async function handleSubmit() {
        if (!validateForm()) return;

        isLoading = true;
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const eventType = isSignUp ? 'signup' : 'login';
            dispatch(eventType, { 
                email, 
                password, 
                fullName: isSignUp ? fullName : undefined,
                rememberMe 
            });
        } catch (error) {
            console.error('Authentication error:', error);
        } finally {
            isLoading = false;
        }
    }

    function handleClose() {
        dispatch('close');
    }

    function switchMode() {
        isSignUp = !isSignUp;
        errors = {};
        password = '';
        confirmPassword = '';
        fullName = '';
    }

    // Focus first input when modal opens
    let emailInput: HTMLInputElement;
    $: if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
    }
</script>

<Modal on:close={handleClose}>
    <div class="p-6" role="dialog" aria-labelledby="auth-title" aria-modal="true">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <h2 id="auth-title" class="text-2xl font-bold text-gray-900 dark:text-white">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <button
                type="button"
                class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg"
                on:click={handleClose}
                aria-label="Close login modal"
            >
                <XMarkIcon class="w-5 h-5" aria-hidden="true" />
            </button>
        </div>

        <!-- Form -->
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <!-- Full Name (Sign Up only) -->
            {#if isSignUp}
                <div>
                    <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name <span class="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        bind:value={fullName}
                        required={isSignUp}
                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        class:border-red-500={errors.fullName}
                        placeholder="Enter your full name"
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                    {#if errors.fullName}
                        <p id="fullName-error" class="mt-1 text-sm text-red-600" role="alert">
                            {errors.fullName}
                        </p>
                    {/if}
                </div>
            {/if}

            <!-- Email -->
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address <span class="text-red-500" aria-label="required">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    bind:this={emailInput}
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    class:border-red-500={errors.email}
                    placeholder="Enter your email"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {#if errors.email}
                    <p id="email-error" class="mt-1 text-sm text-red-600" role="alert">
                        {errors.email}
                    </p>
                {/if}
            </div>

            <!-- Password -->
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password <span class="text-red-500" aria-label="required">*</span>
                </label>
                <div class="relative">
                    {#if showPassword}
                        <input
                            id="password"
                            type="text"
                            bind:value={password}
                            required
                            class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            class:border-red-500={errors.password}
                            placeholder="Enter your password"
                            aria-describedby={errors.password ? 'password-error' : 'password-help'}
                        />
                    {:else}
                        <input
                            id="password"
                            type="password"
                            bind:value={password}
                            required
                            class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            class:border-red-500={errors.password}
                            placeholder="Enter your password"
                            aria-describedby={errors.password ? 'password-error' : 'password-help'}
                        />
                    {/if}
                    <button
                        type="button"
                        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded"
                        on:click={togglePasswordVisibility}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {#if showPassword}
                            <EyeSlashIcon class="w-5 h-5" aria-hidden="true" />
                        {:else}
                            <EyeIcon class="w-5 h-5" aria-hidden="true" />
                        {/if}
                    </button>
                </div>
                {#if errors.password}
                    <p id="password-error" class="mt-1 text-sm text-red-600" role="alert">
                        {errors.password}
                    </p>
                {:else if !isSignUp}
                    <p id="password-help" class="mt-1 text-sm text-gray-500">
                        Minimum 6 characters required
                    </p>
                {/if}
            </div>

            <!-- Confirm Password (Sign Up only) -->
            {#if isSignUp}
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm Password <span class="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        bind:value={confirmPassword}
                        required={isSignUp}
                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        class:border-red-500={errors.confirmPassword}
                        placeholder="Confirm your password"
                        aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                    />
                    {#if errors.confirmPassword}
                        <p id="confirmPassword-error" class="mt-1 text-sm text-red-600" role="alert">
                            {errors.confirmPassword}
                        </p>
                    {/if}
                </div>
            {/if}

            <!-- Remember Me (Login only) -->
            {#if !isSignUp}
                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <input
                            type="checkbox"
                            bind:checked={rememberMe}
                            class="rounded border-gray-300 text-brand-primary focus:ring-brand-primary focus:ring-2"
                        />
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Remember me
                        </span>
                    </label>
                    <button
                        type="button"
                        class="text-sm text-brand-primary hover:underline focus:underline focus:outline-none"
                        aria-label="Reset your password"
                    >
                        Forgot password?
                    </button>
                </div>
            {/if}

            <!-- Submit Button -->
            <Button
                type="submit"
                variant="primary"
                class="w-full py-3 text-lg"
                disabled={isLoading}
                aria-label={isSignUp ? 'Create your account' : 'Sign in to your account'}
            >
                {#if isLoading}
                    <span class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                {:else}
                    {isSignUp ? 'Create Account' : 'Sign In'}
                {/if}
            </Button>
        </form>

        <!-- Mode Switch -->
        <div class="mt-6 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
            <p class="text-sm text-gray-600 dark:text-gray-400">
                {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                <button
                    type="button"
                    class="text-brand-primary hover:underline focus:underline focus:outline-none font-medium ml-1"
                    on:click={switchMode}
                    aria-label={isSignUp ? 'Switch to login' : 'Switch to sign up'}
                >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </div>

        <!-- Terms (Sign Up only) -->
        {#if isSignUp}
            <div class="mt-4 text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    By creating an account, you agree to our 
                    <a href="/terms" class="text-brand-primary hover:underline focus:underline focus:outline-none">Terms of Service</a>
                    and 
                    <a href="/privacy" class="text-brand-primary hover:underline focus:underline focus:outline-none">Privacy Policy</a>
                </p>
            </div>
        {/if}
    </div>
</Modal>