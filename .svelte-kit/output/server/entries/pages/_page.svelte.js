import { c as create_ssr_component, a as spread, e as escape_object, g as createEventDispatcher, v as validate_component, d as add_attribute, f as escape, b as each } from "../../chunks/ssr.js";
import { I as InformationCircleIcon } from "../../chunks/InformationCircleIcon.js";
import { M as MagnifyingGlassIcon } from "../../chunks/MagnifyingGlassIcon.js";
import { C as Card } from "../../chunks/Card.js";
import { B as Button } from "../../chunks/Button.js";
import { i as initialListings } from "../../chunks/stores.js";
const Bars3Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>`;
});
const ChevronLeftIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>`;
});
const ChevronRightIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>`;
});
const Squares2x2Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path></svg>`;
});
const WrenchScrewdriverIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"></path></svg>`;
});
const StarIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 24 24" },
      { fill: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$props)
    ],
    {}
  )}><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path></svg>`;
});
const ListingCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { listing } = $$props;
  let { onViewVendor = void 0 } = $$props;
  if ($$props.listing === void 0 && $$bindings.listing && listing !== void 0) $$bindings.listing(listing);
  if ($$props.onViewVendor === void 0 && $$bindings.onViewVendor && onViewVendor !== void 0) $$bindings.onViewVendor(onViewVendor);
  return `${validate_component(Card, "Card").$$render($$result, { class: "group relative" }, {}, {
    default: () => {
      return `${listing.isPaid ? `<div aria-hidden="false" class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center">${validate_component(StarIcon, "StarIcon").$$render(
        $$result,
        {
          "aria-hidden": "true",
          class: "h-4 w-4 mr-1"
        },
        {},
        {}
      )} <span class="sr-only" data-svelte-h="svelte-1m3nywt">Paid listing</span> <span aria-hidden="true" data-svelte-h="svelte-olstlr">Paid</span></div>` : ``} <img${add_attribute("src", listing.images[0], 0)}${add_attribute("alt", listing.title, 0)} class="w-full h-48 object-cover rounded-lg mb-4"> <p class="text-sm text-gray-500 dark:text-dark-text-secondary">${escape(listing.category)}</p> <h3 class="text-lg font-bold truncate text-brand-text-primary dark:text-dark-text-primary group-hover:text-brand-primary dark:group-hover:text-dark-primary">${escape(listing.title)}</h3> <p class="font-semibold text-brand-primary dark:text-dark-primary text-xl">₦${escape(listing.price.toLocaleString())}</p> <p class="text-sm text-gray-500 dark:text-dark-text-secondary truncate">${escape(listing.location)}</p> ${onViewVendor ? `<p class="text-xs text-gray-400 mt-1">by <button type="button" class="hover:underline font-semibold"${add_attribute("aria-label", `View vendor ${listing.vendorName}`, 0)}>${escape(listing.vendorName)}</button></p>` : ``} <div class="mt-4"><button type="button" class="px-3 py-2 bg-brand-primary text-white rounded"${add_attribute("aria-label", `View details for ${listing.title}`, 0)}>View Details</button></div>`;
    }
  })}`;
});
const Marketplace = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let processedListings;
  let totalPages;
  let currentListings;
  let { showToast } = $$props;
  let { isAuthenticated = true } = $$props;
  let { isCommunitySubscribed = false } = $$props;
  let { listings } = $$props;
  let { onStartMessage = void 0 } = $$props;
  let { onLoginRequest = void 0 } = $$props;
  createEventDispatcher();
  let searchTerm = "";
  let sortBy = "date-desc";
  let viewMode = "grid";
  let currentPage = 1;
  let itemsPerPage = 6;
  let activeCategory = "All";
  let priceRange = { min: "", max: "" };
  const categories = ["All", "Properties", "Assets", "Services"];
  if ($$props.showToast === void 0 && $$bindings.showToast && showToast !== void 0) $$bindings.showToast(showToast);
  if ($$props.isAuthenticated === void 0 && $$bindings.isAuthenticated && isAuthenticated !== void 0) $$bindings.isAuthenticated(isAuthenticated);
  if ($$props.isCommunitySubscribed === void 0 && $$bindings.isCommunitySubscribed && isCommunitySubscribed !== void 0) $$bindings.isCommunitySubscribed(isCommunitySubscribed);
  if ($$props.listings === void 0 && $$bindings.listings && listings !== void 0) $$bindings.listings(listings);
  if ($$props.onStartMessage === void 0 && $$bindings.onStartMessage && onStartMessage !== void 0) $$bindings.onStartMessage(onStartMessage);
  if ($$props.onLoginRequest === void 0 && $$bindings.onLoginRequest && onLoginRequest !== void 0) $$bindings.onLoginRequest(onLoginRequest);
  processedListings = (() => {
    let filteredListings = listings.filter((l) => l.status === "Active");
    if (searchTerm.trim() !== "") {
      const lowercasedSearch = searchTerm.toLowerCase();
      filteredListings = filteredListings.filter((l) => l.title.toLowerCase().includes(lowercasedSearch) || l.description.toLowerCase().includes(lowercasedSearch) || l.location.toLowerCase().includes(lowercasedSearch));
    }
    const minPrice = parseFloat(priceRange.min);
    const maxPrice = parseFloat(priceRange.max);
    if (!isNaN(minPrice)) {
      filteredListings = filteredListings.filter((l) => l.price >= minPrice);
    }
    if (!isNaN(maxPrice)) {
      filteredListings = filteredListings.filter((l) => l.price <= maxPrice);
    }
    const sortedListings = [...filteredListings].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "date-asc":
          return new Date(a.dateListed).getTime() - new Date(b.dateListed).getTime();
        case "date-desc":
          return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
        case "location-asc":
          return a.location.localeCompare(b.location);
        case "location-desc":
          return b.location.localeCompare(a.location);
        case "category-asc":
          return a.category.localeCompare(b.category);
        case "category-desc":
          return b.category.localeCompare(a.category);
        default:
          return 0;
      }
    });
    const paid = sortedListings.filter((l) => l.isPaid);
    const unpaid = sortedListings.filter((l) => !l.isPaid);
    return [...paid, ...unpaid];
  })();
  totalPages = Math.ceil(processedListings.length / itemsPerPage);
  {
    {
      currentPage = 1;
    }
  }
  currentListings = processedListings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return `${``} <div class="space-y-6">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="relative lg:col-span-2">${validate_component(MagnifyingGlassIcon, "MagnifyingGlassIcon").$$render(
        $$result,
        {
          class: "h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2"
        },
        {},
        {}
      )} <input type="text" placeholder="Search listings by title, location..." class="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"${add_attribute("value", searchTerm, 0)}></div> <div class="flex items-center gap-2"><input type="number" placeholder="Min Price" class="pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-center"${add_attribute("value", priceRange.min, 0)}> <span class="text-gray-400" data-svelte-h="svelte-1n8ckzw">-</span> <input type="number" placeholder="Max Price" class="pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-center"${add_attribute("value", priceRange.max, 0)}></div> <div class="flex items-center gap-4"><select class="p-2 w-full border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"><option value="date-desc" data-svelte-h="svelte-1i1m6we">Newest First</option><option value="date-asc" data-svelte-h="svelte-1oxxyph">Oldest First</option><option value="price-desc" data-svelte-h="svelte-2ylmkr">Price: High to Low</option><option value="price-asc" data-svelte-h="svelte-1t0glsp">Price: Low to High</option><option value="location-asc" data-svelte-h="svelte-ze40z3">Location (A-Z)</option><option value="location-desc" data-svelte-h="svelte-1ptz0un">Location (Z-A)</option><option value="category-asc" data-svelte-h="svelte-ca3b07">Category (A-Z)</option><option value="category-desc" data-svelte-h="svelte-15pgbu1">Category (Z-A)</option></select> <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1"><button type="button"${add_attribute(
        "class",
        `p-1 rounded ${"bg-brand-surface dark:bg-dark-surface shadow"}`,
        0
      )} aria-label="Grid View"${add_attribute("aria-pressed", viewMode === "grid", 0)}>${validate_component(Squares2x2Icon, "Squares2x2Icon").$$render($$result, { class: "h-5 w-5" }, {}, {})}</button> <button type="button"${add_attribute(
        "class",
        `p-1 rounded ${""}`,
        0
      )} aria-label="List View"${add_attribute("aria-pressed", viewMode === "list", 0)}>${validate_component(Bars3Icon, "Bars3Icon").$$render($$result, { class: "h-5 w-5" }, {}, {})}</button></div></div></div> <div class="mt-4 border-b border-brand-border dark:border-dark-border"><nav class="-mb-px flex space-x-4 overflow-x-auto">${each(categories, (category) => {
        return `<button type="button"${add_attribute("aria-pressed", activeCategory === category, 0)}${add_attribute("aria-label", `Category ${category}`, 0)}${add_attribute(
          "class",
          `whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeCategory === category ? "border-brand-primary text-brand-primary dark:border-dark-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,
          0
        )}>${escape(category)} </button>`;
      })}</nav></div>`;
    }
  })} ${isAuthenticated ? `<div class="flex justify-end">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "secondary",
      disabled: !isCommunitySubscribed,
      title: !isCommunitySubscribed ? "Community subscription required to manage listings" : ""
    },
    {},
    {
      default: () => {
        return `${validate_component(WrenchScrewdriverIcon, "WrenchScrewdriverIcon").$$render($$result, { class: "h-5 w-5 mr-2" }, {}, {})}
                Manage My Listings`;
      }
    }
  )}</div>` : ``} ${currentListings.length > 0 ? `${`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${each(currentListings, (listing) => {
    return `${validate_component(ListingCard, "ListingCard").$$render($$result, { listing }, {}, {})}`;
  })}</div>`}` : `${validate_component(Card, "Card").$$render($$result, { class: "text-center py-16" }, {}, {
    default: () => {
      return `${validate_component(InformationCircleIcon, "InformationCircleIcon").$$render(
        $$result,
        {
          class: "h-12 w-12 text-gray-400 mx-auto mb-4"
        },
        {},
        {}
      )} <h3 class="text-xl font-bold" data-svelte-h="svelte-1heqt94">No listings found</h3> <p class="text-gray-500" data-svelte-h="svelte-106aw1p">Try adjusting your search or filters.</p>`;
    }
  })}`} ${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "flex flex-col md:flex-row justify-between items-center gap-4"
    },
    {},
    {
      default: () => {
        return `<div class="flex items-center gap-2 text-sm"><span data-svelte-h="svelte-kn1faq">Items per page:</span> <select class="p-1 border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-md"><option${add_attribute("value", 6, 0)} data-svelte-h="svelte-1cgmm7s">6</option><option${add_attribute("value", 12, 0)} data-svelte-h="svelte-1mki1ta">12</option><option${add_attribute("value", 18, 0)} data-svelte-h="svelte-pewxf2">18</option></select></div> <div class="flex items-center gap-2">${validate_component(Button, "Button").$$render(
          $$result,
          {
            type: "button",
            variant: "secondary",
            disabled: currentPage === 1,
            "aria-label": "Previous page"
          },
          {},
          {
            default: () => {
              return `${validate_component(ChevronLeftIcon, "ChevronLeftIcon").$$render($$result, { class: "h-5 w-5" }, {}, {})}`;
            }
          }
        )} <span class="text-sm font-medium">Page ${escape(currentPage)} of ${escape(totalPages)}</span> ${validate_component(Button, "Button").$$render(
          $$result,
          {
            type: "button",
            variant: "secondary",
            disabled: currentPage === totalPages,
            "aria-label": "Next page"
          },
          {},
          {
            default: () => {
              return `${validate_component(ChevronRightIcon, "ChevronRightIcon").$$render($$result, { class: "h-5 w-5" }, {}, {})}`;
            }
          }
        )}</div>`;
      }
    }
  )}</div>`;
});
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
