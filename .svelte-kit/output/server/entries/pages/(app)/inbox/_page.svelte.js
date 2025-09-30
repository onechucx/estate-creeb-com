import { c as create_ssr_component, a as spread, e as escape_object, v as validate_component, b as each, d as add_attribute, f as escape } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { M as MagnifyingGlassIcon } from "../../../../chunks/MagnifyingGlassIcon.js";
import { T as TrashIcon } from "../../../../chunks/TrashIcon.js";
const ArchiveBoxIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"></path></svg>`;
});
const PencilSquareIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path></svg>`;
});
const StarIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path></svg>`;
});
const Inbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let messages = [
    {
      id: "msg1",
      sender: "Tunde Adebayo",
      subject: "Re: Property Inquiry in Lekki",
      snippet: "Thanks for the swift response. I would like to schedule a viewing...",
      avatar: "/placeholder.svg",
      timestamp: "2 hours ago",
      read: false,
      starred: true,
      labels: ["inquiry", "lekki"]
    },
    {
      id: "msg2",
      sender: "Creeb Updates",
      subject: "New Feature: Boost Your Listings",
      snippet: "You can now boost your property listings to reach a wider audience.",
      avatar: "/placeholder.svg",
      timestamp: "Yesterday",
      read: false,
      starred: false,
      labels: ["update"]
    },
    {
      id: "msg3",
      sender: "Jemima O.",
      subject: "Investment Proposal",
      snippet: "Hi, I have an investment proposal I would like to discuss with you.",
      avatar: "/placeholder.svg",
      timestamp: "3 days ago",
      read: true,
      starred: false,
      labels: ["proposal"]
    },
    {
      id: "msg4",
      sender: "Admin",
      subject: "Welcome to Creeb!",
      snippet: "Welcome aboard! We are excited to have you with us. Here are some...",
      avatar: "/placeholder.svg",
      timestamp: "1 week ago",
      read: true,
      starred: false,
      labels: []
    }
  ];
  let selectedMessage = messages[0];
  return `<div class="p-4 sm:p-6 h-full flex flex-col"><div class="flex-shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"><h1 class="text-2xl font-bold text-brand-text-primary mb-4 sm:mb-0" data-svelte-h="svelte-tw7kdo">Inbox</h1> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      "aria-label": "Compose message",
      title: "Compose message"
    },
    {},
    {
      default: () => {
        return `${validate_component(PencilSquareIcon, "PencilSquare").$$render($$result, { class: "w-5 h-5 mr-2" }, {}, {})}
            Compose`;
      }
    }
  )}</div> <div class="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full"> <div class="md:col-span-1 lg:col-span-1 h-full">${validate_component(Card, "Card").$$render($$result, { class: "h-full flex flex-col" }, {}, {
    default: () => {
      return `<div class="p-4 border-b border-brand-border dark:border-dark-border"><div class="relative">${validate_component(MagnifyingGlassIcon, "MagnifyingGlass").$$render(
        $$result,
        {
          class: "w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
          "aria-hidden": "true",
          focusable: "false"
        },
        {},
        {}
      )} <input type="text" placeholder="Search mail" aria-label="Search messages" class="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary"></div></div> <div class="flex-grow overflow-y-auto"><ul>${each(messages, (message) => {
        return `<li class="border-b border-brand-border dark:border-dark-border"><button type="button" class="${"w-full text-left p-4 " + escape(
          selectedMessage.id === message.id ? "bg-blue-50 dark:bg-blue-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50",
          true
        )}"${add_attribute("aria-pressed", selectedMessage.id === message.id, 0)}${add_attribute("aria-label", `Open message from ${message.sender}: ${message.subject}`, 0)}><div class="flex justify-between items-start"><p class="font-semibold text-brand-text-primary">${escape(message.sender)}</p> ${!message.read ? `<span class="w-2 h-2 bg-brand-primary rounded-full" aria-hidden="true"></span>` : ``}</div> <p class="text-sm font-medium text-brand-text-primary truncate">${escape(message.subject)}</p> <p class="text-sm text-brand-text-secondary truncate">${escape(message.snippet)}</p> <p class="text-xs text-brand-text-secondary mt-1">${escape(message.timestamp)}</p></button> </li>`;
      })}</ul></div>`;
    }
  })}</div>  <div class="md:col-span-2 lg:col-span-3 h-full">${validate_component(Card, "Card").$$render($$result, { class: "h-full flex flex-col" }, {}, {
    default: () => {
      return `${selectedMessage ? `<div class="flex-shrink-0 p-4 border-b border-brand-border dark:border-dark-border flex justify-between items-center"><div><h2 class="text-lg font-bold text-brand-text-primary">${escape(selectedMessage.subject)}</h2> <div class="flex items-center space-x-2 mt-1"><img${add_attribute("src", selectedMessage.avatar.replace("http://placeimg.com", "https://loremflickr.com"), 0)}${add_attribute("alt", selectedMessage.sender, 0)} class="w-8 h-8 rounded-full"> <div><p class="text-sm font-semibold text-brand-text-primary">${escape(selectedMessage.sender)}</p> <p class="text-xs text-brand-text-secondary" data-svelte-h="svelte-2xsijj">to me</p></div></div></div> <div class="flex items-center space-x-2">${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "button",
          variant: "ghost",
          "aria-label": "Star message"
        },
        {},
        {
          default: () => {
            return `${validate_component(StarIcon, "Star").$$render($$result, { class: "w-5 h-5", "aria-hidden": "true" }, {}, {})}`;
          }
        }
      )} ${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "button",
          variant: "ghost",
          "aria-label": "Archive message"
        },
        {},
        {
          default: () => {
            return `${validate_component(ArchiveBoxIcon, "ArchiveBox").$$render($$result, { class: "w-5 h-5", "aria-hidden": "true" }, {}, {})}`;
          }
        }
      )} ${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "button",
          variant: "ghost",
          class: "text-red-500",
          "aria-label": "Delete message"
        },
        {},
        {
          default: () => {
            return `${validate_component(TrashIcon, "Trash").$$render($$result, { class: "w-5 h-5", "aria-hidden": "true" }, {}, {})}`;
          }
        }
      )}</div></div> <div class="flex-grow p-6 overflow-y-auto prose dark:prose-invert max-w-none"><p>${escape(selectedMessage.snippet)}</p> <br> <p data-svelte-h="svelte-1q1qz65">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> <br> <p data-svelte-h="svelte-1vc28hw">Regards,</p> <p>${escape(selectedMessage.sender)}</p></div> <div class="flex-shrink-0 p-4 border-t border-brand-border dark:border-dark-border"><textarea class="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-dark-border"${add_attribute("placeholder", "Reply to " + selectedMessage.sender, 0)} rows="3"></textarea> <div class="flex justify-end mt-2">${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "button",
          "aria-label": `Send reply to ${selectedMessage.sender}`
        },
        {},
        {
          default: () => {
            return `Send Reply`;
          }
        }
      )}</div></div>` : `<div class="flex-grow flex items-center justify-center" data-svelte-h="svelte-hjp3it"><div class="text-center"><p class="text-brand-text-secondary">Select a message to read</p></div></div>`}`;
    }
  })}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Inbox, "Inbox").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
