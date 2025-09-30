import { c as create_ssr_component, a as add_attribute } from "./ssr.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<div${add_attribute("class", `bg-brand-surface dark:bg-dark-surface rounded-xl shadow-sm p-6 dark:border dark:border-dark-border ${className}`, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Card as C
};
