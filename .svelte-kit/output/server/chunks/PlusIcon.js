import { c as create_ssr_component, a as spread, e as escape_object } from "./ssr.js";
const PlusIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>`;
});
export {
  PlusIcon as P
};
