import { c as create_ssr_component, i as compute_rest_props, j as spread, l as escape_object, k as escape_attribute_value } from "./ssr.js";
const Heroicons_fallback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ariaHidden", "focusable"]);
  let { ariaHidden = "true" } = $$props;
  let { focusable = "false" } = $$props;
  if ($$props.ariaHidden === void 0 && $$bindings.ariaHidden && ariaHidden !== void 0) $$bindings.ariaHidden(ariaHidden);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0) $$bindings.focusable(focusable);
  return `<svg${spread(
    [
      escape_object($$restProps),
      {
        "aria-hidden": escape_attribute_value(ariaHidden)
      },
      {
        focusable: escape_attribute_value(focusable)
      },
      { viewBox: "0 0 24 24" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" }
    ],
    {}
  )}><rect width="24" height="24" fill="currentColor" opacity="0.05"></rect></svg>`;
});
const HomeIcon = Heroicons_fallback;
const ChartPieIcon = Heroicons_fallback;
const UsersIcon = Heroicons_fallback;
const CurrencyDollarIcon = Heroicons_fallback;
const UserCircleIcon = Heroicons_fallback;
const Cog6ToothIcon = Heroicons_fallback;
const InboxIcon = Heroicons_fallback;
const BuildingStorefrontIcon = Heroicons_fallback;
const BuildingLibraryIcon = Heroicons_fallback;
const PlusCircleIcon = Heroicons_fallback;
const EnvelopeIcon = Heroicons_fallback;
const CheckCircleIcon = Heroicons_fallback;
const XCircleIcon = Heroicons_fallback;
const InformationCircleIcon = Heroicons_fallback;
const StarIcon = Heroicons_fallback;
const ArrowDownIcon = Heroicons_fallback;
const ArrowUpIcon = Heroicons_fallback;
const ArrowsRightLeftIcon = Heroicons_fallback;
const PlusIcon = Heroicons_fallback;
const PencilIcon = Heroicons_fallback;
const EyeIcon = Heroicons_fallback;
const ChartBarIcon = Heroicons_fallback;
const BoltIcon = Heroicons_fallback;
const TrashIcon = Heroicons_fallback;
const BellIcon = Heroicons_fallback;
const MagnifyingGlassIcon = Heroicons_fallback;
const ChevronDownIcon = Heroicons_fallback;
const Squares2x2Icon = Heroicons_fallback;
const Bars3Icon = Heroicons_fallback;
const ChevronLeftIcon = Heroicons_fallback;
const ChevronRightIcon = Heroicons_fallback;
const WrenchScrewdriverIcon = Heroicons_fallback;
const ArchiveBoxIcon = Heroicons_fallback;
const PencilSquareIcon = Heroicons_fallback;
export {
  ArchiveBoxIcon as A,
  BuildingLibraryIcon as B,
  CurrencyDollarIcon as C,
  EnvelopeIcon as E,
  HomeIcon as H,
  InboxIcon as I,
  MagnifyingGlassIcon as M,
  PlusCircleIcon as P,
  StarIcon as S,
  TrashIcon as T,
  UsersIcon as U,
  WrenchScrewdriverIcon as W,
  XCircleIcon as X,
  UserCircleIcon as a,
  BuildingStorefrontIcon as b,
  Cog6ToothIcon as c,
  ChartPieIcon as d,
  BellIcon as e,
  ChevronDownIcon as f,
  InformationCircleIcon as g,
  CheckCircleIcon as h,
  PencilSquareIcon as i,
  Squares2x2Icon as j,
  Bars3Icon as k,
  ChevronLeftIcon as l,
  ChevronRightIcon as m,
  EyeIcon as n,
  ChartBarIcon as o,
  BoltIcon as p,
  PlusIcon as q,
  PencilIcon as r,
  ArrowDownIcon as s,
  ArrowUpIcon as t,
  ArrowsRightLeftIcon as u
};
