"use client";
import ProviderOverview from "@/components/modules/Dashboard/Provider/ProviderOverview";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useGetSingleOrgQuery } from "@/redux/features/org/orgApi";
import {
  AlertTriangle,
  CheckCircle,
  Edit,
  Globe,
  Mail,
  MapPin,
  Phone,
  Plus,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  const { data: session } = useSession();

  // Ensure we only query when session is loaded
  const { data: profile, isLoading: isProfileLoading } = useProfileQuery(
    session?.accessToken,
    { skip: !session?.accessToken }
  );

  // Ensure we only query when profile is available
  const {
    data: org,
    isLoading: isOrgLoading,
    error,
  } = useGetSingleOrgQuery(profile?.data?._id as string, {
    skip: !profile?.data?._id,
    refetchOnMountOrArgChange: true,
  });

  if (isProfileLoading || isOrgLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!org?.data || error) {
    return (
      <div className="min-h-[89vh] flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-xl">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Organization Found
          </h2>
          <p className="text-gray-600 mb-6">
            You haven&apos;t created an organization yet. Please create one to
            continue.
          </p>
          <Link
            href={"/dashboard/provider/createOrg"}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Create Organization
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border font-arima rounded-xl shadow-lg overflow-hidden">
        {/* Organization Header */}
        <div className="p-8 border-b border-gray-200 flex items-start justify-between">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {org.data.logo && (
              <Image
                src={org.data.logo}
                alt="Organization logo"
                className="w-36 rounded-lg object-cover"
                width={500}
                height={500}
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                {org.data.name}
                {org.data.isVerified && (
                  <CheckCircle className="text-green-600 w-6 h-6" />
                )}
              </h1>
              <p className="text-gray-600 mt-2">{org.data.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <span
              className={`px-4 py-1 rounded-full text-sm ${
                org.data.isVerified
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {org.data.isVerified ? "Verified" : "Pending Verification"}
            </span>
            <Link
              className="flex gap-1 bg-slate-50 hover:bg-slate-100 p-2 rounded"
              href={"/dashboard/provider/updateOrg"}
            >
              <Edit /> Edit
            </Link>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="text-blue-600" />
              Address
            </h2>
            <div className="text-gray-600 space-y-1">
              <p>{org.data.address.street}</p>
              <p>
                {org.data.address.city}, {org.data.address.state}{" "}
                {org.data.address.zip}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Phone className="text-blue-600" />
              Contact Information
            </h2>
            <div className="text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{org.data.contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{org.data.contactInfo.email}</span>
              </div>
              {org.data.contactInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <a
                    href={org.data.contactInfo.website}
                    className="text-blue-600 hover:underline"
                  >
                    {org.data.contactInfo.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <ProviderOverview />
      </div>
    </>
  );
}
