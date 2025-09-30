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
      <div class="-mb-px flex space-x-2 overflow-x-auto" role="tablist" aria-label="Admin sections">
  <button id="tab-requests" type="button" role="tab" aria-selected={activeTab === 'requests'} aria-controls="tabpanel-requests" on:click={() => (activeTab = 'requests')} aria-label="Requests tab" class="px-4 py-2 font-semibold rounded-t-lg">Requests</button>
  <button id="tab-kyc" type="button" role="tab" aria-selected={activeTab === 'kyc'} aria-controls="tabpanel-kyc" on:click={() => (activeTab = 'kyc')} aria-label="KYC Verification tab" class="px-4 py-2 font-semibold rounded-t-lg">KYC Verification</button>
  <button id="tab-subscriptions" type="button" role="tab" aria-selected={activeTab === 'subscriptions'} aria-controls="tabpanel-subscriptions" on:click={() => (activeTab = 'subscriptions')} aria-label="Subscriptions tab" class="px-4 py-2 font-semibold rounded-t-lg">Subscriptions</button>
  <button id="tab-global-ads" type="button" role="tab" aria-selected={activeTab === 'global_ads'} aria-controls="tabpanel-global-ads" on:click={() => (activeTab = 'global_ads')} aria-label="Global Ads tab" class="px-4 py-2 font-semibold rounded-t-lg">Global Ads</button>
  <button id="tab-marketplace" type="button" role="tab" aria-selected={activeTab === 'marketplace'} aria-controls="tabpanel-marketplace" on:click={() => (activeTab = 'marketplace')} aria-label="Marketplace tab" class="px-4 py-2 font-semibold rounded-t-lg">Marketplace</button>
  </div>
    </div>
  </div>

  {#if activeTab === 'requests'}
    <div id="tabpanel-requests" role="tabpanel" aria-labelledby="tab-requests">
      <RequestsManagement {showToast} />
    </div>
  {:else if activeTab === 'kyc'}
    <div id="tabpanel-kyc" role="tabpanel" aria-labelledby="tab-kyc">
      <KYCManagement {showToast} />
    </div>
  {:else if activeTab === 'global_ads'}
    <div id="tabpanel-global-ads" role="tabpanel" aria-labelledby="tab-global-ads">
      <GlobalAdsManagement {showToast} />
    </div>
  {:else if activeTab === 'marketplace'}
    <div id="tabpanel-marketplace" role="tabpanel" aria-labelledby="tab-marketplace">
      <MarketplaceManagementPanel {showToast} />
    </div>
  {:else if activeTab === 'subscriptions'}
    <div id="tabpanel-subscriptions" role="tabpanel" aria-labelledby="tab-subscriptions">
      <SubscriptionManagement {showToast} />
    </div>
  {/if}
</div>

<style>
  /* Minimal styling - relies on global Tailwind */
</style>
