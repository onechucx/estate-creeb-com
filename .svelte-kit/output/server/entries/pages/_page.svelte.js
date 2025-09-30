import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 class="text-3xl font-bold underline text-green-500" data-svelte-h="svelte-1t7xr1b">Hello world! This is the new SvelteKit project.</h1>`;
});
export {
  Page as default
};
