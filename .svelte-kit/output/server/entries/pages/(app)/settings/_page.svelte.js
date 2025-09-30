import { c as create_ssr_component, v as validate_component, e as each, a as add_attribute, b as escape, m as missing_component } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { n as UserIcon, e as BellIcon, S as ShieldCheckIcon, z as CogIcon } from "../../../../chunks/heroicons-fallback.js";
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeSection = "profile";
  const sections = [
    {
      id: "profile",
      label: "Profile",
      icon: UserIcon
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: BellIcon
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: ShieldCheckIcon
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: CogIcon
    }
  ];
  return `<main class="p-4 sm:p-6"> <div class="mb-8" data-svelte-h="svelte-vtuusq"><h1 class="text-3xl font-bold text-brand-text-primary">Settings</h1> <p class="text-lg text-brand-text-secondary mt-2">Manage your account preferences and privacy settings.</p></div> <div class="flex flex-col lg:flex-row gap-8"> <aside class="lg:w-64 flex-shrink-0" aria-label="Settings navigation">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<nav class="p-4" aria-label="Settings sections"><ul role="list" class="space-y-2">${each(sections, (section) => {
        return `<li role="listitem"><button type="button" class="${"w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors duration-200 " + escape(
          activeSection === section.id ? "bg-brand-primary text-white" : "text-brand-text-primary hover:bg-gray-100 dark:hover:bg-gray-800",
          true
        )}"${add_attribute("aria-current", activeSection === section.id ? "page" : false, 0)}>${validate_component(section.icon || missing_component, "svelte:component").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-3",
            "aria-hidden": "true"
          },
          {},
          {}
        )} ${escape(section.label)}</button> </li>`;
      })}</ul></nav>`;
    }
  })}</aside>  <div class="flex-1">${`${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-6"><h2 class="text-xl font-semibold text-brand-text-primary mb-4" data-svelte-h="svelte-12kyfhw">Profile Settings</h2> <form class="space-y-6" data-svelte-h="svelte-1kkoiva"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="firstName" class="block text-sm font-medium text-brand-text-secondary mb-2">First Name</label> <input type="text" id="firstName" value="John" class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"></div> <div><label for="lastName" class="block text-sm font-medium text-brand-text-secondary mb-2">Last Name</label> <input type="text" id="lastName" value="Doe" class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"></div></div> <div><label for="email" class="block text-sm font-medium text-brand-text-secondary mb-2">Email Address</label> <input type="email" id="email" value="john.doe@example.com" class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"></div> <div><label for="bio" class="block text-sm font-medium text-brand-text-secondary mb-2">Bio</label> <textarea id="bio" rows="4" placeholder="Tell us about yourself..." class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea></div></form></div>`;
    }
  })}`}  <div class="mt-6">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "primary",
      "aria-label": "Save current settings"
    },
    {},
    {
      default: () => {
        return `Save Changes`;
      }
    }
  )}</div></div></div></main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(Settings, "Settings").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
