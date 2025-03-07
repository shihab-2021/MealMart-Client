"use client";
import dynamic from "next/dynamic";

const EditProfileForm = dynamic(
  () => import("@/components/modules/Dashboard/EditProfile/EditProfileForm"),
  { ssr: false }
);

export default function EditProfile() {
  return (
    <div>
      <EditProfileForm />
    </div>
  );
}
