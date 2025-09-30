<script lang="ts">  <!-- Minimal layout to isolate crash issue -->

    import PublicHeader from '$lib/components/PublicHeader.svelte';<script lang="ts">

    import LoginModal from '$lib/components/LoginModal.svelte';    import "../app.css";

    import Toast from '$lib/components/Toast.svelte';</script>

    import type { ToastMessage } from '$lib/types';

    import "../app.css";<div>

    <p>Simple layout test</p>

    let toastMessage: ToastMessage | null = null;    <slot />

    let showLoginModal = false;</div>

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