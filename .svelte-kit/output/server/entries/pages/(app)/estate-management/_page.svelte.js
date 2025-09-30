import { c as create_ssr_component, v as validate_component, f as each, e as escape, m as missing_component, a as add_attribute } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { p as BuildingOfficeIcon, r as MapIcon, U as UsersIcon, C as CurrencyDollarIcon, l as PlusIcon, E as EyeIcon, s as PencilIcon } from "../../../../chunks/heroicons-fallback.js";
function getOccupancyRate(property) {
  return Math.round(property.occupied / property.units * 100);
}
function getStatusColor(status) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
    case "inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
const EstateManagement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const properties = [
    {
      id: 1,
      name: "Sunset Heights Apartments",
      location: "Victoria Island, Lagos",
      type: "Residential",
      units: 24,
      occupied: 22,
      monthlyRevenue: 48e5,
      status: "active",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
    },
    {
      id: 2,
      name: "Business Park Complex",
      location: "Ikeja, Lagos",
      type: "Commercial",
      units: 12,
      occupied: 10,
      monthlyRevenue: 82e5,
      status: "active",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400"
    },
    {
      id: 3,
      name: "Marina Towers",
      location: "Lagos Island, Lagos",
      type: "Mixed Use",
      units: 36,
      occupied: 28,
      monthlyRevenue: 126e5,
      status: "maintenance",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400"
    }
  ];
  const summaryStats = [
    {
      label: "Total Properties",
      value: properties.length.toString(),
      icon: BuildingOfficeIcon
    },
    {
      label: "Total Units",
      value: properties.reduce((sum, p) => sum + p.units, 0).toString(),
      icon: MapIcon
    },
    {
      label: "Occupied Units",
      value: properties.reduce((sum, p) => sum + p.occupied, 0).toString(),
      icon: UsersIcon
    },
    {
      label: "Monthly Revenue",
      value: `₦${(properties.reduce((sum, p) => sum + p.monthlyRevenue, 0) / 1e6).toFixed(1)}M`,
      icon: CurrencyDollarIcon
    }
  ];
  return `<main class="p-4 sm:p-6"> <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"><div data-svelte-h="svelte-1wz0jvv"><h1 class="text-3xl font-bold text-brand-text-primary">Estate Management</h1> <p class="text-lg text-brand-text-secondary mt-2">Manage your property portfolio and track performance.</p></div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "primary",
      class: "mt-4 sm:mt-0",
      "aria-label": "Add new property to portfolio"
    },
    {},
    {
      default: () => {
        return `${validate_component(PlusIcon, "PlusIcon").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-2",
            "aria-hidden": "true"
          },
          {},
          {}
        )}
            Add Property`;
      }
    }
  )}</div>  <section aria-labelledby="stats-heading" class="mb-8"><h2 id="stats-heading" class="sr-only" data-svelte-h="svelte-1pt7o6g">Portfolio Statistics</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${each(summaryStats, (stat) => {
    return `${validate_component(Card, "Card").$$render(
      $$result,
      {
        class: "text-center hover:shadow-lg transition-shadow duration-200"
      },
      {},
      {
        default: () => {
          return `<div class="p-6"><div class="flex justify-center mb-3">${validate_component(stat.icon || missing_component, "svelte:component").$$render(
            $$result,
            {
              class: "w-8 h-8 text-brand-primary",
              "aria-hidden": "true"
            },
            {},
            {}
          )}</div> <div class="text-2xl font-bold text-brand-text-primary">${escape(stat.value)}</div> <div class="text-sm text-brand-text-secondary mt-1">${escape(stat.label)}</div></div> `;
        }
      }
    )}`;
  })}</div></section>  <section aria-labelledby="properties-heading"><h2 id="properties-heading" class="text-xl font-semibold text-brand-text-primary mb-6" data-svelte-h="svelte-u22bs6">Your Properties</h2> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">${each(properties, (property) => {
    return `${validate_component(Card, "Card").$$render(
      $$result,
      {
        class: "hover:shadow-lg transition-shadow duration-200"
      },
      {},
      {
        default: () => {
          return `<article class="overflow-hidden"><img${add_attribute("src", property.image, 0)} alt="${"Exterior view of " + escape(property.name, true)}" class="w-full h-48 object-cover" loading="lazy"> <div class="p-6"><div class="flex items-start justify-between mb-3"><div><h3 class="text-lg font-semibold text-brand-text-primary">${escape(property.name)}</h3> <p class="text-sm text-brand-text-secondary flex items-center mt-1">${validate_component(MapIcon, "MapIcon").$$render(
            $$result,
            {
              class: "w-4 h-4 mr-1",
              "aria-hidden": "true"
            },
            {},
            {}
          )} ${escape(property.location)} </p></div> <span class="${"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize " + escape(getStatusColor(property.status), true)}" aria-label="${"Property status: " + escape(property.status, true)}">${escape(property.status)} </span></div> <div class="space-y-2 mb-4"><div class="flex justify-between text-sm"><span class="text-brand-text-secondary" data-svelte-h="svelte-153e4al">Type:</span> <span class="text-brand-text-primary font-medium">${escape(property.type)}</span></div> <div class="flex justify-between text-sm"><span class="text-brand-text-secondary" data-svelte-h="svelte-56a3p2">Occupancy:</span> <span class="text-brand-text-primary font-medium">${escape(property.occupied)}/${escape(property.units)} units (${escape(getOccupancyRate(property))}%)
                                    </span></div> <div class="flex justify-between text-sm"><span class="text-brand-text-secondary" data-svelte-h="svelte-enng6q">Monthly Revenue:</span> <span class="text-brand-text-primary font-medium">₦${escape((property.monthlyRevenue / 1e6).toFixed(1))}M</span> </div></div>  <div class="mb-4"><div class="flex justify-between text-sm mb-1"><span class="text-brand-text-secondary" data-svelte-h="svelte-1qcwmdm">Occupancy Rate</span> <span class="text-brand-text-primary">${escape(getOccupancyRate(property))}%</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-brand-primary h-2 rounded-full transition-all duration-300" style="${"width: " + escape(getOccupancyRate(property), true) + "%"}" role="progressbar"${add_attribute("aria-valuenow", getOccupancyRate(property), 0)} aria-valuemin="0" aria-valuemax="100" aria-label="${"Occupancy rate for " + escape(property.name, true)}"></div> </div></div>  <div class="flex items-center justify-between pt-4 border-t border-brand-border dark:border-dark-border">${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              "aria-label": "View details for " + property.name
            },
            {},
            {
              default: () => {
                return `${validate_component(EyeIcon, "EyeIcon").$$render(
                  $$result,
                  {
                    class: "w-4 h-4 mr-2",
                    "aria-hidden": "true"
                  },
                  {},
                  {}
                )}
                                    View Details
                                `;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              "aria-label": "Edit " + property.name
            },
            {},
            {
              default: () => {
                return `${validate_component(PencilIcon, "PencilIcon").$$render(
                  $$result,
                  {
                    class: "w-4 h-4 mr-2",
                    "aria-hidden": "true"
                  },
                  {},
                  {}
                )}
                                    Edit
                                `;
              }
            }
          )}</div> </div></article> `;
        }
      }
    )}`;
  })}</div></section></main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(EstateManagement, "EstateManagement").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
