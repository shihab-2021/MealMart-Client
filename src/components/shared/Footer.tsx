"use client";
import React from "react";
import Logo from "@/assets/image.png";
import { useProfileQuery } from "../../redux/features/auth/authApi";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  LogOutIcon,
  Mail,
  MapPin,
  Phone,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { data: session } = useSession();
  const { data: profile } = useProfileQuery(session?.accessToken, {
    skip: !session?.accessToken,
  });

  return (
    <footer className="mt-20 border-t font-sansita">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Image
              className="w-36"
              src={Logo}
              alt="Logo"
              width={500}
              height={500}
            />
            <p className="text-gray-600 text-sm">
              We&apos;ll tell you first when we launch something new—and you can
              keep an eye out for unexpected offers, surprise merch, fun free
              stuff, and emails that will make you laugh.
            </p>

            {/* User Authentication Section */}
            <div className="pt-4 border-t border-gray-200">
              {session?.user?.email ? (
                <div className="flex items-center gap-3">
                  {profile?.data?.avatar ? (
                    <Image
                      src={profile?.data?.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                      width={80}
                      height={80}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="text-blue-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {profile?.data?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {profile?.data?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOutIcon />
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link
                    href="/login"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { text: "Learn", path: "/" },
                { text: "Contact us", path: "/" },
                { text: "FAQ", path: "/" },
                { text: "Our story", path: "/" },
                { text: "Our Service", path: "/" },
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.path}
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="text-blue-600 mt-1" />
                <span>123 Luxury Lane, Meal Mart, CTG</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="text-blue-600" />
                <span>+88 01394857384</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="text-blue-600" />
                <span>contact@mealmart.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Stay Updated</h3>
            <form className="space-y-3">
              <p className="text-sm text-gray-600">
                Subscribe to our newsletter for the latest inventory and special
                offers.
              </p>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
              <span>© {currentYear} Meal Mart. All rights reserved.</span>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
