import { c as create_ssr_component, d as createEventDispatcher, v as validate_component, a as add_attribute, b as escape, e as each } from "./ssr.js";
import { s as StarIcon, M as MagnifyingGlassIcon, t as Squares2x2Icon, u as Bars3Icon, W as WrenchScrewdriverIcon, g as InformationCircleIcon, v as ChevronLeftIcon, w as ChevronRightIcon } from "./heroicons-fallback.js";
import { C as Card } from "./Card.js";
import { B as Button } from "./Button.js";
const ListingCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { listing } = $$props;
  let { onViewVendor = void 0 } = $$props;
  if ($$props.listing === void 0 && $$bindings.listing && listing !== void 0) $$bindings.listing(listing);
  if ($$props.onViewVendor === void 0 && $$bindings.onViewVendor && onViewVendor !== void 0) $$bindings.onViewVendor(onViewVendor);
  return `${validate_component(Card, "Card").$$render($$result, { class: "group relative" }, {}, {
    default: () => {
      return `${listing.isPaid ? `<div class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center" aria-hidden="true">${validate_component(StarIcon, "StarIcon").$$render(
        $$result,
        {
          "aria-hidden": "true",
          focusable: "false",
          class: "h-4 w-4 mr-1"
        },
        {},
        {}
      )} <span class="sr-only" data-svelte-h="svelte-1m3nywt">Paid listing</span> <span aria-hidden="true" data-svelte-h="svelte-olstlr">Paid</span></div>` : ``} <img${add_attribute("src", listing.images[0], 0)}${add_attribute("alt", listing.title, 0)} class="w-full h-48 object-cover rounded-lg mb-4"> <p class="text-sm text-gray-500 dark:text-dark-text-secondary">${escape(listing.category)}</p> <h3 class="text-lg font-bold truncate text-brand-text-primary dark:text-dark-text-primary group-hover:text-brand-primary dark:group-hover:text-dark-primary">${escape(listing.title)}</h3> <p class="font-semibold text-brand-primary dark:text-dark-primary text-xl">₦${escape(listing.price.toLocaleString())}</p> <p class="text-sm text-gray-500 dark:text-dark-text-secondary truncate">${escape(listing.location)}</p> ${onViewVendor ? `<p class="text-xs text-gray-400 mt-1">by <button type="button" class="hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"${add_attribute("aria-label", `View vendor ${listing.vendorName}`, 0)}>${escape(listing.vendorName)}</button></p>` : ``} <div class="mt-4"><button type="button" class="px-3 py-2 bg-brand-primary text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"${add_attribute("aria-label", `View details for ${listing.title}`, 0)}>View Details</button></div>`;
    }
  })}`;
});
const Marketplace = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let processedListings;
  let totalPages;
  let currentListings;
  const showToast = void 0;
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
  if ($$props.showToast === void 0 && $$bindings.showToast && showToast !== void 0) ;
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
          class: "h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2",
          "aria-hidden": "true",
          focusable: "false"
        },
        {},
        {}
      )} <input type="text" placeholder="Search listings by title, location..." aria-label="Search listings" class="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"${add_attribute("value", searchTerm, 0)}></div> <div class="flex items-center gap-2"><input type="number" placeholder="Min Price" aria-label="Minimum price" class="pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-center"${add_attribute("value", priceRange.min, 0)}> <span class="text-gray-400" data-svelte-h="svelte-1n8ckzw">-</span> <input type="number" placeholder="Max Price" aria-label="Maximum price" class="pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-center"${add_attribute("value", priceRange.max, 0)}></div> <div class="flex items-center gap-4"><select aria-label="Sort listings" class="p-2 w-full border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"><option value="date-desc" data-svelte-h="svelte-1i1m6we">Newest First</option><option value="date-asc" data-svelte-h="svelte-1oxxyph">Oldest First</option><option value="price-desc" data-svelte-h="svelte-2ylmkr">Price: High to Low</option><option value="price-asc" data-svelte-h="svelte-1t0glsp">Price: Low to High</option><option value="location-asc" data-svelte-h="svelte-ze40z3">Location (A-Z)</option><option value="location-desc" data-svelte-h="svelte-1ptz0un">Location (Z-A)</option><option value="category-asc" data-svelte-h="svelte-ca3b07">Category (A-Z)</option><option value="category-desc" data-svelte-h="svelte-15pgbu1">Category (Z-A)</option></select> <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1"><button type="button"${add_attribute(
        "class",
        `p-1 rounded ${"bg-brand-surface dark:bg-dark-surface shadow"}`,
        0
      )} aria-label="Grid View"${add_attribute("aria-pressed", viewMode === "grid", 0)}>${validate_component(Squares2x2Icon, "Squares2x2Icon").$$render(
        $$result,
        {
          class: "h-5 w-5",
          "aria-hidden": "true",
          focusable: "false"
        },
        {},
        {}
      )}</button> <button type="button"${add_attribute(
        "class",
        `p-1 rounded ${""}`,
        0
      )} aria-label="List View"${add_attribute("aria-pressed", viewMode === "list", 0)}>${validate_component(Bars3Icon, "Bars3Icon").$$render(
        $$result,
        {
          class: "h-5 w-5",
          "aria-hidden": "true",
          focusable: "false"
        },
        {},
        {}
      )}</button></div></div></div> <div class="mt-4 border-b border-brand-border dark:border-dark-border"><nav class="-mb-px flex space-x-4 overflow-x-auto" aria-label="Listing categories">${each(categories, (category) => {
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
        return `${validate_component(WrenchScrewdriverIcon, "WrenchScrewdriverIcon").$$render(
          $$result,
          {
            class: "h-5 w-5 mr-2",
            "aria-hidden": "true",
            focusable: "false"
          },
          {},
          {}
        )}
                Manage My Listings`;
      }
    }
  )}</div>` : ``} ${currentListings.length > 0 ? `${`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">${each(currentListings, (listing) => {
    return `${validate_component(ListingCard, "ListingCard").$$render($$result, { listing }, {}, {})}`;
  })}</div>`}` : `${validate_component(Card, "Card").$$render($$result, { class: "text-center py-16" }, {}, {
    default: () => {
      return `${validate_component(InformationCircleIcon, "InformationCircleIcon").$$render(
        $$result,
        {
          class: "h-12 w-12 text-gray-400 mx-auto mb-4",
          "aria-hidden": "true",
          focusable: "false"
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
        return `<div class="flex items-center gap-2 text-sm"><span data-svelte-h="svelte-kn1faq">Items per page:</span> <select aria-label="Items per page" class="p-1 border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-md"><option${add_attribute("value", 6, 0)} data-svelte-h="svelte-1cgmm7s">6</option><option${add_attribute("value", 12, 0)} data-svelte-h="svelte-1mki1ta">12</option><option${add_attribute("value", 18, 0)} data-svelte-h="svelte-pewxf2">18</option></select></div> <div class="flex items-center gap-2">${validate_component(Button, "Button").$$render(
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
              return `${validate_component(ChevronLeftIcon, "ChevronLeftIcon").$$render($$result, { class: "h-5 w-5", "aria-hidden": "true" }, {}, {})}`;
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
              return `${validate_component(ChevronRightIcon, "ChevronRightIcon").$$render($$result, { class: "h-5 w-5", "aria-hidden": "true" }, {}, {})}`;
            }
          }
        )}</div>`;
      }
    }
  )}</div>`;
});
export {
  Marketplace as M
};
