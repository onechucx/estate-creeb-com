<script lang="ts">
    import Card from '$lib/components/common/Card.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import { QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, PhoneIcon, EnvelopeIcon, DocumentTextIcon, ChevronDownIcon } from 'heroicons-svelte/24/outline';

    let selectedCategory = '';
    let message = '';
    let contactMethod = 'email';
    
    const supportCategories = [
        'General Questions',
        'Property Listings',
        'Account & Billing',
        'Technical Issues',
        'Partnership Inquiries',
        'Other'
    ];

    const faqs = [
        {
            question: 'How do I list my property?',
            answer: 'To list your property, navigate to "My Listings" and click "Create Listing". Fill in all required details including photos, description, and pricing information.'
        },
        {
            question: 'What are the listing fees?',
            answer: 'Basic listings are free for up to 3 properties. Premium features and additional listings have monthly subscription fees starting from ₦5,000.'
        },
        {
            question: 'How do I contact interested buyers?',
            answer: 'All inquiries come through our secure messaging system. You\'ll receive notifications and can respond directly through your inbox.'
        },
        {
            question: 'Can I edit my listing after publishing?',
            answer: 'Yes, you can edit your listings anytime from the "My Listings" section. Changes are updated immediately on the platform.'
        }
    ];

    let openFaq = -1;

    function toggleFaq(index: number) {
        openFaq = openFaq === index ? -1 : index;
    }

    function handleSubmit() {
        if (!selectedCategory || !message.trim()) {
            alert('Please fill in all required fields.');
            return;
        }
        // Handle form submission
        console.log('Support request submitted:', { selectedCategory, message, contactMethod });
        alert('Your support request has been submitted. We\'ll get back to you within 24 hours.');
        // Reset form
        selectedCategory = '';
        message = '';
    }
</script>

<main class="p-4 sm:p-6">
    <!-- Page Header -->
    <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-brand-text-primary">Support Center</h1>
        <p class="text-lg text-brand-text-secondary mt-2">Get help with your Creeb experience</p>
    </div>

    <div class="max-w-4xl mx-auto space-y-8">
        <!-- Quick Help Options -->
        <section aria-labelledby="quick-help-heading">
            <h2 id="quick-help-heading" class="text-xl font-semibold text-brand-text-primary mb-4">How can we help you?</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card class="text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <div class="p-6">
                        <QuestionMarkCircleIcon class="w-12 h-12 text-brand-primary mx-auto mb-4" aria-hidden="true" />
                        <h3 class="font-semibold text-brand-text-primary mb-2">Browse FAQs</h3>
                        <p class="text-sm text-brand-text-secondary">Find quick answers to common questions</p>
                    </div>
                </Card>
                <Card class="text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <div class="p-6">
                        <ChatBubbleLeftRightIcon class="w-12 h-12 text-brand-primary mx-auto mb-4" aria-hidden="true" />
                        <h3 class="font-semibold text-brand-text-primary mb-2">Live Chat</h3>
                        <p class="text-sm text-brand-text-secondary">Chat with our support team</p>
                    </div>
                </Card>
                <Card class="text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <div class="p-6">
                        <DocumentTextIcon class="w-12 h-12 text-brand-primary mx-auto mb-4" aria-hidden="true" />
                        <h3 class="font-semibold text-brand-text-primary mb-2">User Guide</h3>
                        <p class="text-sm text-brand-text-secondary">Learn how to use all features</p>
                    </div>
                </Card>
            </div>
        </section>

        <!-- FAQ Section -->
        <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" class="text-xl font-semibold text-brand-text-primary mb-4">Frequently Asked Questions</h2>
            <Card>
                <div class="p-6">
                    <div class="space-y-4">
                        {#each faqs as faq, index}
                            <div class="border-b border-brand-border dark:border-dark-border last:border-b-0 pb-4 last:pb-0">
                                <button
                                    type="button"
                                    class="w-full flex items-center justify-between text-left py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded"
                                    aria-expanded={openFaq === index}
                                    aria-controls="faq-answer-{index}"
                                    on:click={() => toggleFaq(index)}
                                    on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(index) } }}
                                >
                                    <h3 class="font-medium text-brand-text-primary pr-4">{faq.question}</h3>
                                    <ChevronDownIcon 
                                        class="w-5 h-5 text-brand-text-secondary transition-transform duration-200 {openFaq === index ? 'rotate-180' : ''}" 
                                        aria-hidden="true" 
                                    />
                                </button>
                                {#if openFaq === index}
                                    <div 
                                        id="faq-answer-{index}" 
                                        class="mt-3 text-sm text-brand-text-secondary"
                                        role="region"
                                        aria-labelledby="faq-question-{index}"
                                    >
                                        {faq.answer}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        </section>

        <!-- Contact Form -->
        <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" class="text-xl font-semibold text-brand-text-primary mb-4">Contact Support</h2>
            <Card>
                <form on:submit|preventDefault={handleSubmit} class="p-6 space-y-6">
                    <div>
                        <label for="category" class="block text-sm font-medium text-brand-text-secondary mb-2">
                            Category <span class="text-red-500" aria-label="required">*</span>
                        </label>
                        <select
                            id="category"
                            bind:value={selectedCategory}
                            required
                            class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            aria-describedby="category-help"
                        >
                            <option value="">Select a category</option>
                            {#each supportCategories as category}
                                <option value={category}>{category}</option>
                            {/each}
                        </select>
                        <p id="category-help" class="text-xs text-brand-text-secondary mt-1">
                            Choose the category that best describes your issue
                        </p>
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium text-brand-text-secondary mb-2">
                            Message <span class="text-red-500" aria-label="required">*</span>
                        </label>
                        <textarea
                            id="message"
                            bind:value={message}
                            required
                            rows="6"
                            placeholder="Please describe your issue or question in detail..."
                            class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary resize-vertical"
                            aria-describedby="message-help"
                        ></textarea>
                        <p id="message-help" class="text-xs text-brand-text-secondary mt-1">
                            Provide as much detail as possible to help us assist you better
                        </p>
                    </div>

                    <fieldset>
                        <legend class="block text-sm font-medium text-brand-text-secondary mb-3">Preferred Contact Method</legend>
                        <div class="space-y-2">
                            <label class="flex items-center">
                                <input
                                    type="radio"
                                    name="contactMethod"
                                    value="email"
                                    bind:group={contactMethod}
                                    class="text-brand-primary focus:ring-brand-primary"
                                />
                                <span class="ml-2 text-sm text-brand-text-primary">Email</span>
                            </label>
                            <label class="flex items-center">
                                <input
                                    type="radio"
                                    name="contactMethod"
                                    value="phone"
                                    bind:group={contactMethod}
                                    class="text-brand-primary focus:ring-brand-primary"
                                />
                                <span class="ml-2 text-sm text-brand-text-primary">Phone</span>
                            </label>
                        </div>
                    </fieldset>

                    <div class="flex items-center justify-between pt-4 border-t border-brand-border dark:border-dark-border">
                        <p class="text-sm text-brand-text-secondary">
                            We typically respond within 24 hours
                        </p>
                        <Button 
                            type="submit" 
                            variant="primary"
                            aria-label="Submit support request"
                        >
                            Send Message
                        </Button>
                    </div>
                </form>
            </Card>
        </section>

        <!-- Contact Information -->
        <section aria-labelledby="contact-info-heading">
            <h2 id="contact-info-heading" class="text-xl font-semibold text-brand-text-primary mb-4">Other Ways to Reach Us</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <div class="p-6 text-center">
                        <EnvelopeIcon class="w-8 h-8 text-brand-primary mx-auto mb-3" aria-hidden="true" />
                        <h3 class="font-semibold text-brand-text-primary mb-2">Email Support</h3>
                        <p class="text-sm text-brand-text-secondary mb-3">Get help via email</p>
                        <a 
                            href="mailto:support@creeb.com" 
                            class="text-brand-primary hover:underline focus:underline focus:outline-none"
                        >
                            support@creeb.com
                        </a>
                    </div>
                </Card>
                <Card>
                    <div class="p-6 text-center">
                        <PhoneIcon class="w-8 h-8 text-brand-primary mx-auto mb-3" aria-hidden="true" />
                        <h3 class="font-semibold text-brand-text-primary mb-2">Phone Support</h3>
                        <p class="text-sm text-brand-text-secondary mb-3">Available Mon-Fri, 9AM-6PM WAT</p>
                        <a 
                            href="tel:+2348012345678" 
                            class="text-brand-primary hover:underline focus:underline focus:outline-none"
                        >
                            +234 801 234 5678
                        </a>
                    </div>
                </Card>
            </div>
        </section>
    </div>
</main>
