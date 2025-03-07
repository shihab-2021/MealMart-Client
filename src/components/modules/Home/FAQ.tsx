import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, HelpCircle } from "lucide-react";
const faqs = [
  {
    question: "How does the ordering process work?",
    answer:
      "Simply browse our menu, add items to your cart, and proceed to checkout. You can choose your preferred payment method and delivery time.",
  },
  {
    question: "Do you offer vegetarian or vegan options?",
    answer:
      "Yes! We have a variety of vegetarian and vegan meals. Use our filters to find the perfect meal for your dietary preferences.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes between 30-45 minutes, depending on your location and order volume.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, PayPal, and cash on delivery for select locations.",
  },
  {
    question: "Can I modify my order after placing it?",
    answer:
      "Yes, you can modify your order within 10 minutes of placing it by contacting our support team.",
  },
];

export default function FAQ() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
      <section className="relative w-full py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg opacity-90">
            Find answers to the most common questions about our service.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-2xl mx-auto mt-10 space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="question1"
              className="border-none rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 text-lg transition duration-300">
                How does the ordering process work?
              </AccordionTrigger>
              <AccordionContent className="px-5 py-3 text-gray-700">
                Simply browse our menu, select your favorite meals, add them to
                your cart, and proceed to checkout. Your order will be delivered
                to your doorstep in no time!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="question2"
              className="border-none  rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 text-lg  transition duration-300">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="px-5 py-3 text-gray-700">
                We accept credit/debit cards, PayPal, and digital wallets. All
                transactions are secure and encrypted.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="question3"
              className="border-none  rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 text-lg  transition duration-300">
                Can I customize my meal?
              </AccordionTrigger>
              <AccordionContent className="px-5 py-3 text-gray-700">
                Yes! You can add special instructions when placing your order,
                and we&apos;ll do our best to accommodate your requests.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="question4"
              className="border-none  rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 text-lg  transition duration-300">
                How long does delivery take?
              </AccordionTrigger>
              <AccordionContent className="px-5 py-3 text-gray-700">
                Delivery times vary by location, but we strive to get your order
                to you within 30-45 minutes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
