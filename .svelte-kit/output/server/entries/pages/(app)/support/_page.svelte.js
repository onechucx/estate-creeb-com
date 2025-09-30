import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
const Support = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-4" data-svelte-h="svelte-1mbao1y"><h2 class="text-lg font-bold text-brand-text-primary">Support</h2> <p class="text-sm text-brand-text-secondary mt-2">Placeholder support page.</p></div>`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(Support, "Support").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
