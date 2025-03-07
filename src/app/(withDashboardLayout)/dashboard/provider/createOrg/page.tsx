"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddOrgMutation } from "@/redux/features/org/orgApi";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface IOrgForm {
  name: string;
  logo: File[] | null;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
}

export default function CreateOrganizationForm() {
  const [addOrg, { isLoading }] = useAddOrgMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IOrgForm>();

  const logoPreview = watch("logo");

  const removeLogo = () => {
    setValue("logo", null);
  };

  const onSubmit = async (data: IOrgForm) => {
    let logoUrl;

    if (data.logo && data.logo[0]) {
      const formData = new FormData();
      formData.append("file", data.logo[0]);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string
      );

      const res = await fetch(
        process.env.NEXT_PUBLIC_CLOUDINARY_URI as string,
        {
          method: "POST",
          body: formData,
        }
      );

      const file = await res.json();
      logoUrl = file.secure_url;
    }

    const newOrgData = { ...data, logo: logoUrl };

    try {
      await addOrg(newOrgData).unwrap();
      toast.success("Organization created successfully!");
      router.push("/dashboard/provider");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create organization");
    }
  };

  return (
    <div className="w-full mb-10">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create Organization or Brand
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  className={`h-32 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input id="street" {...register("address.street")} />
                  {errors?.address?.street && (
                    <p className="text-sm text-red-500">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register("address.city")} />
                  {errors?.address?.city && (
                    <p className="text-sm text-red-500">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" {...register("address.state")} />
                  {errors?.address?.state && (
                    <p className="text-sm text-red-500">
                      {errors.address.state.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" {...register("address.zip")} />
                  {errors?.address?.zip && (
                    <p className="text-sm text-red-500">
                      {errors.address.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    {...register("contactInfo.phone", {
                      required: "Phone is required",
                      pattern: {
                        value:
                          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  {errors?.contactInfo?.phone && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("contactInfo.email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors?.contactInfo?.email && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    {...register("contactInfo.website")}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-4">
              <Label>Organization Logo *</Label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    // onChange={handleImageChange}
                    {...register("logo", { required: "Logo is required" })}
                  />
                </label>
              </div>
              {errors.logo && (
                <p className="text-sm text-red-500">{errors.logo.message}</p>
              )}
              {logoPreview && logoPreview[0] && (
                <div className="mt-4 relative group w-fit border rounded-lg p-1">
                  <Image
                    src={URL.createObjectURL(logoPreview[0])}
                    alt="Logo preview"
                    width={100}
                    height={100}
                    className="w-40 object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Organization"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
