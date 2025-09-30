import { c as create_ssr_component, a as spread, e as escape_object } from "./ssr.js";
const MagnifyingGlassIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>`;
});
export {
  MagnifyingGlassIcon as M
};
