"use client";
import {
  ChevronUp,
  Home,
  LayoutDashboardIcon,
  ListOrdered,
  ListOrderedIcon,
  LogOutIcon,
  Salad,
  ScrollText,
  ShoppingCart,
  SidebarCloseIcon,
  SquarePlus,
  UserCircle2,
  UserCog2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useProfileQuery } from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/assets/image.png";
import Image from "next/image";

type TRoute = {
  path: string;
  icon?: React.ElementType;
  name?: string;
}[];

export const adminRoutes = [
  {
    path: "/dashboard/admin",
    name: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    path: "/dashboard/admin/pendingOrders",
    name: "Pending Orders",
    icon: ListOrderedIcon,
  },
  {
    path: "/dashboard/admin/allOrders",
    name: "All Orders",
    icon: ScrollText,
  },
];
export const providerRoutes = [
  {
    path: "/dashboard/provider",
    name: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    path: "/dashboard/provider/meals",
    name: "Meals",
    icon: Salad,
  },
  {
    path: "/dashboard/provider/manageOrders",
    name: "Manage Orders",
    icon: ListOrderedIcon,
  },
  {
    path: "/dashboard/provider/addMeal",
    name: "Add Meal",
    icon: SquarePlus,
  },
];
export const customerRoutes = [
  {
    path: "/dashboard/customer",
    name: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    path: "/dashboard/customer/myCart",
    name: "My Cart",
    icon: ShoppingCart,
  },
  {
    path: "/dashboard/customer/myOrders",
    name: "My Orders",
    icon: ListOrdered,
  },
];

export function DashboardSidebar() {
  const { toggleSidebar } = useSidebar();
  const { data: session } = useSession();
  const { data: profile } = useProfileQuery(session?.accessToken);
  const [routes, setRoutes] = useState<TRoute>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user?.email) {
      if (session?.user?.role === "admin") {
        setRoutes(adminRoutes);
      } else if (session?.user?.role === "provider") {
        setRoutes(providerRoutes);
      } else {
        setRoutes(customerRoutes);
      }
    }
  }, [session]);

  const activeClasses = `
    flex items-center gap-3 w-full px-4 py-3 rounded-lg
    bg-primary/10 text-primary font-medium
    transition-all duration-300 ease-in-out
    transform hover:translate-x-1
  `;

  const inActiveClasses = `
    flex items-center gap-3 w-full px-4 py-3 rounded-lg
    text-muted-foreground font-medium
    transition-all duration-300 ease-in-out
    hover:bg-secondary hover:text-foreground
    transform hover:translate-x-1
  `;

  return (
    <>
      <Sidebar className="font-arima">
        <SidebarHeader className="bg-white px-4 py-1.5 shadow">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" className="w-28" />
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-zinc-100 rounded-lg"
            >
              <SidebarCloseIcon className="" />
            </button>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map(
                  (item, index) =>
                    item.name && (
                      <div key={index}>
                        <Link
                          href={item.path}
                          className={`
                            ${
                              pathname === item.path
                                ? activeClasses
                                : inActiveClasses
                            }`}
                        >
                          {item.icon && <item.icon />}
                          {item.name && <span>{item.name}</span>}
                        </Link>
                      </div>
                    )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {session?.user?.email && (
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      {/* <User2 /> Username */}
                      {profile?.data?.avatar ? (
                        <Image
                          src={profile?.data?.avatar}
                          alt="User Avatar"
                          className="h-10 w-h-10 rounded-full object-cover border"
                          width={50}
                          height={50}
                        />
                      ) : (
                        <UserCircle2 className="h-10 w-10 text-gray-600" />
                      )}
                      <span>{profile?.data?.name}</span>
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width] font-arima"
                  >
                    <DropdownMenuItem onClick={() => router.push("/")}>
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/mealList")}>
                      <Salad className="h-5 w-5" />
                      <span>All Meals</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/editProfile")}
                    >
                      <UserCog2 className="h-5 w-5" />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOutIcon className="h-5 w-5" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
