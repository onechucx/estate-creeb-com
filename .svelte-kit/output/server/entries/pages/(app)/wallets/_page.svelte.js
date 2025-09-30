import { c as create_ssr_component, v as validate_component, b as escape, e as each, m as missing_component } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { J as ArrowDownIcon, K as ArrowUpIcon, L as ArrowsRightLeftIcon, i as PlusIcon } from "../../../../chunks/heroicons-fallback.js";
const Wallets = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let wallets = [
    {
      id: "wallet1",
      currency: "Naira",
      symbol: "NGN",
      balance: 12500005e-1,
      history: [
        { date: "Jan", value: 5e5 },
        { date: "Feb", value: 75e4 },
        { date: "Mar", value: 65e4 },
        { date: "Apr", value: 85e4 },
        { date: "May", value: 11e5 },
        { date: "Jun", value: 125e4 }
      ]
    },
    {
      id: "wallet2",
      currency: "Rubby",
      symbol: "RBY",
      balance: 5e4,
      history: [
        { date: "Jan", value: 1e4 },
        { date: "Feb", value: 15e3 },
        { date: "Mar", value: 25e3 },
        { date: "Apr", value: 2e4 },
        { date: "May", value: 4e4 },
        { date: "Jun", value: 5e4 }
      ]
    }
  ];
  let transactions = [
    {
      id: "txn1",
      type: "deposit",
      status: "completed",
      amount: 5e4,
      currency: "NGN",
      date: /* @__PURE__ */ new Date("2023-10-26T10:00:00Z"),
      description: "Bank Deposit"
    },
    {
      id: "txn2",
      type: "withdrawal",
      status: "completed",
      amount: 25e3,
      currency: "NGN",
      date: /* @__PURE__ */ new Date("2023-10-25T15:30:00Z"),
      description: "Withdrawal to GTBank"
    },
    {
      id: "txn3",
      type: "transfer",
      status: "pending",
      amount: 1e3,
      currency: "RBY",
      date: /* @__PURE__ */ new Date("2023-10-24T12:00:00Z"),
      description: "Transfer to @jemima"
    },
    {
      id: "txn4",
      type: "investment",
      status: "completed",
      amount: 1e5,
      currency: "NGN",
      date: /* @__PURE__ */ new Date("2023-10-22T09:00:00Z"),
      description: 'Investment in "Lekki Gardens"'
    }
  ];
  let selectedWallet = wallets[0];
  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  const getTransactionIcon = (type) => {
    switch (type) {
      case "deposit":
        return { icon: ArrowDownIcon, class: "text-green-500" };
      case "withdrawal":
        return { icon: ArrowUpIcon, class: "text-red-500" };
      case "transfer":
        return {
          icon: ArrowsRightLeftIcon,
          class: "text-blue-500"
        };
      default:
        return { icon: PlusIcon, class: "text-gray-500" };
    }
  };
  return `<div class="p-4 sm:p-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"><h1 class="text-2xl font-bold text-brand-text-primary mb-4 sm:mb-0" data-svelte-h="svelte-1lmjfyy">Wallets</h1> <div class="flex items-center space-x-2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "secondary",
      "aria-label": "Deposit funds"
    },
    {},
    {
      default: () => {
        return `${validate_component(ArrowDownIcon, "ArrowDown").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-2",
            "aria-hidden": "true",
            focusable: "false"
          },
          {},
          {}
        )}
                Deposit`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "secondary",
      "aria-label": "Withdraw funds"
    },
    {},
    {
      default: () => {
        return `${validate_component(ArrowUpIcon, "ArrowUp").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-2",
            "aria-hidden": "true",
            focusable: "false"
          },
          {},
          {}
        )}
                Withdraw`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      "aria-label": "Send funds"
    },
    {},
    {
      default: () => {
        return `${validate_component(ArrowsRightLeftIcon, "ArrowsRightLeft").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-2",
            "aria-hidden": "true",
            focusable: "false"
          },
          {},
          {}
        )}
                Send`;
      }
    }
  )}</div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2">${validate_component(Card, "Card").$$render($$result, { "aria-label": "Wallet balance card" }, {}, {
    default: () => {
      return `<div class="p-4"><div class="flex justify-between items-center mb-4"><div><p class="text-sm text-brand-text-secondary">${escape(selectedWallet.currency)} Balance</p> <p class="text-3xl font-bold text-brand-text-primary">${escape(selectedWallet.symbol)}${escape(selectedWallet.balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))}</p></div> <div class="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1" role="tablist" aria-label="Wallet selector">${each(wallets, (wallet) => {
        return `${validate_component(Button, "Button").$$render(
          $$result,
          {
            type: "button",
            "aria-pressed": selectedWallet.id === wallet.id,
            "aria-label": `Select ${wallet.currency} wallet`,
            class: "!text-xs !py-1 !px-3 " + (selectedWallet.id === wallet.id ? "bg-brand-surface dark:bg-dark-surface shadow" : "bg-transparent border-transparent")
          },
          {},
          {
            default: () => {
              return `${escape(wallet.currency)} `;
            }
          }
        )}`;
      })}</div></div> <div class="h-64" data-svelte-h="svelte-ah11ly"> <div class="h-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-lg"></div></div></div>`;
    }
  })}</div> <div class="space-y-6">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-4"><h3 class="font-bold text-lg mb-4 text-brand-text-primary" data-svelte-h="svelte-1nr3n7j">Quick Actions</h3> <div class="space-y-3">${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "button",
          "aria-label": "Fund wallet",
          class: "w-full justify-center"
        },
        {},
        {
          default: () => {
            return `Fund Wallet`;
          }
        }
      )} ${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "button",
          variant: "secondary",
          "aria-label": "Buy Rubby",
          class: "w-full justify-center"
        },
        {},
        {
          default: () => {
            return `Buy Rubby`;
          }
        }
      )} ${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "button",
          variant: "secondary",
          "aria-label": "Sell Rubby",
          class: "w-full justify-center"
        },
        {},
        {
          default: () => {
            return `Sell Rubby`;
          }
        }
      )}</div></div>`;
    }
  })}</div></div> <div class="mt-6">${validate_component(Card, "Card").$$render($$result, { "aria-label": "Transaction history" }, {}, {
    default: () => {
      return `<div class="p-4" data-svelte-h="svelte-1768jac"><h3 class="font-bold text-lg mb-4 text-brand-text-primary">Transaction History</h3></div> <div class="overflow-x-auto" role="region" aria-label="Transaction history table"><table class="w-full text-left" aria-describedby="transaction-help"><thead class="border-b border-brand-border dark:border-dark-border" data-svelte-h="svelte-b300km"><tr class="text-sm text-brand-text-secondary"><th scope="col" class="p-4 font-medium">Transaction</th> <th scope="col" class="p-4 font-medium hidden md:table-cell">Date</th> <th scope="col" class="p-4 font-medium hidden sm:table-cell">Amount</th> <th scope="col" class="p-4 font-medium">Status</th></tr></thead> <tbody class="divide-y divide-brand-border dark:divide-dark-border">${each(transactions, (tx) => {
        return `<tr class="text-brand-text-primary"><td class="p-4"><div class="flex items-center"><div class="${"w-8 h-8 rounded-full flex items-center justify-center mr-3 " + escape(getTransactionIcon(tx.type).class.replace("text-", "bg-") + "/20", true)}">${validate_component(getTransactionIcon(tx.type).icon || missing_component, "svelte:component").$$render(
          $$result,
          {
            class: "w-5 h-5 " + getTransactionIcon(tx.type).class
          },
          {},
          {}
        )}</div> <div><p class="font-semibold capitalize">${escape(tx.type)}</p> <p class="text-sm text-brand-text-secondary">${escape(tx.description)}</p></div> </div></td> <td class="p-4 text-sm text-brand-text-secondary hidden md:table-cell">${escape(new Intl.DateTimeFormat(
          "en-US",
          {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }
        ).format(tx.date))}</td> <td class="p-4 font-semibold hidden sm:table-cell">${escape(tx.currency === "NGN" ? "₦" : "")}${escape(tx.amount.toLocaleString())}${escape(tx.currency !== "NGN" ? ` ${tx.currency}` : "")}</td> <td class="p-4"><span class="${"text-xs font-medium px-2 py-1 rounded-full capitalize " + escape(getStatusClass(tx.status), true)}">${escape(tx.status)} </span></td> </tr>`;
      })}</tbody></table></div>`;
    }
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Wallets, "Wallets").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
