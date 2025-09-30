import { c as create_ssr_component, v as validate_component, a as add_attribute, b as createEventDispatcher, e as escape } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/Button.js";
import { H as HomeIcon, M as MagnifyingGlassIcon, U as UsersIcon, Q as QuestionMarkCircleIcon, B as Bars3Icon, X as XMarkIcon, E as EyeIcon } from "../../chunks/heroicons-fallback.js";
import { T as Toast } from "../../chunks/Toast.js";
const PublicHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onLoginClick } = $$props;
  let mobileMenuOpen = false;
  if ($$props.onLoginClick === void 0 && $$bindings.onLoginClick && onLoginClick !== void 0) $$bindings.onLoginClick(onLoginClick);
  return ` <header class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700" role="banner"><div class="container mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"> <div class="flex items-center" data-svelte-h="svelte-1isegiv"><a href="/" class="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg p-1"><svg aria-hidden="true" focusable="false" class="h-10 w-10 text-brand-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg> <h1 class="text-2xl font-bold text-brand-primary ml-3">Creeb</h1></a></div>  <nav class="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation"><a href="/" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary rounded px-2 py-1">${validate_component(HomeIcon, "HomeIcon").$$render(
    $$result,
    {
      class: "w-4 h-4 mr-2",
      "aria-hidden": "true"
    },
    {},
    {}
  )}
                    Home</a> <a href="/marketplace" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary rounded px-2 py-1">${validate_component(MagnifyingGlassIcon, "MagnifyingGlassIcon").$$render(
    $$result,
    {
      class: "w-4 h-4 mr-2",
      "aria-hidden": "true"
    },
    {},
    {}
  )}
                    Browse Properties</a> <a href="/community" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary rounded px-2 py-1">${validate_component(UsersIcon, "UsersIcon").$$render(
    $$result,
    {
      class: "w-4 h-4 mr-2",
      "aria-hidden": "true"
    },
    {},
    {}
  )}
                    Community</a> <a href="/support" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary rounded px-2 py-1">${validate_component(QuestionMarkCircleIcon, "QuestionMarkCircleIcon").$$render(
    $$result,
    {
      class: "w-4 h-4 mr-2",
      "aria-hidden": "true"
    },
    {},
    {}
  )}
                    Support</a></nav>  <div class="hidden md:flex items-center space-x-3">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "secondary",
      "aria-label": "Open login dialog"
    },
    {},
    {
      default: () => {
        return `Login`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "primary",
      "aria-label": "Create new account"
    },
    {},
    {
      default: () => {
        return `Sign Up`;
      }
    }
  )}</div>  <button type="button" class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"${add_attribute("aria-expanded", mobileMenuOpen, 0)} aria-controls="mobile-menu"${add_attribute(
    "aria-label",
    "Open mobile menu",
    0
  )}>${`${validate_component(Bars3Icon, "Bars3Icon").$$render($$result, { class: "w-6 h-6", "aria-hidden": "true" }, {}, {})}`}</button></div>  ${``}</div></header>`;
});
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { title = "" } = $$props;
  let { closeOnEscape = true } = $$props;
  let { closeOnBackdrop = true } = $$props;
  createEventDispatcher();
  let modalElement;
  let previousActiveElement = null;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnBackdrop === void 0 && $$bindings.closeOnBackdrop && closeOnBackdrop !== void 0) $$bindings.closeOnBackdrop(closeOnBackdrop);
  {
    if (open) {
      previousActiveElement = document.activeElement;
      setTimeout(
        () => {
        },
        100
      );
    } else if (previousActiveElement) {
      previousActiveElement.focus();
      previousActiveElement = null;
    }
  }
  return ` ${open ? `   <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true"${add_attribute("aria-labelledby", title ? "modal-title" : void 0, 0)}> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" role="document"${add_attribute("this", modalElement, 0)}> ${title ? `<div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4"><h2 id="modal-title" class="text-xl font-semibold text-gray-900 dark:text-white">${escape(title)}</h2></div>` : ``}  <div${add_attribute("class", title ? "" : "p-6", 0)}>${slots.default ? slots.default({}) : ``}</div></div></div>` : ``}`;
});
const LoginModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let email = "";
  let password = "";
  let isLoading = false;
  let rememberMe = false;
  let errors = {};
  let emailInput;
  return `${validate_component(Modal, "Modal").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-6" role="dialog" aria-labelledby="auth-title" aria-modal="true"> <div class="flex items-center justify-between mb-6"><h2 id="auth-title" class="text-2xl font-bold text-gray-900 dark:text-white">${escape("Welcome Back")}</h2> <button type="button" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg" aria-label="Close login modal">${validate_component(XMarkIcon, "XMarkIcon").$$render($$result, { class: "w-5 h-5", "aria-hidden": "true" }, {}, {})}</button></div>  <form class="space-y-6"> ${``}  <div><label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-svelte-h="svelte-1prz40g">Email Address <span class="text-red-500" aria-label="required">*</span></label> <input id="email" type="email" required class="${[
        "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent",
        errors.email ? "border-red-500" : ""
      ].join(" ").trim()}" placeholder="Enter your email"${add_attribute("aria-describedby", errors.email ? "email-error" : void 0, 0)}${add_attribute("value", email, 0)}${add_attribute("this", emailInput, 0)}> ${errors.email ? `<p id="email-error" class="mt-1 text-sm text-red-600" role="alert">${escape(errors.email)}</p>` : ``}</div>  <div><label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-svelte-h="svelte-1wh7yf0">Password <span class="text-red-500" aria-label="required">*</span></label> <div class="relative">${`<input id="password" type="password" required class="${[
        "w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent",
        errors.password ? "border-red-500" : ""
      ].join(" ").trim()}" placeholder="Enter your password"${add_attribute("aria-describedby", errors.password ? "password-error" : "password-help", 0)}${add_attribute("value", password, 0)}>`} <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded"${add_attribute("aria-label", "Show password", 0)}>${`${validate_component(EyeIcon, "EyeIcon").$$render($$result, { class: "w-5 h-5", "aria-hidden": "true" }, {}, {})}`}</button></div> ${errors.password ? `<p id="password-error" class="mt-1 text-sm text-red-600" role="alert">${escape(errors.password)}</p>` : `${`<p id="password-help" class="mt-1 text-sm text-gray-500" data-svelte-h="svelte-1udzquv">Minimum 6 characters required</p>`}`}</div>  ${``}  ${`<div class="flex items-center justify-between"><label class="flex items-center"><input type="checkbox" class="rounded border-gray-300 text-brand-primary focus:ring-brand-primary focus:ring-2"${add_attribute("checked", rememberMe, 1)}> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300" data-svelte-h="svelte-2yly92">Remember me</span></label> <button type="button" class="text-sm text-brand-primary hover:underline focus:underline focus:outline-none" aria-label="Reset your password" data-svelte-h="svelte-1boeazc">Forgot password?</button></div>`}  ${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "submit",
          variant: "primary",
          class: "w-full py-3 text-lg",
          disabled: isLoading,
          "aria-label": "Sign in to your account"
        },
        {},
        {
          default: () => {
            return `${`${escape("Sign In")}`}`;
          }
        }
      )}</form>  <div class="mt-6 text-center border-t border-gray-200 dark:border-gray-700 pt-6"><p class="text-sm text-gray-600 dark:text-gray-400">${escape("Don't have an account?")} <button type="button" class="text-brand-primary hover:underline focus:underline focus:outline-none font-medium ml-1"${add_attribute("aria-label", "Switch to sign up", 0)}>${escape("Sign Up")}</button></p></div>  ${``}</div>`;
    }
  })}`;
});
let toastMessage = null;
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showLoginModal = false;
  function handleLoginClick() {
    showLoginModal = true;
  }
  function handleCloseLogin() {
    showLoginModal = false;
  }
  return `${validate_component(PublicHeader, "PublicHeader").$$render($$result, { onLoginClick: handleLoginClick }, {}, {})} ${slots.default ? slots.default({}) : ``} ${validate_component(Toast, "Toast").$$render($$result, { message: toastMessage }, {}, {})} ${validate_component(LoginModal, "LoginModal").$$render(
    $$result,
    {
      open: showLoginModal,
      onClose: handleCloseLogin
    },
    {},
    {}
  )}`;
});
export {
  Layout as default
};
