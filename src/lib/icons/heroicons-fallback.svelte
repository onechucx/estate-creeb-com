<script>
  // Forward all attributes (including class) so components can pass class directly
  export let ariaHidden = 'true';
  export let focusable = 'false';
  // $$restProps will pick up class and other attributes
</script>

<svg {...$$restProps} aria-hidden={ariaHidden} focusable={focusable} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" fill="currentColor" opacity="0.05" />
</svg>
