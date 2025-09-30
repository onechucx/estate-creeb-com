import { c as create_ssr_component, e as each, v as validate_component, b as escape } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { M as MetricCard } from "../../../../chunks/MetricCard.js";
import { H as HomeIcon, m as BuildingOfficeIcon, C as CurrencyDollarIcon, n as UserIcon } from "../../../../chunks/heroicons-fallback.js";
import "../../../../chunks/stores.js";
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const metrics = [
    {
      label: "Total Properties",
      value: "24",
      icon: HomeIcon,
      trend: "+12%"
    },
    {
      label: "Active Listings",
      value: "18",
      icon: BuildingOfficeIcon,
      trend: "+8%"
    },
    {
      label: "Total Revenue",
      value: "₦2.4M",
      icon: CurrencyDollarIcon,
      trend: "+23%"
    },
    {
      label: "New Inquiries",
      value: "47",
      icon: UserIcon,
      trend: "+5%"
    }
  ];
  const recentActivity = [
    {
      type: "inquiry",
      message: "New inquiry for Modern 2-Bedroom Flat",
      time: "2 hours ago"
    },
    {
      type: "listing",
      message: "Property listing approved and published",
      time: "4 hours ago"
    },
    {
      type: "payment",
      message: "Payment received for Office Space rental",
      time: "1 day ago"
    },
    {
      type: "review",
      message: "New 5-star review received",
      time: "2 days ago"
    }
  ];
  return `<main class="p-4 sm:p-6"> <div class="mb-8" data-svelte-h="svelte-vo8c0i"><h1 class="text-3xl font-bold text-brand-text-primary">Dashboard</h1> <p class="text-lg text-brand-text-secondary mt-2">Welcome back! Here&#39;s what&#39;s happening with your properties.</p></div>  <section aria-labelledby="metrics-heading" class="mb-8"><h2 id="metrics-heading" class="sr-only" data-svelte-h="svelte-11h9ja5">Key Metrics</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${each(metrics, (metric) => {
    return `${validate_component(MetricCard, "MetricCard").$$render(
      $$result,
      {
        label: metric.label,
        value: metric.value,
        icon: metric.icon,
        class: "hover:shadow-lg transition-shadow duration-200"
      },
      {},
      {}
    )}`;
  })}</div></section>  <section aria-labelledby="actions-heading" class="mb-8"><h2 id="actions-heading" class="text-xl font-semibold text-brand-text-primary mb-4" data-svelte-h="svelte-1bxc0t6">Quick Actions</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "primary",
      class: "justify-center py-6",
      "aria-label": "Create new property listing"
    },
    {},
    {
      default: () => {
        return `${validate_component(HomeIcon, "HomeIcon").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-2",
            "aria-hidden": "true"
          },
          {},
          {}
        )}
                Create New Listing`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "secondary",
      class: "justify-center py-6",
      "aria-label": "View all messages and inquiries"
    },
    {},
    {
      default: () => {
        return `${validate_component(UserIcon, "UserIcon").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-2",
            "aria-hidden": "true"
          },
          {},
          {}
        )}
                View Messages`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "ghost",
      class: "justify-center py-6 border-2 border-dashed border-gray-300 hover:border-brand-primary",
      "aria-label": "Manage property portfolio"
    },
    {},
    {
      default: () => {
        return `${validate_component(BuildingOfficeIcon, "BuildingOfficeIcon").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-2",
            "aria-hidden": "true"
          },
          {},
          {}
        )}
                Manage Portfolio`;
      }
    }
  )}</div></section>  <section aria-labelledby="activity-heading"><h2 id="activity-heading" class="text-xl font-semibold text-brand-text-primary mb-4" data-svelte-h="svelte-132wv44">Recent Activity</h2> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-6"><ul role="list" class="space-y-4">${each(recentActivity, (activity) => {
        return `<li class="flex items-start space-x-3"><div class="flex-shrink-0 w-2 h-2 bg-brand-primary rounded-full mt-2" aria-hidden="true"></div> <div class="flex-1 min-w-0"><p class="text-sm text-brand-text-primary">${escape(activity.message)}</p> <p class="text-xs text-brand-text-secondary mt-1">${escape(activity.time)}</p></div> </li>`;
      })}</ul> <div class="mt-6 pt-4 border-t border-brand-border dark:border-dark-border">${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          "aria-label": "View all recent activity"
        },
        {},
        {
          default: () => {
            return `View All Activity`;
          }
        }
      )}</div></div>`;
    }
  })}</section></main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
