<script lang="ts">
    import Card from '$lib/components/common/Card.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import {
        ArchiveBoxIcon as ArchiveBox,
        MagnifyingGlassIcon as MagnifyingGlass,
        PencilSquareIcon as PencilSquare,
        StarIcon as Star,
        TrashIcon as Trash
    } from 'heroicons-svelte/24/outline';
    import type { Message } from '$lib/types';

    let messages: Message[] = [
        {
            id: 'msg1',
            sender: 'Tunde Adebayo',
            subject: 'Re: Property Inquiry in Lekki',
            snippet: 'Thanks for the swift response. I would like to schedule a viewing...',
            avatar: '/placeholder.svg',
            timestamp: '2 hours ago',
            read: false,
            starred: true,
            labels: ['inquiry', 'lekki']
        },
        {
            id: 'msg2',
            sender: 'Creeb Updates',
            subject: 'New Feature: Boost Your Listings',
            snippet: 'You can now boost your property listings to reach a wider audience.',
            avatar: '/placeholder.svg',
            timestamp: 'Yesterday',
            read: false,
            starred: false,
            labels: ['update']
        },
        {
            id: 'msg3',
            sender: 'Jemima O.',
            subject: 'Investment Proposal',
            snippet: 'Hi, I have an investment proposal I would like to discuss with you.',
            avatar: '/placeholder.svg',
            timestamp: '3 days ago',
            read: true,
            starred: false,
            labels: ['proposal']
        },
        {
            id: 'msg4',
            sender: 'Admin',
            subject: 'Welcome to Creeb!',
            snippet: 'Welcome aboard! We are excited to have you with us. Here are some...',
            avatar: '/placeholder.svg',
            timestamp: '1 week ago',
            read: true,
            starred: false,
            labels: []
        }
    ];

    let selectedMessage = messages[0];
</script>

<div class="p-4 sm:p-6 h-full flex flex-col">
        <div class="flex-shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 class="text-2xl font-bold text-brand-text-primary mb-4 sm:mb-0">Inbox</h1>
        <Button type="button" aria-label="Compose message" title="Compose message">
            <PencilSquare class="w-5 h-5 mr-2" />
            Compose
        </Button>
    </div>

    <div class="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full">
        <!-- Message List -->
        <div class="md:col-span-1 lg:col-span-1 h-full">
            <Card class="h-full flex flex-col">
                <div class="p-4 border-b border-brand-border dark:border-dark-border">
                    <div class="relative">
                        <MagnifyingGlass
                            class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            aria-hidden="true"
                            focusable="false"
                        />
                        <input
                            type="text"
                            placeholder="Search mail"
                            aria-label="Search messages"
                            class="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary"
                        />
                    </div>
                </div>
                <div class="flex-grow overflow-y-auto">
                    <ul>
                        {#each messages as message (message.id)}
                            <li class="border-b border-brand-border dark:border-dark-border">
                                <button
                                    type="button"
                                    class="w-full text-left p-4 {selectedMessage.id === message.id
                                        ? 'bg-blue-50 dark:bg-blue-900/20'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}"
                                    on:click={() => (selectedMessage = message)}
                                    on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectedMessage = message } }}
                                    aria-pressed={selectedMessage.id === message.id}
                                    aria-label={`Open message from ${message.sender}: ${message.subject}`}
                                >
                                    <div class="flex justify-between items-start">
                                        <p class="font-semibold text-brand-text-primary">{message.sender}</p>
                                        {#if !message.read}
                                            <span class="w-2 h-2 bg-brand-primary rounded-full" aria-hidden="true"></span>
                                        {/if}
                                    </div>
                                    <p class="text-sm font-medium text-brand-text-primary truncate">
                                        {message.subject}
                                    </p>
                                    <p class="text-sm text-brand-text-secondary truncate">{message.snippet}</p>
                                    <p class="text-xs text-brand-text-secondary mt-1">{message.timestamp}</p>
                                </button>
                            </li>
                        {/each}
                    </ul>
                </div>
            </Card>
        </div>

        <!-- Message Detail -->
        <div class="md:col-span-2 lg:col-span-3 h-full">
            <Card class="h-full flex flex-col">
                {#if selectedMessage}
                    <div
                        class="flex-shrink-0 p-4 border-b border-brand-border dark:border-dark-border flex justify-between items-center"
                    >
                        <div>
                            <h2 class="text-lg font-bold text-brand-text-primary">
                                {selectedMessage.subject}
                            </h2>
                            <div class="flex items-center space-x-2 mt-1">
                                <img
                                    src={selectedMessage.avatar.replace('http://placeimg.com', 'https://loremflickr.com')}
                                    alt={selectedMessage.sender}
                                    class="w-8 h-8 rounded-full"
                                />
                                <div>
                                    <p class="text-sm font-semibold text-brand-text-primary">
                                        {selectedMessage.sender}
                                    </p>
                                    <p class="text-xs text-brand-text-secondary">to me</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <Button type="button" variant="ghost" aria-label="Star message">
                                <Star class="w-5 h-5" aria-hidden="true" />
                            </Button>
                            <Button type="button" variant="ghost" aria-label="Archive message">
                                <ArchiveBox class="w-5 h-5" aria-hidden="true" />
                            </Button>
                            <Button type="button" variant="ghost" class="text-red-500" aria-label="Delete message">
                                <Trash class="w-5 h-5" aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                    <div class="flex-grow p-6 overflow-y-auto prose dark:prose-invert max-w-none">
                        <p>{selectedMessage.snippet}</p>
                        <br />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <br />
                        <p>Regards,</p>
                        <p>{selectedMessage.sender}</p>
                    </div>
                    <div class="flex-shrink-0 p-4 border-t border-brand-border dark:border-dark-border">
                        <textarea
                            class="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-dark-border"
                            placeholder={"Reply to " + selectedMessage.sender}
                            rows="3"
                        ></textarea>
                        <div class="flex justify-end mt-2">
                            <Button type="button" aria-label={`Send reply to ${selectedMessage.sender}`}>Send Reply</Button>
                        </div>
                    </div>
                {:else}
                    <div class="flex-grow flex items-center justify-center">
                        <div class="text-center">
                            <p class="text-brand-text-secondary">Select a message to read</p>
                        </div>
                    </div>
                {/if}
            </Card>
        </div>
    </div>
</div>
