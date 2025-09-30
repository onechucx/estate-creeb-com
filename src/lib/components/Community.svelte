<script lang="ts">
    import Card from '$lib/components/common/Card.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import { UsersIcon, ChatBubbleLeftIcon, HeartIcon, ShareIcon, PlusIcon } from 'heroicons-svelte/24/outline';
    
    // Mock community data
    const communityStats = [
        { label: 'Active Members', value: '2,847', icon: UsersIcon },
        { label: 'Discussions', value: '156', icon: ChatBubbleLeftIcon },
        { label: 'This Week', value: '23', icon: PlusIcon }
    ];

    const discussions = [
        {
            id: 1,
            title: 'Best neighborhoods for young professionals in Lagos',
            author: 'Sarah Johnson',
            replies: 12,
            likes: 24,
            lastActivity: '2 hours ago',
            category: 'Housing Advice'
        },
        {
            id: 2,
            title: 'Property investment tips for beginners',
            author: 'Michael Chen',
            replies: 8,
            likes: 18,
            lastActivity: '5 hours ago',
            category: 'Investment'
        },
        {
            id: 3,
            title: 'Maintenance costs for high-rise apartments',
            author: 'Amara Okafor',
            replies: 15,
            likes: 31,
            lastActivity: '1 day ago',
            category: 'Maintenance'
        }
    ];

    function handleLike(discussionId: number) {
        // Handle like functionality
        console.log('Liked discussion:', discussionId);
    }

    function handleShare(discussionId: number) {
        // Handle share functionality
        console.log('Shared discussion:', discussionId);
    }
</script>

<main class="p-4 sm:p-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-brand-text-primary">Community</h1>
            <p class="text-lg text-brand-text-secondary mt-2">Connect with fellow property enthusiasts and experts.</p>
        </div>
        <Button 
            type="button" 
            variant="primary" 
            class="mt-4 sm:mt-0"
            aria-label="Start a new discussion"
        >
            <PlusIcon class="w-5 h-5 mr-2" aria-hidden="true" />
            Start Discussion
        </Button>
    </div>

    <!-- Community Stats -->
    <section aria-labelledby="stats-heading" class="mb-8">
        <h2 id="stats-heading" class="sr-only">Community Statistics</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {#each communityStats as stat}
                <Card class="text-center">
                    <div class="p-6">
                        <div class="flex justify-center mb-4">
                            <svelte:component this={stat.icon} class="w-8 h-8 text-brand-primary" aria-hidden="true" />
                        </div>
                        <div class="text-2xl font-bold text-brand-text-primary">{stat.value}</div>
                        <div class="text-sm text-brand-text-secondary mt-1">{stat.label}</div>
                    </div>
                </Card>
            {/each}
        </div>
    </section>

    <!-- Discussion Categories -->
    <section aria-labelledby="categories-heading" class="mb-8">
        <h2 id="categories-heading" class="text-xl font-semibold text-brand-text-primary mb-4">Popular Categories</h2>
        <div class="flex flex-wrap gap-3">
            {#each ['Housing Advice', 'Investment', 'Maintenance', 'Legal', 'Market Trends'] as category}
                <button 
                    type="button"
                    class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-brand-text-primary rounded-full hover:bg-brand-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                    aria-label="Filter discussions by {category}"
                >
                    {category}
                </button>
            {/each}
        </div>
    </section>

    <!-- Recent Discussions -->
    <section aria-labelledby="discussions-heading">
        <h2 id="discussions-heading" class="text-xl font-semibold text-brand-text-primary mb-4">Recent Discussions</h2>
        <div class="space-y-4">
            {#each discussions as discussion}
                <Card class="hover:shadow-lg transition-shadow duration-200">
                    <article class="p-6">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-2">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary">
                                        {discussion.category}
                                    </span>
                                    <span class="text-sm text-brand-text-secondary">{discussion.lastActivity}</span>
                                </div>
                                <h3 class="text-lg font-semibold text-brand-text-primary mb-2">
                                    <a 
                                        href="/community/discussion/{discussion.id}" 
                                        class="hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:underline"
                                        aria-describedby="discussion-{discussion.id}-meta"
                                    >
                                        {discussion.title}
                                    </a>
                                </h3>
                                <div id="discussion-{discussion.id}-meta" class="flex items-center space-x-4 text-sm text-brand-text-secondary">
                                    <span>by {discussion.author}</span>
                                    <span>{discussion.replies} replies</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between mt-4 pt-4 border-t border-brand-border dark:border-dark-border">
                            <div class="flex items-center space-x-4">
                                <button 
                                    type="button"
                                    class="flex items-center space-x-2 text-brand-text-secondary hover:text-brand-primary focus:text-brand-primary focus:outline-none"
                                    aria-label="Like discussion: {discussion.title}"
                                    on:click={() => handleLike(discussion.id)}
                                    on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleLike(discussion.id) } }}
                                >
                                    <HeartIcon class="w-4 h-4" aria-hidden="true" />
                                    <span>{discussion.likes}</span>
                                </button>
                                <button 
                                    type="button"
                                    class="flex items-center space-x-2 text-brand-text-secondary hover:text-brand-primary focus:text-brand-primary focus:outline-none"
                                    aria-label="Share discussion: {discussion.title}"
                                    on:click={() => handleShare(discussion.id)}
                                    on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleShare(discussion.id) } }}
                                >
                                    <ShareIcon class="w-4 h-4" aria-hidden="true" />
                                    <span>Share</span>
                                </button>
                            </div>
                            <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                aria-label="View discussion: {discussion.title}"
                            >
                                View Discussion
                            </Button>
                        </div>
                    </article>
                </Card>
            {/each}
        </div>
    </section>
</main>
