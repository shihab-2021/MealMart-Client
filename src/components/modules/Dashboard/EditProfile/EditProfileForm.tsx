"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Upload, UserCog2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";

export interface IUser {
  name: string;
  email: string;
  avatar?: string | File[];
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export default function EditProfileForm() {
  const { data: session } = useSession();
  const { data: user } = useProfileQuery(session?.accessToken, {
    skip: !session?.accessToken,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IUser>({
    defaultValues: {
      name: user?.data?.name,
      email: user?.data?.email,
      avatar: user?.data?.avatar,
      phone: user?.data?.phone,
      address: {
        street: user?.data?.address?.street,
        city: user?.data?.address?.city,
        state: user?.data?.address?.state,
        zip: user?.data?.address?.zip,
      },
    },
  });
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const avatarUrl = watch("avatar");

  const onSubmit = async (data: IUser) => {
    let imageUrl;

    if (data.avatar && data.avatar[0] && typeof data.avatar !== "string") {
      const formData = new FormData();
      formData.append("file", data.avatar[0]);
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
      imageUrl = file.secure_url;
    }

    const newProfileData = { ...data, avatar: imageUrl || user.data.avatar };

    try {
      const res = await updateProfile({
        id: user?.data?._id,
        userData: newProfileData,
      }).unwrap();
      if (res.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    }
  };

  console.log(typeof avatarUrl);

  return (
    <div className="max-w-2xl mx-auto">
      {user?.data && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <UserCog2 className="w-6 h-6" />
              Edit Profile
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  {typeof avatarUrl === "string" ? (
                    <Avatar className="w-24 h-24 border">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>
                        {user?.data?.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <>
                      {avatarUrl && avatarUrl[0] ? (
                        <Avatar className="w-24 h-24 border">
                          <AvatarImage
                            src={URL.createObjectURL(avatarUrl[0])}
                          />
                          <AvatarFallback>
                            {user?.data?.name?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <>
                          {avatarUrl && (
                            <Avatar className="w-24 h-24 border">
                              <AvatarImage
                              // src={avatarUrl}
                              />
                              <AvatarFallback>
                                {user?.data?.name?.charAt(0)?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </>
                      )}
                    </>
                  )}
                  <Label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 bg-background p-2 rounded-full cursor-pointer shadow-sm border hover:bg-accent"
                  >
                    <Upload className="w-5 h-5" />
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("avatar")}
                    />
                  </Label>
                </div>
                {errors.avatar && (
                  <Badge variant="destructive" className="mt-2">
                    {errors.avatar.message}
                  </Badge>
                )}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street</Label>
                    <Input id="street" {...register("address.street")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register("address.city")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" {...register("address.state")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" {...register("address.zip")} />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin flex items-center gap-1" />
                      <UserCog2 className="w-4 h-4" />
                      Updating...
                    </div>
                  ) : (
                    <>
                      <UserCog2 className="w-4 h-4" />
                      Update Profile
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
