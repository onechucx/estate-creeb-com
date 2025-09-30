import { c as create_ssr_component, f as subscribe, v as validate_component, a as add_attribute, b as escape } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { c as user } from "../../../../chunks/stores.js";
import { q as PencilIcon } from "../../../../chunks/heroicons-fallback.js";
const Profile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let localUser = { ...$user };
  $$unsubscribe_user();
  return `<div class="p-4 sm:p-6"><div class="flex justify-between items-center mb-6"><h1 class="text-2xl font-bold text-brand-text-primary" data-svelte-h="svelte-ux4ltn">My Profile</h1> ${`${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      "aria-label": "Edit profile"
    },
    {},
    {
      default: () => {
        return `${validate_component(PencilIcon, "PencilIcon").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-2",
            "aria-hidden": "true"
          },
          {},
          {}
        )}
                Edit Profile`;
      }
    }
  )}`}</div> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<form><div class="p-6 space-y-6"><div class="flex items-center space-x-6"><img${add_attribute("src", localUser.avatar, 0)} alt="User Avatar" class="w-24 h-24 rounded-full object-cover"> ${``}</div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="fullName" class="block text-sm font-medium text-brand-text-secondary" data-svelte-h="svelte-hugah">Full Name</label> <input type="text" id="fullName" ${"disabled"} class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm bg-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"${add_attribute("value", localUser.name, 0)}></div> <div><label for="email" class="block text-sm font-medium text-brand-text-secondary" data-svelte-h="svelte-1pa6a05">Email Address</label> <input type="email" id="email" disabled class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm sm:text-sm bg-gray-100 dark:bg-gray-800"${add_attribute("value", localUser.email, 0)}></div> <div><label for="phone" class="block text-sm font-medium text-brand-text-secondary" data-svelte-h="svelte-5bj572">Phone Number</label> <input type="tel" id="phone" ${"disabled"} class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm bg-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"${add_attribute("value", localUser.phone, 0)}></div> <div><label for="role" class="block text-sm font-medium text-brand-text-secondary" data-svelte-h="svelte-1jrtr4r">Role</label> <input type="text" id="role" disabled class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm sm:text-sm bg-gray-100 dark:bg-gray-800"${add_attribute("value", localUser.role, 0)}></div> <div class="md:col-span-2"><label for="bio" class="block text-sm font-medium text-brand-text-secondary" data-svelte-h="svelte-1pvocjd">Bio</label> <textarea id="bio" rows="4" ${"disabled"} class="mt-1 block w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm bg-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800">${escape(localUser.bio || "")}</textarea></div></div></div> ${``}</form>`;
    }
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Profile, "Profile").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
