import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/Button.js";
import { H as HomeIcon, S as ShieldCheckIcon, U as UsersIcon, C as CurrencyDollarIcon } from "../../chunks/heroicons-fallback.js";
import { M as Marketplace } from "../../chunks/Marketplace.js";
import { i as initialListings } from "../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let listings = initialListings;
  return `${$$result.head += `<!-- HEAD_svelte-flxwgt_START -->${$$result.title = `<title>Creeb - Find Your Perfect Home in Nigeria</title>`, ""}<meta name="description" content="Discover, connect, and secure your ideal property with Nigeria's most trusted real estate platform."><!-- HEAD_svelte-flxwgt_END -->`, ""} <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"> <section class="relative py-20 lg:py-32" role="banner"><div class="container mx-auto px-6 lg:px-8"><div class="text-center max-w-4xl mx-auto"><h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6" data-svelte-h="svelte-1die03c">Find Your Perfect 
					<span class="text-brand-primary">Home</span> 
					in Nigeria</h1> <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed" data-svelte-h="svelte-clrqn8">Discover, connect, and secure your ideal property with Nigeria&#39;s most trusted real estate platform.</p> <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">${validate_component(Button, "Button").$$render(
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
        return `${validate_component(HomeIcon, "HomeIcon").$$render(
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
  )}</div></div></div></section>  <section class="py-16 bg-white dark:bg-gray-800" aria-labelledby="stats-heading" data-svelte-h="svelte-1li9lqx"><div class="container mx-auto px-6 lg:px-8"><h2 id="stats-heading" class="sr-only">Platform Statistics</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-8"><div class="text-center"><div class="text-3xl md:text-4xl font-bold text-brand-primary mb-2">10,000+</div> <div class="text-gray-600 dark:text-gray-300 font-medium">Active Properties</div></div> <div class="text-center"><div class="text-3xl md:text-4xl font-bold text-brand-primary mb-2">25,000+</div> <div class="text-gray-600 dark:text-gray-300 font-medium">Happy Customers</div></div> <div class="text-center"><div class="text-3xl md:text-4xl font-bold text-brand-primary mb-2">50+</div> <div class="text-gray-600 dark:text-gray-300 font-medium">Cities Covered</div></div> <div class="text-center"><div class="text-3xl md:text-4xl font-bold text-brand-primary mb-2">5+</div> <div class="text-gray-600 dark:text-gray-300 font-medium">Years of Experience</div></div></div></div></section>  <section class="py-20" aria-labelledby="features-heading"><div class="container mx-auto px-6 lg:px-8"><div class="text-center max-w-3xl mx-auto mb-16" data-svelte-h="svelte-7eby3z"><h2 id="features-heading" class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Creeb?</h2> <p class="text-xl text-gray-600 dark:text-gray-300">We provide comprehensive real estate solutions with cutting-edge technology and personalized service.</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"><div class="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"><div class="p-8"><div class="inline-flex items-center justify-center w-16 h-16 bg-brand-primary bg-opacity-10 rounded-full mb-6">${validate_component(HomeIcon, "HomeIcon").$$render(
    $$result,
    {
      class: "w-8 h-8 text-brand-primary",
      "aria-hidden": "true"
    },
    {},
    {}
  )}</div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-1va489r">Browse Properties</h3> <p class="text-gray-600 dark:text-gray-300 leading-relaxed" data-svelte-h="svelte-1uopst1">Discover thousands of verified properties across Nigeria with detailed photos and information.</p></div></div> <div class="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"><div class="p-8"><div class="inline-flex items-center justify-center w-16 h-16 bg-brand-primary bg-opacity-10 rounded-full mb-6">${validate_component(ShieldCheckIcon, "ShieldCheckIcon").$$render(
    $$result,
    {
      class: "w-8 h-8 text-brand-primary",
      "aria-hidden": "true"
    },
    {},
    {}
  )}</div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-1adt2zx">Verified Listings</h3> <p class="text-gray-600 dark:text-gray-300 leading-relaxed" data-svelte-h="svelte-emow4">All properties are verified by our team to ensure accuracy and prevent fraud.</p></div></div> <div class="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"><div class="p-8"><div class="inline-flex items-center justify-center w-16 h-16 bg-brand-primary bg-opacity-10 rounded-full mb-6">${validate_component(UsersIcon, "UsersIcon").$$render(
    $$result,
    {
      class: "w-8 h-8 text-brand-primary",
      "aria-hidden": "true"
    },
    {},
    {}
  )}</div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-1eg8x87">Connect with Community</h3> <p class="text-gray-600 dark:text-gray-300 leading-relaxed" data-svelte-h="svelte-klt0yr">Join discussions, get advice, and connect with other property seekers and owners.</p></div></div> <div class="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"><div class="p-8"><div class="inline-flex items-center justify-center w-16 h-16 bg-brand-primary bg-opacity-10 rounded-full mb-6">${validate_component(CurrencyDollarIcon, "CurrencyDollarIcon").$$render(
    $$result,
    {
      class: "w-8 h-8 text-brand-primary",
      "aria-hidden": "true"
    },
    {},
    {}
  )}</div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-e5thrk">Transparent Pricing</h3> <p class="text-gray-600 dark:text-gray-300 leading-relaxed" data-svelte-h="svelte-1ojoa6f">No hidden fees. Clear pricing structure for all our services and listings.</p></div></div></div></div></section>  <section class="py-20 bg-brand-primary" aria-labelledby="cta-heading"><div class="container mx-auto px-6 lg:px-8 text-center"><h2 id="cta-heading" class="text-3xl md:text-4xl font-bold text-white mb-6" data-svelte-h="svelte-vujh6i">Ready to Find Your Dream Home?</h2> <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto" data-svelte-h="svelte-1awwhdp">Join thousands of satisfied customers who have found their perfect properties through Creeb.</p> <div class="flex flex-col sm:flex-row justify-center gap-4">${validate_component(Button, "Button").$$render(
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
  )}</div></div></section>  <section class="py-20" aria-labelledby="properties-heading"><div class="container mx-auto px-6 lg:px-8"><div class="text-center mb-12" data-svelte-h="svelte-19d1v0"><h2 id="properties-heading" class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Properties</h2> <p class="text-xl text-gray-600 dark:text-gray-300">Explore some of our most popular listings</p></div> ${validate_component(Marketplace, "Marketplace").$$render($$result, { listings }, {}, {})}</div></section></div>`;
});
export {
  Page as default
};
