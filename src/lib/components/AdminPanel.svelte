<script lang="ts">
  import Card from './common/Card.svelte';
  import Button from './common/Button.svelte';
  import RequestsManagement from './admin/RequestsManagement.svelte';
  import KYCManagement from './admin/KYCManagement.svelte';
  import GlobalAdsManagement from './admin/GlobalAdsManagement.svelte';
  import MarketplaceManagementPanel from './admin/MarketplaceManagementPanel.svelte';
  import SubscriptionManagement from './admin/SubscriptionManagement.svelte';

  export const userRole: string = 'User';
  export const showToast: (m: string, t?: string) => void = () => {};

  let activeTab: 'requests' | 'kyc' | 'global_ads' | 'marketplace' | 'subscriptions' = 'requests';
</script>

<div class="space-y-6">
  <div>
    <div class="border-b border-brand-border dark:border-dark-border">
      <nav class="-mb-px flex space-x-2 overflow-x-auto">
        <button on:click={() => (activeTab = 'requests')} class="px-4 py-2 font-semibold rounded-t-lg">Requests</button>
        <button on:click={() => (activeTab = 'kyc')} class="px-4 py-2 font-semibold rounded-t-lg">KYC Verification</button>
        <button on:click={() => (activeTab = 'subscriptions')} class="px-4 py-2 font-semibold rounded-t-lg">Subscriptions</button>
        <button on:click={() => (activeTab = 'global_ads')} class="px-4 py-2 font-semibold rounded-t-lg">Global Ads</button>
        <button on:click={() => (activeTab = 'marketplace')} class="px-4 py-2 font-semibold rounded-t-lg">Marketplace</button>
      </nav>
    </div>
  </div>

  {#if activeTab === 'requests'}
    <RequestsManagement {showToast} />
  {:else if activeTab === 'kyc'}
    <KYCManagement {showToast} />
  {:else if activeTab === 'global_ads'}
    <GlobalAdsManagement {showToast} />
  {:else if activeTab === 'marketplace'}
    <MarketplaceManagementPanel {showToast} />
  {:else if activeTab === 'subscriptions'}
    <SubscriptionManagement {showToast} />
  {/if}
</div>

<style>
  /* Minimal styling - relies on global Tailwind */
</style>
