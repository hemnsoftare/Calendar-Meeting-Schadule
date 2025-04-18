import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { DasboardLinks } from "../components/dashboard/DasboardLinks";
import Logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "../components/dashboard/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";

import { signOut } from "../lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { requireUser } from "../lib/hook";

const getDate = async (userId: string) => {
  try {
    const data = await prisma?.user?.findUnique({
      where: {
        id: userId,
      },
      select: { userName: true, grantId: true },
    });
    if (!data?.userName) return redirect("/onboarding");
    if (!data?.grantId) return redirect("/onboarding/grant-id");

    return data;
  } catch (error) {
    console.error("Database query error:", error);
    // Consider disconnecting and reconnecting to clear prepared statements
    // await prisma.$disconnect();
    // await prisma.$connect();
    throw error;
  }
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await requireUser();
  const data = await getDate(session?.user?.id as string);
  console.log(data);
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {/* side bar */}
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image src={Logo} alt="Logo" className="size-6" />
                <p className="text-xl font-bold">
                  Cal<span className="text-primary">Marshal</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DasboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 mt-10">
                  <DasboardLinks />
                </nav>
              </SheetContent>
            </Sheet>{" "}
            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Image
                      src={(session?.user?.image as string) || ""}
                      alt="Profile"
                      width={20}
                      height={20}
                      className="w-full h-full rounded-full"
                    />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton />
    </>
  );
};

export default RootLayout;

// import React, { ReactNode } from "react";

// const RootLayout = ({ childern }: { childern: ReactNode }) => {
//   return <div>{childern}</div>;
// };

// export default RootLayout;
