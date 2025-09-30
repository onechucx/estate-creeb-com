import { c as create_ssr_component, v as validate_component, f as each, a as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { E as EyeIcon, y as ChartBarIcon, z as BoltIcon, l as PlusIcon, s as PencilIcon, T as TrashIcon } from "../../../../chunks/heroicons-fallback.js";
import { M as MetricCard } from "../../../../chunks/MetricCard.js";
const MyListings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let listings = [
    {
      id: "listing1",
      title: "Modern 2-Bedroom Flat",
      location: "Yaba, Lagos",
      price: 5e7,
      status: "active",
      views: 1204,
      leads: 45,
      image: "/placeholder.svg"
    },
    {
      id: "listing2",
      title: "Serviced Office Space",
      location: "VI, Lagos",
      price: 15e6,
      status: "pending",
      views: 302,
      leads: 12,
      image: "/placeholder.svg"
    },
    {
      id: "listing3",
      title: "Land for Sale",
      location: "Epe, Lagos",
      price: 25e6,
      status: "inactive",
      views: 88,
      leads: 5,
      image: "/placeholder.svg"
    }
  ];
  const totalViews = listings.reduce((sum, l) => sum + l.views, 0);
  const totalLeads = listings.reduce((sum, l) => sum + l.leads, 0);
  const activeListings = listings.filter((l) => l.status === "active").length;
  const metrics = [
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      icon: EyeIcon
    },
    {
      label: "Total Leads",
      value: totalLeads.toLocaleString(),
      icon: ChartBarIcon
    },
    {
      label: "Active Listings",
      value: activeListings,
      icon: BoltIcon
    }
  ];
  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "";
    }
  };
  return `${``} ${``} <div class="p-4 sm:p-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"><h1 class="text-2xl font-bold text-brand-text-primary mb-4 sm:mb-0" data-svelte-h="svelte-fxcgh">My Listings</h1> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      "aria-label": "Create a new listing"
    },
    {},
    {
      default: () => {
        return `${validate_component(PlusIcon, "PlusIcon").$$render($$result, { class: "w-5 h-5 mr-2" }, {}, {})}
            Create Listing`;
      }
    }
  )}</div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">${each(metrics, (metric) => {
    return `${validate_component(MetricCard, "MetricCard").$$render(
      $$result,
      {
        label: metric.label,
        value: metric.value,
        icon: metric.icon
      },
      {},
      {}
    )}`;
  })}</div> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="overflow-x-auto"><table class="w-full text-left" aria-label="My listings table"><thead class="border-b border-brand-border dark:border-dark-border" data-svelte-h="svelte-97mc8r"><tr class="text-sm text-brand-text-secondary"><th class="p-4 font-medium">Listing</th> <th class="p-4 font-medium hidden md:table-cell">Price</th> <th class="p-4 font-medium hidden sm:table-cell">Status</th> <th class="p-4 font-medium hidden lg:table-cell">Views</th> <th class="p-4 font-medium hidden lg:table-cell">Leads</th> <th class="p-4 font-medium">Actions</th></tr></thead> <tbody class="divide-y divide-brand-border dark:divide-dark-border">${each(listings, (listing) => {
        return `<tr class="text-brand-text-primary"><td class="p-4"><div class="flex items-center"><img${add_attribute("src", listing.image.replace("http://placeimg.com", "https://loremflickr.com"), 0)}${add_attribute("alt", listing.title, 0)} class="w-16 h-12 object-cover rounded-md mr-4 hidden sm:block" loading="lazy"> <div><p class="font-semibold">${escape(listing.title)}</p> <p class="text-sm text-brand-text-secondary">${escape(listing.location)}</p></div> </div></td> <td class="p-4 hidden md:table-cell">₦${escape(listing.price.toLocaleString())}</td> <td class="p-4 hidden sm:table-cell"><span class="${"text-xs font-medium px-2 py-1 rounded-full capitalize " + escape(getStatusClass(listing.status), true)}">${escape(listing.status)} </span></td> <td class="p-4 hidden lg:table-cell">${escape(listing.views)}</td> <td class="p-4 hidden lg:table-cell">${escape(listing.leads)}</td> <td class="p-4"><div class="flex items-center space-x-2">${validate_component(Button, "Button").$$render(
          $$result,
          {
            type: "button",
            size: "sm",
            variant: "ghost",
            "aria-label": `Boost ${listing.title}`
          },
          {},
          {
            default: () => {
              return `${validate_component(BoltIcon, "BoltIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})} `;
            }
          }
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            type: "button",
            size: "sm",
            variant: "ghost",
            "aria-label": `Edit ${listing.title}`
          },
          {},
          {
            default: () => {
              return `${validate_component(PencilIcon, "PencilIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})} `;
            }
          }
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            type: "button",
            size: "sm",
            variant: "ghost",
            class: "text-red-500",
            "aria-label": `Delete ${listing.title}`
          },
          {},
          {
            default: () => {
              return `${validate_component(TrashIcon, "TrashIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})} `;
            }
          }
        )} </div></td> </tr>`;
      })}</tbody></table></div>`;
    }
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MyListings, "MyListings").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
