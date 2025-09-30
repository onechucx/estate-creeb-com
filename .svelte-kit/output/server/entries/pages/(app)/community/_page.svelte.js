import { c as create_ssr_component, v as validate_component, f as each, e as escape, m as missing_component } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { l as PlusIcon, U as UsersIcon, m as ChatBubbleLeftIcon, n as HeartIcon, o as ShareIcon } from "../../../../chunks/heroicons-fallback.js";
const Community = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const communityStats = [
    {
      label: "Active Members",
      value: "2,847",
      icon: UsersIcon
    },
    {
      label: "Discussions",
      value: "156",
      icon: ChatBubbleLeftIcon
    },
    {
      label: "This Week",
      value: "23",
      icon: PlusIcon
    }
  ];
  const discussions = [
    {
      id: 1,
      title: "Best neighborhoods for young professionals in Lagos",
      author: "Sarah Johnson",
      replies: 12,
      likes: 24,
      lastActivity: "2 hours ago",
      category: "Housing Advice"
    },
    {
      id: 2,
      title: "Property investment tips for beginners",
      author: "Michael Chen",
      replies: 8,
      likes: 18,
      lastActivity: "5 hours ago",
      category: "Investment"
    },
    {
      id: 3,
      title: "Maintenance costs for high-rise apartments",
      author: "Amara Okafor",
      replies: 15,
      likes: 31,
      lastActivity: "1 day ago",
      category: "Maintenance"
    }
  ];
  return `<main class="p-4 sm:p-6"> <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"><div data-svelte-h="svelte-120y5nb"><h1 class="text-3xl font-bold text-brand-text-primary">Community</h1> <p class="text-lg text-brand-text-secondary mt-2">Connect with fellow property enthusiasts and experts.</p></div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "primary",
      class: "mt-4 sm:mt-0",
      "aria-label": "Start a new discussion"
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
            Start Discussion`;
      }
    }
  )}</div>  <section aria-labelledby="stats-heading" class="mb-8"><h2 id="stats-heading" class="sr-only" data-svelte-h="svelte-1p7w9qx">Community Statistics</h2> <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">${each(communityStats, (stat) => {
    return `${validate_component(Card, "Card").$$render($$result, { class: "text-center" }, {}, {
      default: () => {
        return `<div class="p-6"><div class="flex justify-center mb-4">${validate_component(stat.icon || missing_component, "svelte:component").$$render(
          $$result,
          {
            class: "w-8 h-8 text-brand-primary",
            "aria-hidden": "true"
          },
          {},
          {}
        )}</div> <div class="text-2xl font-bold text-brand-text-primary">${escape(stat.value)}</div> <div class="text-sm text-brand-text-secondary mt-1">${escape(stat.label)}</div></div> `;
      }
    })}`;
  })}</div></section>  <section aria-labelledby="categories-heading" class="mb-8"><h2 id="categories-heading" class="text-xl font-semibold text-brand-text-primary mb-4" data-svelte-h="svelte-ot1sa0">Popular Categories</h2> <div class="flex flex-wrap gap-3">${each(["Housing Advice", "Investment", "Maintenance", "Legal", "Market Trends"], (category) => {
    return `<button type="button" class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-brand-text-primary rounded-full hover:bg-brand-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" aria-label="${"Filter discussions by " + escape(category, true)}">${escape(category)} </button>`;
  })}</div></section>  <section aria-labelledby="discussions-heading"><h2 id="discussions-heading" class="text-xl font-semibold text-brand-text-primary mb-4" data-svelte-h="svelte-lqo4z6">Recent Discussions</h2> <div class="space-y-4">${each(discussions, (discussion) => {
    return `${validate_component(Card, "Card").$$render(
      $$result,
      {
        class: "hover:shadow-lg transition-shadow duration-200"
      },
      {},
      {
        default: () => {
          return `<article class="p-6"><div class="flex items-start justify-between"><div class="flex-1"><div class="flex items-center space-x-2 mb-2"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary">${escape(discussion.category)}</span> <span class="text-sm text-brand-text-secondary">${escape(discussion.lastActivity)}</span></div> <h3 class="text-lg font-semibold text-brand-text-primary mb-2"><a href="${"/community/discussion/" + escape(discussion.id, true)}" class="hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:underline" aria-describedby="${"discussion-" + escape(discussion.id, true) + "-meta"}">${escape(discussion.title)} </a></h3> <div id="${"discussion-" + escape(discussion.id, true) + "-meta"}" class="flex items-center space-x-4 text-sm text-brand-text-secondary"><span>by ${escape(discussion.author)}</span> <span>${escape(discussion.replies)} replies</span></div> </div></div> <div class="flex items-center justify-between mt-4 pt-4 border-t border-brand-border dark:border-dark-border"><div class="flex items-center space-x-4"><button type="button" class="flex items-center space-x-2 text-brand-text-secondary hover:text-brand-primary focus:text-brand-primary focus:outline-none" aria-label="${"Like discussion: " + escape(discussion.title, true)}">${validate_component(HeartIcon, "HeartIcon").$$render($$result, { class: "w-4 h-4", "aria-hidden": "true" }, {}, {})} <span>${escape(discussion.likes)}</span></button> <button type="button" class="flex items-center space-x-2 text-brand-text-secondary hover:text-brand-primary focus:text-brand-primary focus:outline-none" aria-label="${"Share discussion: " + escape(discussion.title, true)}">${validate_component(ShareIcon, "ShareIcon").$$render($$result, { class: "w-4 h-4", "aria-hidden": "true" }, {}, {})} <span data-svelte-h="svelte-1ahaqi7">Share</span> </button></div> ${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              "aria-label": "View discussion: " + discussion.title
            },
            {},
            {
              default: () => {
                return `View Discussion
                            `;
              }
            }
          )} </div></article> `;
        }
      }
    )}`;
  })}</div></section></main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(Community, "Community").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
