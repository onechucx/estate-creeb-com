import { c as create_ssr_component, f as escape } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
  return `<h2 class="text-2xl font-bold">Vendor: ${escape(params.name)}</h2> <p class="mt-2" data-svelte-h="svelte-1qz8da5">Placeholder for vendor detail page.</p>`;
});
export {
  Page as default
};
