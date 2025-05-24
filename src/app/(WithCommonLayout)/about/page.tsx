import React from "react";
import { Users, Heart, Clock, Award, ChefHat, Truck } from "lucide-react";
import storyImage from "../../../assets/story.jpeg";
import Team1 from "../../../assets/Team1.jpg";
import Team2 from "../../../assets/Team2.jpeg";
import Team3 from "../../../assets/Team3.jpeg";
import Image from "next/image";

const AboutUs = () => {
  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "500+", label: "Local Chefs", icon: ChefHat },
    { number: "50+", label: "Cities Served", icon: Truck },
    { number: "4.8/5", label: "Average Rating", icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description:
        "Supporting local home chefs and bringing communities together through food",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "Every meal meets our high standards for taste, freshness, and presentation",
    },
    {
      icon: Clock,
      title: "Convenience",
      description:
        "Restaurant-quality meals delivered to your doorstep when you need them",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: Team1,
      description: "Former restaurant owner with 15 years in the food industry",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: Team2,
      description: "Logistics expert ensuring seamless delivery experiences",
    },
    {
      name: "Emily Rodriguez",
      role: "Chef Relations Manager",
      image: Team3,
      description:
        "Culinary graduate connecting amazing home chefs with food lovers",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            About MealMart
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connecting food lovers with passionate local chefs who create
            restaurant-quality meals in the comfort of their own kitchens
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  MealMart was born from a simple observation: some of the most
                  incredible meals come from passionate home cooks who pour
                  their heart into every dish. We saw an opportunity to bridge
                  the gap between these talented chefs and food lovers seeking
                  authentic, high-quality meals.
                </p>
                <p>
                  Founded in 2023, we{"'"}ve grown from a small local initiative
                  to a thriving platform that serves thousands of customers
                  across multiple cities. Our mission remains unchanged: to
                  celebrate the art of home cooking while providing convenient
                  access to restaurant-quality meals.
                </p>
                <p>
                  Every meal on our platform tells a story - of tradition passed
                  down through generations, of creative fusion experiments, and
                  of the universal language of love expressed through food.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl transform rotate-3"></div>
              <Image
                width={500}
                height={500}
                src={storyImage}
                alt="Cooking process"
                className="relative rounded-3xl shadow-2xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-100 to-cyan-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <Image
                    width={400}
                    height={400}
                    src={member.image}
                    alt={member.name}
                    className="relative rounded-3xl w-64 h-64 mx-auto object-cover shadow-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-semibold mb-4">
                  {member.role}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Join Our Journey</h3>
            <p className="text-xl mb-6 opacity-90">
              We{"'"}re always looking for passionate individuals to join our
              growing team
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              View Open Positions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
