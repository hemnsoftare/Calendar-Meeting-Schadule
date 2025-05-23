"use server";
import { redirect } from "next/navigation";
import { auth } from "./auth";
export const requireUser = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return session;
};
