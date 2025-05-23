import Image from "next/image";
import NylasLogo from "@/public/nylas-logo.png";
import NextjsLogo from "@/public/nextjs-logo.svg";
import vercelLogo from "@/public/vercel1868.jpg";
import logoSubabase from "@/public/supabase.svg";
import logoPrisma from "@/public/prisma-logo.png";

export function Logos() {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Trusted by the best companies in the world
      </h2>
      <div className="mt-10 grid max-w-lg  grid-cols-4 items-center justify-center  gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image
          src={NylasLogo}
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={NextjsLogo}
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={logoPrisma}
          alt="Logo"
          className="col-span-2 bg-white max-h-14 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={logoSubabase}
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />{" "}
        <Image
          src={vercelLogo}
          alt="Logo"
          className="col-span-2 bg-white max-h-28 w-full object-contain lg:col-span-1 dark:invert"
        />
      </div>
    </div>
  );
}
