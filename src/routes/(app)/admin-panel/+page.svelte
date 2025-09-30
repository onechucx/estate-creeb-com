<script lang="ts">
  import AdminPanel from '$lib/components/AdminPanel.svelte';
  import { toast } from '$lib/stores';

  const showToast = (m: string) => toast.set({ id: Date.now().toString(), message: m, type: 'success' });
</script>

<div class="p-6">
  <AdminPanel {showToast} />
</div>
