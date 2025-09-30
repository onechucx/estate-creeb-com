// @ts-nocheck
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// emulate __dirname in ESM/TS envs
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Small plugin to synthesize a named export `untrack` when Rollup checks the
// svelte runtime exports. This avoids a noisy build-time warning when kit
// imports `untrack` but older svelte runtime doesn't export it.
function svelteUntrackShim() {
	return {
		name: 'svelte-untrack-shim',
		resolveId(id: string) {
			// intercept the virtual module path used by the rollup check
			if (id.endsWith('svelte/src/runtime/index.js') || id.endsWith('svelte/src/runtime/ssr.js')) {
				return id + '?svelte-untrack-shim';
			}
			return null;
		},
	load(id: string) {
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
	plugins: [sveltekit(), svelteUntrackShim()],
	resolve: {
		alias: {
			// temporary local fallback if heroicons-svelte isn't present in node_modules
			// point to a JS module that exports named Svelte components
			'heroicons-svelte/24/outline': resolve(__dirname, 'src', 'lib', 'icons', 'heroicons-fallback.js'),
			'heroicons-svelte/24/solid': resolve(__dirname, 'src', 'lib', 'icons', 'heroicons-fallback.js')
		}
	}
});
