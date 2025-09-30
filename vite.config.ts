import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Small plugin to synthesize a named export `untrack` when Rollup checks the
// svelte runtime exports. This avoids a noisy build-time warning when kit
// imports `untrack` but older svelte runtime doesn't export it.
function svelteUntrackShim() {
    return {
		name: 'svelte-untrack-shim',
		resolveId(id) {
			// intercept the virtual module path used by the rollup check
			if (id.endsWith('svelte/src/runtime/index.js') || id.endsWith('svelte/src/runtime/ssr.js')) {
				return id + '?svelte-untrack-shim';
			}
			return null;
		},
		load(id) {
			if (id.endsWith('?svelte-untrack-shim')) {
				// export a tiny wrapper that re-exports everything and defines untrack
                const original = id.replace('?svelte-untrack-shim', '').replace(/\\/g, '/');
                return `export * from '${original}';\nexport const untrack = (v) => v;`;
			}
			return null;
		}
	};
}

export default defineConfig({
	plugins: [sveltekit(), svelteUntrackShim()]
});
