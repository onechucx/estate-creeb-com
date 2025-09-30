import { c as create_ssr_component, e as each, a as add_attribute, v as validate_component, b as escape, m as missing_component, d as createEventDispatcher, o as onDestroy } from "../../chunks/ssr.js";
import { H as HomeIcon, B as BuildingLibraryIcon, U as UsersIcon, a as UserCircleIcon, C as CurrencyDollarIcon, E as EnvelopeIcon, b as BuildingStorefrontIcon, c as Cog6ToothIcon, I as InboxIcon, P as PlusCircleIcon, d as ChartPieIcon, M as MagnifyingGlassIcon, e as BellIcon, f as ChevronDownIcon, g as InformationCircleIcon, X as XCircleIcon, h as CheckCircleIcon } from "../../chunks/heroicons-fallback.js";
import { a as activeView, u as userRole, b as userSubscriptions } from "../../chunks/stores.js";
import "../../chunks/client.js";
function itemClass(isActive) {
  return isActive ? "flex items-center p-3 my-1 rounded-lg transition-colors duration-200 bg-brand-primary dark:bg-dark-primary text-white shadow-lg cursor-pointer" : "flex items-center p-3 my-1 rounded-lg transition-colors duration-200 text-gray-500 dark:text-dark-text-secondary hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-brand-primary dark:hover:text-dark-text-primary cursor-pointer";
}
function actionItemClass(isDisabled) {
  return isDisabled ? "flex items-center p-3 my-1 rounded-lg transition-colors duration-200 text-brand-primary dark:text-dark-primary bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 font-bold border-2 border-dashed border-blue-200 dark:border-gray-600 opacity-50 cursor-not-allowed" : "flex items-center p-3 my-1 rounded-lg transition-colors duration-200 text-brand-primary dark:text-dark-primary bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 font-bold border-2 border-dashed border-blue-200 dark:border-gray-600 cursor-pointer";
}
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let visibleNavItems;
  let visibleActionNavItems;
  let visibleAdminNavItems;
  let active = "DASHBOARD";
  let role = "User";
  let subs = { community: true, estate: false };
  activeView.subscribe((value) => active = value);
  userRole.subscribe((value) => role = value);
  userSubscriptions.subscribe((value) => subs = value);
  const navItems = [
    {
      view: "DASHBOARD",
      label: "Dashboard",
      icon: HomeIcon,
      roles: ["User", "Partner", "Administrator"]
    },
    {
      view: "ESTATE",
      label: "My Estates",
      icon: BuildingLibraryIcon,
      roles: ["User", "Partner", "Administrator"]
    },
    {
      view: "COMMUNITY",
      label: "Community",
      icon: UsersIcon,
      roles: ["User", "Partner", "Administrator"]
    },
    {
      view: "PROFILE",
      label: "Profile",
      icon: UserCircleIcon,
      roles: ["User", "Partner", "Administrator"]
    },
    {
      view: "WALLETS",
      label: "Wallets",
      icon: CurrencyDollarIcon,
      roles: ["User", "Partner"]
    },
    {
      view: "INBOX",
      label: "Inbox",
      icon: EnvelopeIcon,
      roles: ["User", "Partner", "Administrator"]
    },
    {
      view: "MARKETPLACE",
      label: "Marketplace",
      icon: BuildingStorefrontIcon,
      roles: ["User", "Partner"]
    },
    {
      view: "SETTINGS",
      label: "Settings",
      icon: Cog6ToothIcon,
      roles: ["User", "Partner", "Administrator"]
    },
    {
      view: "SUPPORT",
      label: "Support",
      icon: InboxIcon,
      roles: ["User", "Partner", "Administrator"]
    }
  ];
  const actionNavItems = [
    {
      view: "CREATE_HUB",
      label: "Create New...",
      icon: PlusCircleIcon,
      roles: ["User", "Partner", "Administrator"]
    }
  ];
  const adminNavItems = [
    {
      view: "ADMIN_PANEL",
      label: "Administrator",
      icon: ChartPieIcon,
      roles: ["Administrator"]
    }
  ];
  visibleNavItems = navItems.filter((item) => item.roles.includes(role));
  visibleActionNavItems = actionNavItems.filter((item) => item.roles.includes(role));
  visibleAdminNavItems = adminNavItems.filter((item) => item.roles.includes(role));
  return `<aside class="w-64 bg-brand-surface dark:bg-dark-surface flex-shrink-0 p-4 border-r border-brand-border dark:border-dark-border flex flex-col" aria-label="Application sidebar"> <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4" data-svelte-h="svelte-14bllrs">Skip to main content</a> <div class="flex items-center mb-10 p-2" data-svelte-h="svelte-yzvunl"><svg aria-hidden="true" focusable="false" class="h-10 w-10 text-brand-primary dark:text-dark-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg> <h1 class="text-2xl font-bold text-brand-primary dark:text-dark-text-primary ml-2">Creeb</h1></div> <nav class="flex-1" aria-label="Main navigation"><ul class="space-y-1" role="list">${each(visibleNavItems, (item) => {
    let isActive = active === item.view;
    return ` <li role="listitem"><button type="button"${add_attribute("class", itemClass(isActive), 0)}${add_attribute("aria-pressed", isActive, 0)}${add_attribute("aria-current", isActive ? "page" : void 0, 0)}${add_attribute("aria-label", item.label, 0)}>${validate_component(item.icon || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "h-6 w-6 mr-4",
        "aria-hidden": "true",
        focusable: "false"
      },
      {},
      {}
    )} <span class="font-medium">${escape(item.label)}</span></button> </li>`;
  })}</ul> ${visibleActionNavItems.length > 0 ? `<hr class="my-6 border-brand-border dark:border-dark-border"> <ul class="space-y-1" role="list">${each(visibleActionNavItems, (item) => {
    let isDisabled = item.view === "CREATE_HUB" && role !== "Administrator" && !(subs.community || subs.estate);
    return ` <li><button type="button"${add_attribute("class", actionItemClass(isDisabled), 0)}${add_attribute(
      "title",
      isDisabled ? "An active subscription is required for this feature." : "",
      0
    )}${add_attribute("aria-disabled", isDisabled, 0)}${add_attribute("aria-label", item.label, 0)}>${validate_component(item.icon || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "h-6 w-6 mr-4",
        "aria-hidden": "true",
        focusable: "false"
      },
      {},
      {}
    )} <span class="font-medium">${escape(item.label)}</span></button> </li>`;
  })}</ul>` : ``} ${visibleAdminNavItems.length > 0 ? `<hr class="my-6 border-brand-border dark:border-dark-border"> <ul class="space-y-1" role="list">${each(visibleAdminNavItems, (item) => {
    let isActive = active === item.view;
    return ` <li role="listitem"><button type="button"${add_attribute("class", itemClass(isActive), 0)}${add_attribute("aria-pressed", isActive, 0)}${add_attribute("aria-label", item.label, 0)}>${validate_component(item.icon || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "h-6 w-6 mr-4",
        "aria-hidden": "true",
        focusable: "false"
      },
      {},
      {}
    )} <span class="font-medium">${escape(item.label)}</span></button> </li>`;
  })}</ul>` : ``}</nav></aside>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDropdownOpen = false;
  let role = "User";
  userRole.subscribe((value) => role = value);
  const pageTitles = {
    DASHBOARD: "Dashboard",
    ESTATE: "My Estates",
    COMMUNITY: "Community",
    PROFILE: "Profile",
    WALLETS: "Wallets",
    INBOX: "Inbox",
    MARKETPLACE: "Marketplace",
    SETTINGS: "Settings",
    SUPPORT: "Support",
    ADMIN_PANEL: "Administrator",
    CREATE_HUB: "Create New Hub"
  };
  let pageTitle = "Creeb";
  activeView.subscribe((value) => pageTitle = pageTitles[value] || "Creeb");
  return `<header class="bg-brand-surface dark:bg-dark-surface p-4 border-b border-brand-border dark:border-dark-border flex items-center justify-between"><h1 class="text-2xl font-bold text-brand-text-primary dark:text-dark-text-primary">${escape(pageTitle)}</h1> <div class="flex items-center space-x-6"><div class="relative">${validate_component(MagnifyingGlassIcon, "MagnifyingGlassIcon").$$render(
    $$result,
    {
      "aria-hidden": "true",
      focusable: "false",
      class: "h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2"
    },
    {},
    {}
  )} <input type="text" placeholder="Search..." aria-label="Search listings" class="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 rounded-lg text-brand-text-primary dark:text-dark-text-primary placeholder:text-brand-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-primary"></div> <button type="button" aria-label="Notifications" title="Notifications" class="relative text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-dark-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">${validate_component(BellIcon, "BellIcon").$$render(
    $$result,
    {
      class: "h-6 w-6",
      "aria-hidden": "true",
      focusable: "false"
    },
    {},
    {}
  )} <span aria-hidden="true" class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span></button> <div class="relative"><button id="user-menu-toggle" type="button" class="flex items-center space-x-3" aria-haspopup="true" aria-controls="user-menu"${add_attribute("aria-expanded", isDropdownOpen, 0)} aria-label="Toggle user menu" title="Toggle user menu"><img${add_attribute("src", `https://picsum.photos/seed/${role}/40/40`, 0)} alt="" class="h-10 w-10 rounded-full"> <div><p class="font-semibold text-sm text-brand-text-primary dark:text-dark-text-primary" data-svelte-h="svelte-u4mo1g">John Doe</p> <div class="flex items-center"><span class="text-xs text-gray-500 dark:text-dark-text-secondary">${escape(role)}</span> ${validate_component(ChevronDownIcon, "ChevronDownIcon").$$render(
    $$result,
    {
      class: `h-3 w-3 text-brand-text-secondary dark:text-dark-text-secondary ml-1 transition-transform ${""}`,
      "aria-hidden": "true",
      focusable: "false"
    },
    {},
    {}
  )}</div></div></button> ${``}</div></div></header>`;
});
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message = null } = $$props;
  const dispatch = createEventDispatcher();
  const iconMap = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon
  };
  let timer = null;
  onDestroy(() => {
    if (timer) clearTimeout(timer);
  });
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  {
    {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (message) {
        timer = setTimeout(() => dispatch("dismiss"), 5e3);
      }
    }
  }
  return `${message ? `<div class="fixed top-5 right-5 bg-brand-surface dark:bg-dark-surface shadow-lg rounded-lg p-4 flex items-center z-[100] animate-fade-in-down border border-brand-border dark:border-dark-border" role="status" aria-live="polite">${validate_component((iconMap[message.type] ?? InformationCircleIcon) || missing_component, "svelte:component").$$render(
    $$result,
    {
      class: `h-6 w-6 ${message.type === "success" ? "text-green-500" : message.type === "error" ? "text-red-500" : "text-blue-500"}`,
      "aria-hidden": "true",
      focusable: "false"
    },
    {},
    {}
  )} <p class="ml-3 font-medium text-brand-text-primary dark:text-brand-text-primary">${escape(message.message)}</p> <button type="button" aria-label="Dismiss toast" title="Dismiss toast" class="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" data-svelte-h="svelte-13rnmo4">×</button></div>` : ``}`;
});
let toastMessage = null;
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"><div class="flex">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})} <div class="flex-1">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="p-6">${slots.default ? slots.default({}) : ``}</main></div></div> ${validate_component(Toast, "Toast").$$render($$result, { message: toastMessage }, {}, {})}</div>`;
});
export {
  Layout as default
};
