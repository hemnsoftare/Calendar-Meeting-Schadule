"use server";
import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
import { requireUser } from "./lib/hook";
import {
  eventTypeSchema,
  onboardingSchemaValidation,
  settingsSchema,
} from "./lib/zodSchemes";
import { Presentation } from "lucide-react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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
      availability: {
        create: [
          // Use 'create' for nested create operations, not 'createMany'
          {
            day: "Friday",
            fromTime: "09:00",
            tillTime: "17:00",
            isActive: true,
          },
          {
            day: "Wednesday",
            fromTime: "09:00",
            tillTime: "17:00",
            isActive: true,
          },
          {
            day: "Monday",
            fromTime: "09:00",
            tillTime: "17:00",
            isActive: true,
          },
          {
            day: "Tuesday",
            fromTime: "09:00",
            tillTime: "17:00",
            isActive: true,
          },
          {
            day: "Thursday",
            fromTime: "09:00",
            tillTime: "17:00",
            isActive: true,
          },
          {
            day: "Saturday",
            fromTime: "09:00",
            tillTime: "17:00",
            isActive: true,
          },
          {
            day: "Sunday",
            fromTime: "09:00",
            tillTime: "17:00",
            isActive: true,
          },
        ],
      },
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

export async function updateAvailabilityAction(formData: FormData) {
  // const session = await requireUser();
  console.log(formData);
  const rawData = Object.fromEntries(formData.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: { id: item.id },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/availability");
    // return { status: "success", message: "Availability updated successfully" };
  } catch (error) {
    console.error("Error updating availability:", error);
    // return { status: "error", message: "Failed to update availability" };
  }
}

export const CreateEventTypeAction = async (
  prvent: unknown,
  formData: FormData
) => {
  console.log(prvent);
  const session = await requireUser();
  const data = parseWithZod(formData, {
    schema: eventTypeSchema,
  });
  if (data.status !== "success") return data.reply();
  await prisma.eventType.create({
    data: {
      url: data.value.url,
      title: data.value.title,
      description: data.value.description,
      duration: data.value.duration,
      videoCallSoftware: data.value.videoCallSoftware,
      userId: session.user?.id,
    },
  });
  redirect("/dashboard");
};
