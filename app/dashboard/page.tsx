import React from "react";
import { requireUser } from "../lib/hook";
import { redirect } from "next/navigation";
import { signOut } from "../lib/auth";

const page = async () => {
  const sission = await requireUser();
  console.log(sission.expires);
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
          redirect("/");
        }}
      >
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </form>
    </div>
  );
};

export default page;
