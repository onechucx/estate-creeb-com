import { c as create_ssr_component, b as createEventDispatcher, o as onDestroy, v as validate_component, e as escape, m as missing_component } from "./ssr.js";
import { i as InformationCircleIcon, j as XCircleIcon, k as CheckCircleIcon } from "./heroicons-fallback.js";
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
export {
  Toast as T
};
