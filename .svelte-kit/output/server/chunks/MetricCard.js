import { c as create_ssr_component, a as add_attribute, v as validate_component, b as escape, m as missing_component } from "./ssr.js";
const MetricCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label } = $$props;
  let { value } = $$props;
  let { icon } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  return `<div class="p-4 bg-brand-surface dark:bg-dark-surface rounded-lg shadow" role="region"${add_attribute("aria-label", label, 0)}><div class="flex items-center">${icon ? `${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    {
      class: "h-6 w-6 mr-3",
      "aria-hidden": "true",
      focusable: "false"
    },
    {},
    {}
  )}` : ``} <div><div class="text-sm text-brand-text-secondary">${escape(label)}</div> <div class="font-bold text-xl">${escape(value)}</div></div></div></div>`;
});
export {
  MetricCard as M
};
