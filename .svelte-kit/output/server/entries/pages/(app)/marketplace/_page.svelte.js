import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { M as Marketplace } from "../../../../chunks/Marketplace.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const listings = [];
  return `<main>${validate_component(Marketplace, "Marketplace").$$render($$result, { listings }, {}, {})}</main>`;
});
export {
  Page as default
};
