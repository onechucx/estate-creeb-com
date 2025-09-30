<script lang="ts">  
    import PublicHeader from '$lib/components/PublicHeader.svelte';
    import LoginModal from '$lib/components/LoginModal.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import type { ToastMessage } from '$lib/types';
    import "../app.css";

    let toastMessage: ToastMessage | null = null;
    let showLoginModal = false;

    function handleLoginClick() {
        showLoginModal = true;
    }

    function handleCloseLogin() {
        showLoginModal = false;
    }
</script>

<PublicHeader onLoginClick={handleLoginClick} />
<slot />
<Toast message={toastMessage} />
<LoginModal open={showLoginModal} onClose={handleCloseLogin} />

 
