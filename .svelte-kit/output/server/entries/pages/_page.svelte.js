import { c as create_ssr_component, d as createEventDispatcher, v as validate_component, e as each, b as escape, m as missing_component } from "../../chunks/ssr.js";
import { M as Marketplace } from "../../chunks/Marketplace.js";
import { B as Button } from "../../chunks/Button.js";
import { M as MagnifyingGlassIcon, H as HomeIcon, S as ShieldCheckIcon, U as UsersIcon, C as CurrencyDollarIcon } from "../../chunks/heroicons-fallback.js";
import { C as Card } from "../../chunks/Card.js";
import { i as initialListings } from "../../chunks/stores.js";
const PublicHomePage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onLoginSuccess = () => {
  } } = $$props;
  let { listings = [] } = $$props;
  createEventDispatcher();
  const features = [
    {
      icon: HomeIcon,
      title: "Browse Properties",
      description: "Discover thousands of verified properties across Nigeria with detailed photos and information."
    },
    {
      icon: ShieldCheckIcon,
      title: "Verified Listings",
      description: "All properties are verified by our team to ensure accuracy and prevent fraud."
    },
    {
      icon: UsersIcon,
      title: "Connect with Community",
      description: "Join discussions, get advice, and connect with other property seekers and owners."
    },
    {
      icon: CurrencyDollarIcon,
      title: "Transparent Pricing",
      description: "No hidden fees. Clear pricing structure for all our services and listings."
    }
  ];
  const stats = [
    {
      label: "Active Properties",
      value: "10,000+"
    },
    {
      label: "Happy Customers",
      value: "25,000+"
    },
    { label: "Cities Covered", value: "50+" },
    {
      label: "Years of Experience",
      value: "5+"
    }
  ];
  if ($$props.onLoginSuccess === void 0 && $$bindings.onLoginSuccess && onLoginSuccess !== void 0) $$bindings.onLoginSuccess(onLoginSuccess);
  if ($$props.listings === void 0 && $$bindings.listings && listings !== void 0) $$bindings.listings(listings);
  return `<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"> <section class="relative py-20 lg:py-32" role="banner"><div class="container mx-auto px-6 lg:px-8"><div class="text-center max-w-4xl mx-auto"><h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6" data-svelte-h="svelte-112hpa9">Find Your Perfect 
                    <span class="text-brand-primary">Home</span> 
                    in Nigeria</h1> <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed" data-svelte-h="svelte-2indj1">Discover, connect, and secure your ideal property with Nigeria&#39;s most trusted real estate platform.</p> <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "primary",
      class: "text-lg px-8 py-3",
      "aria-label": "Browse available properties"
    },
    {},
    {
      default: () => {
        return `${validate_component(MagnifyingGlassIcon, "MagnifyingGlassIcon").$$render(
          $$result,
          {
            class: "w-5 h-5 mr-2",
            "aria-hidden": "true"
          },
          {},
          {}
        )}
                        Browse Properties`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "secondary",
      class: "text-lg px-8 py-3",
      "aria-label": "Sign up for Creeb account"
    },
    {},
    {
      default: () => {
        return `Get Started`;
      }
    }
  )}</div></div></div></section>  <section class="py-16 bg-white dark:bg-gray-800" aria-labelledby="stats-heading"><div class="container mx-auto px-6 lg:px-8"><h2 id="stats-heading" class="sr-only" data-svelte-h="svelte-9zxagv">Platform Statistics</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-8">${each(stats, (stat) => {
    return `<div class="text-center"><div class="text-3xl md:text-4xl font-bold text-brand-primary mb-2">${escape(stat.value)}</div> <div class="text-gray-600 dark:text-gray-300 font-medium">${escape(stat.label)}</div> </div>`;
  })}</div></div></section>  <section class="py-20" aria-labelledby="features-heading"><div class="container mx-auto px-6 lg:px-8"><div class="text-center max-w-3xl mx-auto mb-16" data-svelte-h="svelte-n89b9c"><h2 id="features-heading" class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Creeb?</h2> <p class="text-xl text-gray-600 dark:text-gray-300">We provide comprehensive real estate solutions with cutting-edge technology and personalized service.</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">${each(features, (feature) => {
    return `${validate_component(Card, "Card").$$render(
      $$result,
      {
        class: "text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      },
      {},
      {
        default: () => {
          return `<div class="p-8"><div class="inline-flex items-center justify-center w-16 h-16 bg-brand-primary bg-opacity-10 rounded-full mb-6">${validate_component(feature.icon || missing_component, "svelte:component").$$render(
            $$result,
            {
              class: "w-8 h-8 text-brand-primary",
              "aria-hidden": "true"
            },
            {},
            {}
          )}</div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">${escape(feature.title)}</h3> <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${escape(feature.description)} </p></div> `;
        }
      }
    )}`;
  })}</div></div></section>  <section class="py-20 bg-brand-primary" aria-labelledby="cta-heading"><div class="container mx-auto px-6 lg:px-8 text-center"><h2 id="cta-heading" class="text-3xl md:text-4xl font-bold text-white mb-6" data-svelte-h="svelte-1thpepx">Ready to Find Your Dream Home?</h2> <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto" data-svelte-h="svelte-1tk862u">Join thousands of satisfied customers who have found their perfect properties through Creeb.</p> <div class="flex flex-col sm:flex-row justify-center gap-4">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "secondary",
      class: "text-lg px-8 py-3 bg-white text-brand-primary hover:bg-gray-100",
      "aria-label": "Create your account"
    },
    {},
    {
      default: () => {
        return `Get Started Today`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "outline",
      class: "text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-brand-primary",
      "aria-label": "Learn more about Creeb"
    },
    {},
    {
      default: () => {
        return `Learn More`;
      }
    }
  )}</div></div></section>  <section class="py-20" aria-labelledby="properties-heading"><div class="container mx-auto px-6 lg:px-8"><div class="text-center mb-12" data-svelte-h="svelte-1g9db47"><h2 id="properties-heading" class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Properties</h2> <p class="text-xl text-gray-600 dark:text-gray-300">Explore some of our most popular listings</p></div> ${validate_component(Marketplace, "Marketplace").$$render(
    $$result,
    {
      showToast: (m) => console.log(m),
      isAuthenticated: false,
      listings,
      isCommunitySubscribed: false
    },
    {},
    {}
  )}</div></section>  ${``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let listings = initialListings;
  return `${validate_component(PublicHomePage, "PublicHomePage").$$render($$result, { listings }, {}, {})}`;
});
export {
  Page as default
};
