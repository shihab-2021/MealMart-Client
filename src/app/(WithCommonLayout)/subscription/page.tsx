"use client";
import React, { useState } from "react";
import {
  Check,
  Star,
  Zap,
  Crown,
  Gift,
  Truck,
  Clock,
  Shield,
  Users,
  ChefHat,
} from "lucide-react";

const SubscriptionPlans = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      icon: Users,
      description: "Perfect for occasional food lovers",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      color: "from-gray-500 to-gray-600",
      features: [
        "Free delivery on orders over $35",
        "5% cashback on all orders",
        "Priority customer support",
        "Weekly meal recommendations",
        "Basic recipe access",
      ],
      limitations: [
        "Limited to 10 orders per month",
        "Standard delivery times",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      icon: Star,
      description: "Most popular for regular food enthusiasts",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      color: "from-cyan-500 to-blue-500",
      popular: true,
      features: [
        "Free delivery on all orders",
        "10% cashback on all orders",
        "Priority customer support",
        "Daily personalized meal recommendations",
        "Full recipe library access",
        "Exclusive chef content",
        "Early access to new chefs",
        "Monthly chef spotlight events",
      ],
      limitations: [],
    },
    {
      id: "elite",
      name: "Elite",
      icon: Crown,
      description: "Ultimate experience for food connoisseurs",
      monthlyPrice: 39.99,
      yearlyPrice: 399.99,
      color: "from-purple-600 to-pink-600",
      features: [
        "Free priority delivery on all orders",
        "15% cashback on all orders",
        "24/7 dedicated concierge support",
        "AI-powered meal planning",
        "Exclusive premium chef access",
        "Custom meal requests",
        "Monthly chef dinner experiences",
        "Free cooking classes",
        "Personal nutrition consultation",
        "Gift meal credits ($25/month)",
      ],
      limitations: [],
    },
  ];

  const benefits = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Save on delivery fees with our subscription plans",
    },
    {
      icon: Gift,
      title: "Exclusive Cashback",
      description: "Earn money back on every order you place",
    },
    {
      icon: ChefHat,
      title: "Chef Access",
      description:
        "Connect directly with premium chefs and get exclusive content",
    },
    {
      icon: Clock,
      title: "Priority Support",
      description: "Skip the line with faster customer service response",
    },
  ];

  const getPrice = (plan: any) => {
    return billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: any) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const yearlySavings = monthlyTotal - plan.yearlyPrice;
    const percentSaved = Math.round((yearlySavings / monthlyTotal) * 100);
    return { amount: yearlySavings, percent: percentSaved };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Subscription Plans
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Unlock exclusive benefits, save money, and elevate your dining
            experience with our premium plans
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                billingPeriod === "monthly"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                billingPeriod === "yearly"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              const price = getPrice(plan);
              const savings = getSavings(plan);

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                    plan.popular ? "ring-4 ring-cyan-500/50" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center py-3 font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className={`p-8 ${plan.popular ? "pt-16" : ""}`}>
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl mb-4`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>

                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl font-bold text-gray-800">
                            ${price}
                          </span>
                          <span className="text-gray-600 ml-2">
                            /{billingPeriod === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                        {billingPeriod === "yearly" && (
                          <p className="text-green-600 font-semibold mt-2">
                            Save ${savings.amount.toFixed(2)} ({savings.percent}
                            %) annually
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className={`flex-shrink-0 w-6 h-6 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mt-0.5`}
                          >
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {selectedPlan === plan.id ? "Selected!" : "Choose Plan"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-100 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Why Subscribe?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Compare Plans
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Basic
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Premium
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Elite
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      Free Delivery Threshold
                    </td>
                    <td className="px-6 py-4 text-center">$35+</td>
                    <td className="px-6 py-4 text-center">All Orders</td>
                    <td className="px-6 py-4 text-center">Priority Delivery</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      Cashback Rate
                    </td>
                    <td className="px-6 py-4 text-center">5%</td>
                    <td className="px-6 py-4 text-center">10%</td>
                    <td className="px-6 py-4 text-center">15%</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      Recipe Access
                    </td>
                    <td className="px-6 py-4 text-center">Basic</td>
                    <td className="px-6 py-4 text-center">Full Library</td>
                    <td className="px-6 py-4 text-center">Premium + Custom</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      Customer Support
                    </td>
                    <td className="px-6 py-4 text-center">Priority</td>
                    <td className="px-6 py-4 text-center">Priority</td>
                    <td className="px-6 py-4 text-center">24/7 Concierge</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      Monthly Gift Credits
                    </td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">$25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-100 to-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Subscription FAQ
          </h2>
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. There are no
                cancellation fees or long-term commitments.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Do unused benefits roll over?
              </h3>
              <p className="text-gray-600">
                Cashback credits roll over monthly, but gift credits and special
                perks are use-it-or-lose-it within the billing period.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can change your plan at any time. Upgrades take
                effect immediately, downgrades at the next billing cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of food lovers who save money and enjoy exclusive
            benefits with MealMart subscriptions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
              Start Free Trial
            </button>
            <button className="bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-200">
              Compare All Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPlans;
