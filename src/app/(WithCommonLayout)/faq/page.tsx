"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Clock,
  Shield,
  Utensils,
  Truck,
  CreditCard,
  Users,
} from "lucide-react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "ordering", name: "Ordering", icon: Utensils },
    { id: "delivery", name: "Delivery", icon: Truck },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "chefs", name: "For Chefs", icon: Users },
    { id: "account", name: "Account", icon: Shield },
  ];

  const faqs = [
    {
      id: 1,
      category: "ordering",
      question: "How do I place an order on MealMart?",
      answer:
        "Simply browse our selection of meals, add your favorites to the cart, and proceed to checkout. You can filter by cuisine type, dietary preferences, or location to find exactly what you're craving.",
    },
    {
      id: 2,
      category: "ordering",
      question: "Can I customize my meal orders?",
      answer:
        'Many of our chefs offer customization options for their meals. Look for the "Customizable" tag on meal listings, and you\'ll be able to add special instructions or modify ingredients during checkout.',
    },
    {
      id: 3,
      category: "ordering",
      question: "What if I have dietary restrictions or allergies?",
      answer:
        "All meals are clearly labeled with ingredients and dietary information. You can filter meals by dietary preferences like vegetarian, vegan, gluten-free, etc. Always check ingredient lists and contact the chef if you have severe allergies.",
    },
    {
      id: 4,
      category: "delivery",
      question: "What are your delivery hours?",
      answer:
        "Delivery hours vary by location and chef availability. Most areas offer delivery from 11 AM to 10 PM. You can see available delivery times when placing your order.",
    },
    {
      id: 5,
      category: "delivery",
      question: "How much does delivery cost?",
      answer:
        "Delivery fees range from $2.99 to $5.99 depending on distance and time. Free delivery is available for orders over $35. Premium subscribers get free delivery on all orders.",
    },
    {
      id: 6,
      category: "delivery",
      question: "Can I track my order?",
      answer:
        "Yes! Once your order is confirmed, you'll receive real-time updates via SMS and email. You can also track your order in the app or on our website.",
    },
    {
      id: 7,
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, PayPal, Apple Pay, and Google Pay. Payment is processed securely through our encrypted payment gateway.",
    },
    {
      id: 8,
      category: "payment",
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "Absolutely! If you're not completely satisfied with your meal, contact us within 24 hours and we'll provide a full refund or credit. Your satisfaction is our priority.",
    },
    {
      id: 9,
      category: "chefs",
      question: "How can I become a chef on MealMart?",
      answer:
        "We're always looking for talented home chefs! Apply through our \"Become a Chef\" page. You'll need to pass our food safety certification and quality standards review.",
    },
    {
      id: 10,
      category: "chefs",
      question: "What commission does MealMart take?",
      answer:
        "Our commission structure is competitive and transparent. We charge 15-20% depending on your sales volume, with lower rates for higher-performing chefs.",
    },
    {
      id: 11,
      category: "chefs",
      question: "Do you provide ingredients or do chefs buy their own?",
      answer:
        "Chefs source their own ingredients, which allows them to maintain quality control and use preferred suppliers. We provide guidelines for food safety and sourcing standards.",
    },
    {
      id: 12,
      category: "account",
      question: "How do I create an account?",
      answer:
        'Click "Sign Up" on our homepage and provide your email, phone number, and basic information. You can also sign up using your Google or Facebook account for faster registration.',
    },
    {
      id: 13,
      category: "account",
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard encryption to protect your personal and payment information. We never share your data with third parties without your consent.",
    },
    {
      id: 14,
      category: "account",
      question: "How do I update my delivery address?",
      answer:
        "You can update your delivery address in your account settings or during checkout. We recommend keeping your address current to ensure smooth deliveries.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: any) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about ordering, delivery, payments,
            and more
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                      : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or browse different categories
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    {openFAQ === faq.id ? (
                      <ChevronUp className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-6">
                      <div className="h-px bg-gradient-to-r from-blue-200 to-cyan-200 mb-4"></div>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-100 to-cyan-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600">
              Our support team is here to assist you 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 mb-4">
                Get instant help from our support team
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                Start Chat
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our support team
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                Call Now
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                Send Email
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
