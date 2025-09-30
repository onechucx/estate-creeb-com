import { c as create_ssr_component, i as compute_rest_props, j as spread, k as escape_attribute_value, l as escape_object } from "./ssr.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["className", "role", "ariaLabel", "ariaLabelledby", "ariaDescribedby", "tabindex"]);
  let { className = "" } = $$props;
  let { role = void 0 } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { ariaLabelledby = void 0 } = $$props;
  let { ariaDescribedby = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  if ($$props.ariaLabelledby === void 0 && $$bindings.ariaLabelledby && ariaLabelledby !== void 0) $$bindings.ariaLabelledby(ariaLabelledby);
  if ($$props.ariaDescribedby === void 0 && $$bindings.ariaDescribedby && ariaDescribedby !== void 0) $$bindings.ariaDescribedby(ariaDescribedby);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0) $$bindings.tabindex(tabindex);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(`bg-brand-surface dark:bg-dark-surface rounded-xl shadow-sm p-6 dark:border dark:border-dark-border ${className}`)
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-labelledby": escape_attribute_value(ariaLabelledby)
      },
      {
        "aria-describedby": escape_attribute_value(ariaDescribedby)
      },
      {
        tabindex: escape_attribute_value(tabindex)
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Card as C
};
