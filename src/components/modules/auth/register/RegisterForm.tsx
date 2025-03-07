"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Logo from "@/assets/image.png";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { registrationSchema } from "./registerValidation";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function RegisterForm() {
  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const router = useRouter();
  const [signup] = useSignupMutation();
  const [accountType, setAccountType] = useState<"customer" | "provider">(
    "customer"
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await signup({ ...data, role: accountType }).unwrap();
      //   setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    try {
      const res = await signIn(provider, {
        callbackUrl: `https://mealmart.vercel.app/login?accountType=${accountType}&isRegister=true`,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Login failed! Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-2 border-gray-200 shadow-lg rounded-2xl flex-grow max-w-md w-full p-6 bg-white my-20">
      {/* Logo & Title */}
      <div className="flex items-center space-x-4">
        <Image src={Logo} alt="logo" className="w-32" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Register</h1>
          <p className="text-sm text-gray-500">
            Join us today and start your journey!
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-4">
          {/* Account Type Selector */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-gray-700">I want to:</h3>
            <div className="flex space-x-4">
              <label
                className={`cursor-pointer flex items-center space-x-2 px-4 py-2 border rounded-lg transition-all 
            ${
              accountType === "customer"
                ? "border-primary bg-gray-100"
                : "border-gray-300 hover:border-gray-400"
            }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value="customer"
                  className="hidden"
                  checked={accountType === "customer"}
                  onChange={() => setAccountType("customer")}
                />
                <span>🍽 Order meals</span>
              </label>
              <label
                className={`cursor-pointer flex items-center space-x-2 px-4 py-2 border rounded-lg transition-all 
            ${
              accountType === "provider"
                ? "border-primary bg-gray-100"
                : "border-gray-300 hover:border-gray-400"
            }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value="provider"
                  className="hidden"
                  checked={accountType === "provider"}
                  onChange={() => setAccountType("provider")}
                />
                <span>👨‍🍳 Provide meals</span>
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1.5 text-gray-400">
                      👤
                    </span>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="pl-9"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1.5 text-gray-400">
                      📧
                    </span>
                    <Input
                      type="email"
                      {...field}
                      value={field.value || ""}
                      className="pl-9"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1.5 text-gray-400">
                      🔒
                    </span>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                      className="pl-9"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1.5 text-gray-400">
                      🔒
                    </span>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                      className="pl-9"
                    />
                  </div>
                </FormControl>
                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> ❌ Passwords do not match</FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          {/* Register Button */}
          <Button
            disabled={
              password && passwordConfirm && password !== passwordConfirm
                ? true
                : false
            }
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "Registering...." : "Register"}
          </Button>
        </form>
      </Form>

      {/* Login Link */}
      <p className="text-sm text-gray-600 text-center my-4">
        Already have an account?
        <Link
          href="/login"
          className="text-blue-400 underline font-semibold hover:text-blue-500 "
        >
          {" "}
          Login
        </Link>
      </p>

      {/* Social Login Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
          onClick={() => handleOAuthLogin("google")}
        >
          <Image
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            width={30}
            height={30}
            alt="Google logo"
          />
        </button>
        <button
          className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
          onClick={() => handleOAuthLogin("github")}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            width={25}
            height={25}
            alt="GitHub logo"
          />
        </button>
      </div>
    </div>
  );
}
