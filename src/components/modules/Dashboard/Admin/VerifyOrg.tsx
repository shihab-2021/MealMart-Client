"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AlertCircle,
  Check,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Trash2,
} from "lucide-react";
import {
  useDeleteOrgMutation,
  useGetUnverifiedOrgsQuery,
  useVerifyOrgMutation,
} from "@/redux/features/org/orgApi";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function VerifyOrg() {
  const { data: session } = useSession();
  const {
    data: organizations,
    isLoading,
    refetch,
  } = useGetUnverifiedOrgsQuery(session, {
    refetchOnReconnect: true,
  });
  const [verifyOrg] = useVerifyOrgMutation();
  const [deleteOrg] = useDeleteOrgMutation();

  const handleVerify = async (orgId: string) => {
    try {
      const res = await verifyOrg(orgId).unwrap();
      if (res.success) toast.success("Organization verified successfully");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify organization");
    }
  };

  const handleDelete = async (orgId: string) => {
    try {
      await deleteOrg(orgId).unwrap();
      toast.success("Organization deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete organization");
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <AlertCircle className="w-6 h-6 text-yellow-600" />
        <h1 className="text-2xl font-bold">Organization Verification</h1>
      </div>

      {organizations?.data?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No organizations pending verification
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1  gap-6 mb-10">
          {organizations?.data?.map((org: any) => (
            <Card key={org._id} className="relative">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{org.name}</span>
                    <Clock className="text-yellow-600" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Organization Details */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{org.description}</p>

                  {org.logo && (
                    <Image
                      src={org.logo}
                      alt="Organization logo"
                      className="h-24 w-full object-contain rounded-lg"
                      width={500}
                      height={500}
                    />
                  )}
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="text-gray-500" />
                    <span>
                      {org.address.street}, {org.address.city},{" "}
                      {org.address.state} {org.address.zip}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="text-gray-500" />
                    <span>{org.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="text-gray-500" />
                    <span>{org.contactInfo.email}</span>
                  </div>
                  {org.contactInfo.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="text-gray-500" />
                      <a
                        href={org.contactInfo.website}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {org.contactInfo.website}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1 gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this organization?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(org._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Confirm Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    onClick={() => handleVerify(org._id)}
                    className="flex-1 gap-2"
                    size="sm"
                  >
                    <Check className="w-4 h-4" />
                    Verify
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
