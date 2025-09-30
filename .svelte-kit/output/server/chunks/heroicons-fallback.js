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
const ShieldCheckIcon = Heroicons_fallback;
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
const QuestionMarkCircleIcon = Heroicons_fallback;
const ChatBubbleLeftRightIcon = Heroicons_fallback;
const PhoneIcon = Heroicons_fallback;
const DocumentTextIcon = Heroicons_fallback;
const ChatBubbleLeftIcon = Heroicons_fallback;
const HeartIcon = Heroicons_fallback;
const ShareIcon = Heroicons_fallback;
const BuildingOfficeIcon = Heroicons_fallback;
const UserIcon = Heroicons_fallback;
const MapIcon = Heroicons_fallback;
const CogIcon = Heroicons_fallback;
export {
  ArchiveBoxIcon as A,
  BuildingLibraryIcon as B,
  CurrencyDollarIcon as C,
  ChatBubbleLeftRightIcon as D,
  EnvelopeIcon as E,
  DocumentTextIcon as F,
  PhoneIcon as G,
  HomeIcon as H,
  InboxIcon as I,
  ArrowDownIcon as J,
  ArrowUpIcon as K,
  ArrowsRightLeftIcon as L,
  MagnifyingGlassIcon as M,
  PlusCircleIcon as P,
  QuestionMarkCircleIcon as Q,
  ShieldCheckIcon as S,
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
  PlusIcon as i,
  ChatBubbleLeftIcon as j,
  HeartIcon as k,
  ShareIcon as l,
  BuildingOfficeIcon as m,
  UserIcon as n,
  MapIcon as o,
  EyeIcon as p,
  PencilIcon as q,
  PencilSquareIcon as r,
  StarIcon as s,
  Squares2x2Icon as t,
  Bars3Icon as u,
  ChevronLeftIcon as v,
  ChevronRightIcon as w,
  ChartBarIcon as x,
  BoltIcon as y,
  CogIcon as z
};
