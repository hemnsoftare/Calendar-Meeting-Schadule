"use server";
import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
import { requireUser } from "./lib/hook";
import { onboardingSchemaValidation, settingsSchema } from "./lib/zodSchemes";
import { Presentation } from "lucide-react";
import { redirect } from "next/navigation";
export const onBoardingActions = async (
  prevState: unknown,
  formData: FormData
) => {
  const user = await requireUser();
  console.log(Presentation);
  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUniqe() {
        const exisitngSubDirectory = await prisma.user.findUnique({
          where: {
            userName: formData.get("username") as string,
          },
        });
        return !exisitngSubDirectory;
      },
    }),

    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: { id: user.user?.id || "" },
    data: {
      userName: submission.value.username,
      name: submission.value.fullname,
    },
  });
  redirect("/onboarding/grant-id");
};

export const settingsActions = async (
  prevState: unknown,
  formData: FormData
) => {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.user.update({
    where: { id: session.user?.id || "" },
    data: {
      name: submission.value.fullname,
      image: submission.value.profileImage,
    },
  });
  redirect("/dashboard");
};
