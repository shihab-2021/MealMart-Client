"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetVerifiedOrgsQuery } from "@/redux/features/org/orgApi";

interface Organization {
  _id: string;
  name: string;
  logo: string;
  description: string;
  contactInfo: {
    phone: string;
    email: string;
  };
}

interface OrganizationCardProps {
  org: Organization;
  isScrolling?: boolean;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  org,
  isScrolling = false,
}) => {
  return (
    <div
      className={`$${
        isScrolling ? "flex-shrink-0 w-80" : "w-80"
      } bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-100`}
    >
      <div className="min-w-[300px] max-w-xs p-6 flex-shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Image
              width={200}
              height={200}
              src={org.logo}
              alt={org.name}
              className="w-16 h-16 object-contain rounded-full border-2 border-gray-100 shadow-sm"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {org.name}
            </h3>
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-green-600 font-medium">
                Verified Partner
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {org.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-blue-500">📞</span>
            <span>{org.contactInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-blue-500">📧</span>
            <span className="truncate">{org.contactInfo.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrganizationShowcase: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { data: orgs, isLoading } = useGetVerifiedOrgsQuery(undefined, {
    refetchOnFocus: true,
  });

  const organizations = orgs?.data || [];
  const shouldDuplicate = organizations.length < 4;
  const displayOrgs = shouldDuplicate
    ? [...organizations, ...organizations, ...organizations]
    : organizations;

  const showStaticLayout = organizations.length <= 2;

  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Partner Organizations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading our trusted partners...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Partner Organizations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover trusted organizations delivering quality meals and
            exceptional service
          </p>
        </div>

        {showStaticLayout ? (
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {organizations.map((org: any, index: number) => (
              <OrganizationCard key={`${org._id}-${index}`} org={org} />
            ))}
          </div>
        ) : (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex space-x-6 ${
                shouldDuplicate
                  ? "animate-scroll-right-slow"
                  : "animate-scroll-right"
              }`}
              style={{
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {displayOrgs.map((org: any, index: number) => (
                <OrganizationCard
                  key={`${org._id}-${index}`}
                  org={org}
                  isScrolling={true}
                />
              ))}
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10 hidden md:block"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none z-10 hidden md:block"></div>
          </div>
        )}

        {organizations.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Partner Organizations Yet
            </h3>
            <p className="text-gray-500">
              We{"'"}re working on bringing you amazing partner organizations
              soon!
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .animate-scroll-right-slow {
          animation: scroll-right-slow 45s linear infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default OrganizationShowcase;
