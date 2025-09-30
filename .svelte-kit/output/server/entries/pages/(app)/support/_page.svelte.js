import { c as create_ssr_component, v as validate_component, e as each, a as add_attribute, b as escape } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { Q as QuestionMarkCircleIcon, D as ChatBubbleLeftRightIcon, F as DocumentTextIcon, f as ChevronDownIcon, E as EnvelopeIcon, G as PhoneIcon } from "../../../../chunks/heroicons-fallback.js";
const Support = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const supportCategories = [
    "General Questions",
    "Property Listings",
    "Account & Billing",
    "Technical Issues",
    "Partnership Inquiries",
    "Other"
  ];
  const faqs = [
    {
      question: "How do I list my property?",
      answer: 'To list your property, navigate to "My Listings" and click "Create Listing". Fill in all required details including photos, description, and pricing information.'
    },
    {
      question: "What are the listing fees?",
      answer: "Basic listings are free for up to 3 properties. Premium features and additional listings have monthly subscription fees starting from ₦5,000."
    },
    {
      question: "How do I contact interested buyers?",
      answer: "All inquiries come through our secure messaging system. You'll receive notifications and can respond directly through your inbox."
    },
    {
      question: "Can I edit my listing after publishing?",
      answer: 'Yes, you can edit your listings anytime from the "My Listings" section. Changes are updated immediately on the platform.'
    }
  ];
  let openFaq = -1;
  return `<main class="p-4 sm:p-6"> <div class="mb-8 text-center" data-svelte-h="svelte-43zgeu"><h1 class="text-3xl font-bold text-brand-text-primary">Support Center</h1> <p class="text-lg text-brand-text-secondary mt-2">Get help with your Creeb experience</p></div> <div class="max-w-4xl mx-auto space-y-8"> <section aria-labelledby="quick-help-heading"><h2 id="quick-help-heading" class="text-xl font-semibold text-brand-text-primary mb-4" data-svelte-h="svelte-1gp1sxv">How can we help you?</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4">${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    },
    {},
    {
      default: () => {
        return `<div class="p-6">${validate_component(QuestionMarkCircleIcon, "QuestionMarkCircleIcon").$$render(
          $$result,
          {
            class: "w-12 h-12 text-brand-primary mx-auto mb-4",
            "aria-hidden": "true"
          },
          {},
          {}
        )} <h3 class="font-semibold text-brand-text-primary mb-2" data-svelte-h="svelte-j10zjv">Browse FAQs</h3> <p class="text-sm text-brand-text-secondary" data-svelte-h="svelte-1defkld">Find quick answers to common questions</p></div>`;
      }
    }
  )} ${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    },
    {},
    {
      default: () => {
        return `<div class="p-6">${validate_component(ChatBubbleLeftRightIcon, "ChatBubbleLeftRightIcon").$$render(
          $$result,
          {
            class: "w-12 h-12 text-brand-primary mx-auto mb-4",
            "aria-hidden": "true"
          },
          {},
          {}
        )} <h3 class="font-semibold text-brand-text-primary mb-2" data-svelte-h="svelte-15mc53w">Live Chat</h3> <p class="text-sm text-brand-text-secondary" data-svelte-h="svelte-1jch1zh">Chat with our support team</p></div>`;
      }
    }
  )} ${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    },
    {},
    {
      default: () => {
        return `<div class="p-6">${validate_component(DocumentTextIcon, "DocumentTextIcon").$$render(
          $$result,
          {
            class: "w-12 h-12 text-brand-primary mx-auto mb-4",
            "aria-hidden": "true"
          },
          {},
          {}
        )} <h3 class="font-semibold text-brand-text-primary mb-2" data-svelte-h="svelte-14js3qf">User Guide</h3> <p class="text-sm text-brand-text-secondary" data-svelte-h="svelte-13v2jm5">Learn how to use all features</p></div>`;
      }
    }
  )}</div></section>  <section aria-labelledby="faq-heading"><h2 id="faq-heading" class="text-xl font-semibold text-brand-text-primary mb-4" data-svelte-h="svelte-xgsy03">Frequently Asked Questions</h2> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-6"><div class="space-y-4">${each(faqs, (faq, index) => {
        return `<div class="border-b border-brand-border dark:border-dark-border last:border-b-0 pb-4 last:pb-0"><button type="button" class="w-full flex items-center justify-between text-left py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded"${add_attribute("aria-expanded", openFaq === index, 0)} aria-controls="${"faq-answer-" + escape(index, true)}"><h3 class="font-medium text-brand-text-primary pr-4">${escape(faq.question)}</h3> ${validate_component(ChevronDownIcon, "ChevronDownIcon").$$render(
          $$result,
          {
            class: "w-5 h-5 text-brand-text-secondary transition-transform duration-200 " + (openFaq === index ? "rotate-180" : ""),
            "aria-hidden": "true"
          },
          {},
          {}
        )}</button> ${openFaq === index ? `<div id="${"faq-answer-" + escape(index, true)}" class="mt-3 text-sm text-brand-text-secondary" role="region" aria-labelledby="${"faq-question-" + escape(index, true)}">${escape(faq.answer)} </div>` : ``} </div>`;
      })}</div></div>`;
    }
  })}</section>  <section aria-labelledby="contact-heading"><h2 id="contact-heading" class="text-xl font-semibold text-brand-text-primary mb-4" data-svelte-h="svelte-1nkl2r6">Contact Support</h2> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<form class="p-6 space-y-6"><div><label for="category" class="block text-sm font-medium text-brand-text-secondary mb-2" data-svelte-h="svelte-1f9z896">Category <span class="text-red-500" aria-label="required">*</span></label> <select id="category" required class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary" aria-describedby="category-help"><option value="" data-svelte-h="svelte-15swqsp">Select a category</option>${each(supportCategories, (category) => {
        return `<option${add_attribute("value", category, 0)}>${escape(category)}</option>`;
      })}</select> <p id="category-help" class="text-xs text-brand-text-secondary mt-1" data-svelte-h="svelte-qfmujk">Choose the category that best describes your issue</p></div> <div><label for="message" class="block text-sm font-medium text-brand-text-secondary mb-2" data-svelte-h="svelte-1g5hxve">Message <span class="text-red-500" aria-label="required">*</span></label> <textarea id="message" required rows="6" placeholder="Please describe your issue or question in detail..." class="w-full px-3 py-2 border border-brand-border dark:border-dark-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary resize-vertical" aria-describedby="message-help">${escape("")}</textarea> <p id="message-help" class="text-xs text-brand-text-secondary mt-1" data-svelte-h="svelte-qui97a">Provide as much detail as possible to help us assist you better</p></div> <fieldset><legend class="block text-sm font-medium text-brand-text-secondary mb-3" data-svelte-h="svelte-1ljk0vg">Preferred Contact Method</legend> <div class="space-y-2"><label class="flex items-center"><input type="radio" name="contactMethod" value="email" class="text-brand-primary focus:ring-brand-primary"${add_attribute("checked", true, 1)}> <span class="ml-2 text-sm text-brand-text-primary" data-svelte-h="svelte-1rv78yf">Email</span></label> <label class="flex items-center"><input type="radio" name="contactMethod" value="phone" class="text-brand-primary focus:ring-brand-primary"${""}> <span class="ml-2 text-sm text-brand-text-primary" data-svelte-h="svelte-gd6u4b">Phone</span></label></div></fieldset> <div class="flex items-center justify-between pt-4 border-t border-brand-border dark:border-dark-border"><p class="text-sm text-brand-text-secondary" data-svelte-h="svelte-1f6mpif">We typically respond within 24 hours</p> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "submit",
          variant: "primary",
          "aria-label": "Submit support request"
        },
        {},
        {
          default: () => {
            return `Send Message`;
          }
        }
      )}</div></form>`;
    }
  })}</section>  <section aria-labelledby="contact-info-heading"><h2 id="contact-info-heading" class="text-xl font-semibold text-brand-text-primary mb-4" data-svelte-h="svelte-1cvgu6y">Other Ways to Reach Us</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-6 text-center">${validate_component(EnvelopeIcon, "EnvelopeIcon").$$render(
        $$result,
        {
          class: "w-8 h-8 text-brand-primary mx-auto mb-3",
          "aria-hidden": "true"
        },
        {},
        {}
      )} <h3 class="font-semibold text-brand-text-primary mb-2" data-svelte-h="svelte-19t5nsz">Email Support</h3> <p class="text-sm text-brand-text-secondary mb-3" data-svelte-h="svelte-kxlpe5">Get help via email</p> <a href="mailto:support@creeb.com" class="text-brand-primary hover:underline focus:underline focus:outline-none" data-svelte-h="svelte-22tjwu">support@creeb.com</a></div>`;
    }
  })} ${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="p-6 text-center">${validate_component(PhoneIcon, "PhoneIcon").$$render(
        $$result,
        {
          class: "w-8 h-8 text-brand-primary mx-auto mb-3",
          "aria-hidden": "true"
        },
        {},
        {}
      )} <h3 class="font-semibold text-brand-text-primary mb-2" data-svelte-h="svelte-ce6j5b">Phone Support</h3> <p class="text-sm text-brand-text-secondary mb-3" data-svelte-h="svelte-8l57k2">Available Mon-Fri, 9AM-6PM WAT</p> <a href="tel:+2348012345678" class="text-brand-primary hover:underline focus:underline focus:outline-none" data-svelte-h="svelte-1wog1a1">+234 801 234 5678</a></div>`;
    }
  })}</div></section></div></main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(Support, "Support").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
