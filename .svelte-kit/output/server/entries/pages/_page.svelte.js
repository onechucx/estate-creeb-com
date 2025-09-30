import { c as create_ssr_component, d as createEventDispatcher, v as validate_component } from "../../chunks/ssr.js";
import { M as Marketplace } from "../../chunks/Marketplace.js";
import { B as Button } from "../../chunks/Button.js";
import { i as initialListings } from "../../chunks/stores.js";
const PublicHomePage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onLoginSuccess = () => {
  } } = $$props;
  let { listings = [] } = $$props;
  createEventDispatcher();
  if ($$props.onLoginSuccess === void 0 && $$bindings.onLoginSuccess && onLoginSuccess !== void 0) $$bindings.onLoginSuccess(onLoginSuccess);
  if ($$props.listings === void 0 && $$bindings.listings && listings !== void 0) $$bindings.listings(listings);
  return `<div class="min-h-screen bg-brand-background text-brand-text-primary"><header class="bg-brand-surface p-4 border-b border-brand-border"><div class="container mx-auto flex items-center justify-between"><div class="flex items-center" data-svelte-h="svelte-eq96tm"><svg aria-hidden="true" focusable="false" class="h-10 w-10 text-brand-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path></svg> <h1 class="text-2xl font-bold text-brand-primary ml-2">Creeb</h1></div> <div class="flex items-center space-x-2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "secondary",
      "aria-label": "Open login dialog",
      title: "Login"
    },
    {},
    {
      default: () => {
        return `Login`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "primary",
      "aria-label": "Sign up for Creeb",
      title: "Sign up"
    },
    {},
    {
      default: () => {
        return `Sign Up`;
      }
    }
  )}</div></div></header> <main class="p-6 lg:p-8">${validate_component(Marketplace, "Marketplace").$$render(
    $$result,
    {
      showToast: (m) => console.log(m),
      isAuthenticated: false,
      listings,
      isCommunitySubscribed: false
    },
    {},
    {}
  )}</main> ${``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let listings = initialListings;
  return `${validate_component(PublicHomePage, "PublicHomePage").$$render($$result, { listings }, {}, {})}`;
});
export {
  Page as default
};
