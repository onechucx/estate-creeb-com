import { c as create_ssr_component, f as escape } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
  return `<main class="p-6"><h2 class="text-2xl font-bold">Vendor: ${escape(params.name)}</h2> <p class="mt-2" data-svelte-h="svelte-17j02c3">Vendor detail page placeholder — implement Vendor component when available.</p> <a class="text-sm text-brand-primary mt-4 inline-block" href="/app/marketplace" data-svelte-h="svelte-1aqvu4b">← Back to marketplace</a></main>`;
});
export {
  Page as default
};
