import { c as create_ssr_component, v as validate_component, a as add_attribute } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { t as toast } from "../../../../chunks/stores.js";
const RequestsManagement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const requests = [];
  const setRequests = (r) => {
  };
  const showToast = (m) => {
  };
  if ($$props.requests === void 0 && $$bindings.requests && requests !== void 0) $$bindings.requests(requests);
  if ($$props.setRequests === void 0 && $$bindings.setRequests && setRequests !== void 0) $$bindings.setRequests(setRequests);
  if ($$props.showToast === void 0 && $$bindings.showToast && showToast !== void 0) $$bindings.showToast(showToast);
  return `${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h3 class="text-lg font-bold mb-4" data-svelte-h="svelte-wpovxh">Requests (placeholder)</h3> <p class="text-sm text-gray-500" data-svelte-h="svelte-4rw3l8">Requests management UI is available in the port — interactive features preserved where possible.</p>`;
    }
  })}`;
});
const AdminPanel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const userRole = "User";
  const showToast = () => {
  };
  let activeTab = "requests";
  if ($$props.userRole === void 0 && $$bindings.userRole && userRole !== void 0) $$bindings.userRole(userRole);
  if ($$props.showToast === void 0 && $$bindings.showToast && showToast !== void 0) $$bindings.showToast(showToast);
  return `<div class="space-y-6"><div><div class="border-b border-brand-border dark:border-dark-border"><div class="-mb-px flex space-x-2 overflow-x-auto" role="tablist" aria-label="Admin sections"><button id="tab-requests" type="button" role="tab"${add_attribute("aria-selected", activeTab === "requests", 0)} aria-controls="tabpanel-requests" aria-label="Requests tab" class="px-4 py-2 font-semibold rounded-t-lg">Requests</button> <button id="tab-kyc" type="button" role="tab"${add_attribute("aria-selected", activeTab === "kyc", 0)} aria-controls="tabpanel-kyc" aria-label="KYC Verification tab" class="px-4 py-2 font-semibold rounded-t-lg">KYC Verification</button> <button id="tab-subscriptions" type="button" role="tab"${add_attribute("aria-selected", activeTab === "subscriptions", 0)} aria-controls="tabpanel-subscriptions" aria-label="Subscriptions tab" class="px-4 py-2 font-semibold rounded-t-lg">Subscriptions</button> <button id="tab-global-ads" type="button" role="tab"${add_attribute("aria-selected", activeTab === "global_ads", 0)} aria-controls="tabpanel-global-ads" aria-label="Global Ads tab" class="px-4 py-2 font-semibold rounded-t-lg">Global Ads</button> <button id="tab-marketplace" type="button" role="tab"${add_attribute("aria-selected", activeTab === "marketplace", 0)} aria-controls="tabpanel-marketplace" aria-label="Marketplace tab" class="px-4 py-2 font-semibold rounded-t-lg">Marketplace</button></div></div></div> ${`<div id="tabpanel-requests" role="tabpanel" aria-labelledby="tab-requests">${validate_component(RequestsManagement, "RequestsManagement").$$render($$result, { showToast }, {}, {})}</div>`} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const showToast = (m) => toast.set({
    id: Date.now().toString(),
    message: m,
    type: "success"
  });
  return `<div class="p-6">${validate_component(AdminPanel, "AdminPanel").$$render($$result, { showToast }, {}, {})}</div>`;
});
export {
  Page as default
};
