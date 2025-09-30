import { c as create_ssr_component, a as spread, e as escape_object, b as each, d as add_attribute, v as validate_component, f as escape, m as missing_component, g as createEventDispatcher } from "../../chunks/ssr.js";
import { a as activeView, u as userRole, b as userSubscriptions } from "../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { M as MagnifyingGlassIcon } from "../../chunks/MagnifyingGlassIcon.js";
import { I as InformationCircleIcon } from "../../chunks/InformationCircleIcon.js";
const BellIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path></svg>`;
});
const BuildingLibraryIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"></path></svg>`;
});
const BuildingStorefrontIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"></path></svg>`;
});
const ChartPieIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"></path></svg>`;
});
const CheckCircleIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
});
const ChevronDownIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>`;
});
const Cog6ToothIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`;
});
const CurrencyDollarIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
});
const EnvelopeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg>`;
});
const HomeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>`;
});
const InboxIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"></path></svg>`;
});
const PlusCircleIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
});
const UserCircleIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`;
});
const UsersIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path></svg>`;
});
const XCircleIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { "stroke-width": "1.5" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
});
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
  return `<aside class="w-64 bg-brand-surface dark:bg-dark-surface flex-shrink-0 p-4 border-r border-brand-border dark:border-dark-border flex flex-col"><div class="flex items-center mb-10 p-2" data-svelte-h="svelte-yzvunl"><svg aria-hidden="true" focusable="false" class="h-10 w-10 text-brand-primary dark:text-dark-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg> <h1 class="text-2xl font-bold text-brand-primary dark:text-dark-text-primary ml-2">Creeb</h1></div> <nav class="flex-1" aria-label="Main navigation"><ul class="space-y-1">${each(visibleNavItems, (item) => {
    let isActive = active === item.view;
    return ` <li><button type="button"${add_attribute("class", itemClass(isActive), 0)}${add_attribute("aria-pressed", isActive, 0)}${add_attribute("aria-current", isActive ? "page" : void 0, 0)}${add_attribute("aria-label", item.label, 0)}>${validate_component(item.icon || missing_component, "svelte:component").$$render(
      $$result,
      {
        class: "h-6 w-6 mr-4",
        "aria-hidden": "true",
        focusable: "false"
      },
      {},
      {}
    )} <span class="font-medium">${escape(item.label)}</span></button> </li>`;
  })}</ul> ${visibleActionNavItems.length > 0 ? `<hr class="my-6 border-brand-border dark:border-dark-border"> <ul class="space-y-1">${each(visibleActionNavItems, (item) => {
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
  })}</ul>` : ``} ${visibleAdminNavItems.length > 0 ? `<hr class="my-6 border-brand-border dark:border-dark-border"> <ul class="space-y-1">${each(visibleAdminNavItems, (item) => {
    let isActive = active === item.view;
    return ` <li><button type="button"${add_attribute("class", itemClass(isActive), 0)}${add_attribute("aria-pressed", isActive, 0)}${add_attribute("aria-label", item.label, 0)}>${validate_component(item.icon || missing_component, "svelte:component").$$render(
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
      class: "h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2"
    },
    {},
    {}
  )} <input type="text" placeholder="Search..." aria-label="Search listings" class="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 rounded-lg text-brand-text-primary dark:text-dark-text-primary placeholder:text-brand-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-primary"></div> <button type="button" aria-label="Notifications" title="Notifications" class="relative text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-dark-primary">${validate_component(BellIcon, "BellIcon").$$render(
    $$result,
    {
      class: "h-6 w-6",
      "aria-hidden": "true",
      focusable: "false"
    },
    {},
    {}
  )} <span aria-hidden="true" class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span></button> <div class="relative"><button id="user-menu-toggle" type="button" class="flex items-center space-x-3" aria-haspopup="true" aria-controls="user-menu"${add_attribute("aria-expanded", isDropdownOpen, 0)} aria-label="Toggle user menu" title="Toggle user menu"><img${add_attribute("src", `https://picsum.photos/seed/${role}/40/40`, 0)} alt="User Avatar" class="h-10 w-10 rounded-full"> <div><p class="font-semibold text-sm text-brand-text-primary dark:text-dark-text-primary" data-svelte-h="svelte-u4mo1g">John Doe</p> <div class="flex items-center"><span class="text-xs text-gray-500 dark:text-dark-text-secondary">${escape(role)}</span> ${validate_component(ChevronDownIcon, "ChevronDownIcon").$$render(
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
  createEventDispatcher();
  const iconMap = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon
  };
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  return `${message ? `<div class="fixed top-5 right-5 bg-brand-surface dark:bg-dark-surface shadow-lg rounded-lg p-4 flex items-center z-[100] animate-fade-in-down border border-brand-border dark:border-dark-border" role="status" aria-live="polite">${validate_component((iconMap[message.type] ?? InformationCircleIcon) || missing_component, "svelte:component").$$render(
    $$result,
    {
      class: `h-6 w-6 ${message.type === "success" ? "text-green-500" : message.type === "error" ? "text-red-500" : "text-blue-500"}`,
      "aria-hidden": "true"
    },
    {},
    {}
  )} <p class="ml-3 font-medium text-brand-text-primary dark:text-brand-text-primary">${escape(message.message)}</p> <button type="button" aria-label="Dismiss toast" class="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" data-svelte-h="svelte-1yzv9ji">×</button></div>` : ``}`;
});
let toastMessage = null;
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"><div class="flex">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})} <div class="flex-1">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="p-6">${slots.default ? slots.default({}) : ``}</main></div></div> ${validate_component(Toast, "Toast").$$render($$result, { message: toastMessage }, {}, {})}</div>`;
});
export {
  Layout as default
};
