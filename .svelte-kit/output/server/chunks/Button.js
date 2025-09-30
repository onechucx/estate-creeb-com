import { c as create_ssr_component, i as compute_rest_props, j as spread, k as escape_attribute_value, l as escape_object } from "./ssr.js";
const baseClasses = "px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let extraClass;
  let restProps;
  let $$restProps = compute_rest_props($$props, ["variant", "type", "disabled", "title", "form", "className"]);
  let { variant = "primary" } = $$props;
  let { type = "button" } = $$props;
  let { disabled = false } = $$props;
  let { title = void 0 } = $$props;
  let { form = void 0 } = $$props;
  let { className = "" } = $$props;
  const variantClasses = {
    primary: "bg-brand-primary text-white hover:bg-blue-800 focus:ring-brand-primary dark:bg-dark-primary dark:hover:bg-blue-500 dark:focus:ring-blue-400",
    secondary: "bg-gray-200 text-brand-text-primary hover:bg-gray-300 focus:ring-gray-400 dark:bg-dark-surface dark:text-dark-text-primary dark:hover:bg-gray-700 dark:focus:ring-gray-500 border border-gray-300 dark:border-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  let finalClasses;
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  extraClass = $$restProps && $$restProps.class || "";
  finalClasses = `${baseClasses} ${variantClasses[variant]} ${className} ${extraClass}`.trim();
  restProps = (() => {
    const { class: _cls, ...r } = $$restProps;
    return r;
  })();
  return `<button${spread(
    [
      { type: escape_attribute_value(type) },
      {
        class: escape_attribute_value(finalClasses)
      },
      { disabled: disabled || null },
      { title: escape_attribute_value(title) },
      { form: escape_attribute_value(form) },
      escape_object(restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>`;
});
export {
  Button as B
};
