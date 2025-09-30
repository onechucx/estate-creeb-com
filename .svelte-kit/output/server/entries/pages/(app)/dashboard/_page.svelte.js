import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/stores.js";
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const data = void 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) ;
  return `<div data-svelte-h="svelte-unu57u"><h2 class="text-2xl font-bold">Dashboard</h2> <p class="mt-2">Overview and metrics go here.</p></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
