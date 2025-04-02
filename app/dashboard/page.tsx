import React from "react";
import { redirect } from "next/navigation";
import { signOut } from "../lib/auth";

const page = async () => {
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
      <h1>dashboade in here </h1>
    </div>
  );
};

export default page;
