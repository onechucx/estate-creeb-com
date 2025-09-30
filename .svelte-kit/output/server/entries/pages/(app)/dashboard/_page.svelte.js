import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<h2 class="text-2xl font-bold" data-svelte-h="svelte-1fl8n8o">Dashboard</h2> <p class="mt-2" data-svelte-h="svelte-1ag2kfv">This is the dashboard placeholder.</p>`;
});
export {
  Page as default
};
