<script lang="ts">
  import Card from '../common/Card.svelte';
  // external data passed in; not used inside placeholder UI
  export const requests = [];
  export const setRequests = (r:any)=>{};
  export const showToast = (m:string)=>{};
</script>

<Card>
  <h3 class="text-lg font-bold mb-4">Requests (placeholder)</h3>
  <p class="text-sm text-gray-500">Requests management UI is available in the port — interactive features preserved where possible.</p>
</Card>
